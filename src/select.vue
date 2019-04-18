<template>
  <div class="v-select" :class="classes" :style="variables" role="listbox" tabindex="0" @click.stop @keydown="onFilter($event)" @keydown.enter="onEnter()" @keydown.tab="onTab($event)" @keydown.up.prevent="onArrowPress(-1)" @keydown.down.prevent="onArrowPress(1)" @keydown.left.prevent="onArrowPress(-1)" @keydown.right.prevent="onArrowPress(1)" @keydown.space.prevent="onToggle(true)" @keydown.esc="onEscape()" @focus="onToggleFocus(true)" @blur="onToggleFocus(false)">
    <div ref="label" class="label" v-html="label || placeholder" @click.prevent="onToggle()"></div>
    <div ref="options" class="options" style="animation-duration: 0s;" :aria-hidden="!open">
      <template v-for="opt in list">
        <component v-if="opt.state.group" :key="opt.state.index" :is="optgroup" :group="opt"></component>
        <component v-else :is="option" :key="opt.state.index" :option="opt" @click.native.stop="onClickOption(opt.state.index)" @mouseover.native="onHover(opt.state.index)"></component>
      </template>
    </div>
    <select ref="select" class="select" tabindex="-1" v-html="getOptionsHtml()" @change="onSelectChanged($event)"></select>
  </div>
</template>

<script type="text/javascript">
import VOptgroup from './optgroup.vue'
import VOption from './option.vue'

import { debounce } from 'debounce'

export default {
  name: 'VSelect',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    option: {
      type: Object,
      default: () => VOption
    },
    optgroup: {
      type: Object,
      default: () => VOptgroup
    },
    size: {
      type: Number,
      default: 400
    },
    disabled: {
      type: Boolean,
      default: false
    },
    native: {
      type: [Boolean, Function],
      default: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: null
    }
  },
  beforeMount: function(){
    // Set the complete list of option/optgroup data by "repairing"
    // each provided option hash with the required/needed data
    this.list = this.options.reduce((options, o) => {
      return options.concat(this.getRepairedItem(o))
    }, [])

    if(this.selection){
      // One of the enabled options in the input json was selected
      // Set the current highlight index to the selected options index
      this.highlightIndex = this.selection.state.index
    }else if(this.value !== null){
      // If the selected prop was provided, try and find the selected option
      // in the list of enabled options
      const option = this.getAvailableOptions().find(o => o.value == this.value)

      if(option){
        // A match was found, so set it as the selected & highlighted option
        option.selected = true
        this.highlightIndex = option.state.index
      }
    }
  },
  mounted: function(){
    // Set the current user agent, used for mobile detection
    this.agent = navigator.userAgent || navigator.vendor || window.opera

    // When clicked anywhere, close the dropdown
    // This event is prevented if the click occurs on the dropdown itself
    document.addEventListener('click', (event) => {
      if(!this.$el.contains(event.target)){
        this.onClickOutside()
      }
    })

    // When a scroll event occurs anywhere except the dropdown itself,
    // close the dropdown, but continue to re-position it as it scrolls
    // The re-positioning is to take into account longer transition-out animations
    window.addEventListener('scroll', (event) => {
      this.calcPosition()
      this.calcDirection()
      if(this.open && !this.$el.contains(event.target)) this.open = false
    }, true)

    this.calcPosition()
    this.calcDirection()
    this.calcDimensions()
  },
  updated: function(){
    this.$nextTick(() => {
      this.calcPosition()
      this.calcDirection()
      this.calcDimensions()
    })
  },
  watch: {
    open: function(is_open){
      // Unset the animation duration override, allow
      // the written animation to take place
      this.$refs.options.style.animationDuration = ''

      if(is_open){
        this.calcPosition()
        this.$nextTick(this.scrollToHighlighted)
        this.$emit('open')
      }else{
        this.$emit('close')
        this.hoverIndex = -1
      }
    },
    focused: function(is_focused){
      if(!is_focused){
        this.onToggle(false)
      }
    },
    direction: function(){
      this.$refs.options.style.animationDuration = '0s'
    },
    hoverIndex: function(new_index){
      this.getAvailableOptions().forEach(o => o.state.hovered = o.state.index == new_index)
    },
    highlightIndex: function(new_index){
      this.getAvailableOptions().forEach(o => o.state.highlighted = o.state.index == new_index)
    },
    selection: function(new_selection){
      if(this.selections === undefined){
        const value = new_selection ? new_selection.value : ''

        this.$emit('input', value)
        this.$emit('change', value)
      }
    }
  },
  methods: {
    /**
     * Generates the native select elements inner html options
     * This is only used if on a mobile device and +this.native+ is true
     */
    getOptionsHtml: function(){
      let html = ''
      let grouped = false

      this.list.forEach((item) => {
        if(item.state.group){
          if(grouped){
            html += '</optgroup>'
          }
          grouped = true
          html += `<optgroup label="${item.label}" ${item.disabled ? 'disabled' : ''}>`
        }else{
          if(grouped && item.state.groups.length == 0){
            html += '</optgroup>'
            grouped = false
          }
          html += `<option value="${item.value}" ${item.disabled ? 'disabled' : ''} ${item.selected ? 'selected' : ''}>${item.label}</option>`
        }
      })
      if(grouped) html += '</optgroup>'
      return html
    },
    getAvailableSpace: function(){
      const location = this.$el.getBoundingClientRect()
      const top = location.y
      const bottom = window.innerHeight - (location.y + location.height)

      return { top: top, bottom: bottom }
    },
    calcDimensions: function(){
      if(this.$refs.options){
        const initialDisplay = this.$refs.options.style.display
        const initialMinWidth = this.$refs.options.style.minWidth
        this.$refs.options.style.minWidth = '0'
        this.$refs.options.style.position = 'absolute'
        this.$refs.options.style.display = 'inline-block'
        this.width = Math.max(this.$refs.options.offsetWidth, this.$el.offsetWidth)
        this.$refs.options.style.display = initialDisplay
        this.$refs.options.style.minWidth = initialMinWidth
        this.$refs.options.style.position = ''
      }
    },
    calcPosition: function(){
      const location = this.$el.getBoundingClientRect()
      const space = this.getAvailableSpace()

      // Prefer to open downwards if there is enough room,
      // regardless of whether top has more available space
      // Include 30px margin space, so we don't open right to the edge
      if(space.bottom >= space.top || (space.bottom - 30) > this.$refs.options.offsetHeight){
        this.height = Math.min(space.bottom, this.size + 30) - 30
        this.top = location.y
      }else{
        this.height = Math.min(space.top, this.size + 30) - 30
        this.top = location.y - this.$refs.label.offsetHeight - this.$refs.options.offsetHeight
      }

      this.left = location.x
    },
    calcDirection: debounce(function(){
      const space = this.getAvailableSpace()
      this.direction = space.bottom >= space.top || (space.bottom - 30) > this.$refs.options.offsetHeight ? 'is-down' : 'is-up'
    }, 200),
    getRepairedItem: function(option, depth, attrs){
      // Set a default depth of zero
      if(!depth) depth = 0

      // Ensure any extra attributes is an object, even if empty
      if(!attrs) attrs = {}

      // Initialize the counter that will be incremented to track
      // the index of each option or optgroup
      if(isNaN(this.counter)) this.counter = 0

      // Begin with a common set of state attributes
      const state = Object.assign({ groups: [] }, attrs.state || {}, { depth: depth, index: this.counter++ })

      if(option.options){
        // Our "option" has it's own set of options: therefore it's actually an optgroup

        // Give our group an id (really just the index in the groups array)
        // and a flag indicating it's an option group
        const group = Object.assign({ label: '', disabled: false }, option, attrs, { state: Object.assign(state, { group_id: this.groups.length, group: true }) })

        // Add our new group the groups array
        this.groups.push(group)

        // Update the list of group ids this option/group belongs to, it will be passed to every child option/group
        const groupParams = { state: { groups: state.groups.concat([this.groups.length - 1]) } }

        // If the group itself is disabled, force all children to be disabled as well
        if(group.disabled) groupParams.disabled = true

        // Get an array of child "options", flattened
        // This array may also contain other option groups
        const options = group.options.reduce((options, o) => options.concat(this.getRepairedItem(o, depth + 1, groupParams)), [])

        // Delete the original reference to options from our input data
        delete group.options

        // Place the optgroup before it's children
        options.unshift(group)

        return options
      }else{
        // Our option is just an option, merge in some default state attributes
        // and normalize the rest of the data
        attrs.state = Object.assign(state, { highlighted: false, hovered: false })
        return Object.assign({ value: '', label: '', item: option.label || '', selected: false, disabled: false }, option, attrs)
      }
    },
    onArrowPress: function(offset){
      // If not seeking, add the class
      if(!this.$el.classList.contains('is-seeking')){
        this.$el.classList.add('is-seeking')
      }

      const permitted = this.getAvailableOptions().map(o => o.state.index)

      // `resetHover` uses `debounce`, so it only is called after 100ms
      // Each call to `resetHover` actually resets the clock
      this.resetHover()

      if(this.highlightIndex < 0 && this.hoverIndex < 0){
        // If nothing is highlighted or hovered, highlight the first available option
        this.highlightIndex = permitted[0]
      }else if(this.highlightIndex < 0 && this.hoverIndex >= 0){
        // If hovering over an option, that option should be highlighted
        this.highlightIndex = this.hoverIndex
      }else{
        // Ensure our hoverIndex is the same as highlightIndex if not set already
        if(this.highlightIndex > -1 && this.hoverIndex < 0) this.hoverIndex = this.highlightIndex

        // Moving up or down the list, find the next option by the offset given
        const nextIndex = permitted[permitted.indexOf(this.hoverIndex) + offset]
        if(!isNaN(nextIndex)) this.highlightIndex = nextIndex
      }

      // Consider that highlighting in this context is the same as hovering
      this.hoverIndex = this.highlightIndex

      if(this.open){
        // Dropdown is open, so make sure our newly highlighted option is in view
        this.$nextTick(this.scrollToHighlighted)
      }else{
        // Dropdown is closed, so we actually mean to change the selection
        this.onClickOption(this.highlightIndex)
      }
    },
    onFilter: function(event){
      const code = event.keyCode || event.which
      const char = String.fromCharCode(code)

      if(/[a-z0-9-_ ]/i.test(char)){
        this.filter += char

        const match = new RegExp(`^${this.filter}`, 'i')
        const tmp = document.createElement('DIV')

        const result = this.list.filter(o => !o.state.group && !o.disabled).find((o) => {
          tmp.innerHTML = o.item
          let text = (tmp.textContent || tmp.innerText || o.item).replace(/^\s+/, '')
          return match.test(text)
        })

        if(result){
          this.onClickOption(result.state.index, this.open)
        }
      }

      this.resetFilter()
    },
    onHover: function(idx){
      const option = this.list.find(o => o.state.index === idx)
      if(!option || option.disabled) return
      this.hoverIndex = idx
    },
    onTab: function(event){
      if(this.open && this.focused){
        event.preventDefault()

        this.selectImpliedOption()
        this.open = false
      }
    },
    onEnter: function(){
      this.selectImpliedOption()
      this.open = false
    },
    onEscape: function(){
      this.open = false
    },
    onToggle: function(override){
      if(this.disabled) return
      this.open = override == undefined ? !this.open : override
    },
    onToggleFocus: function(state){
      if(this.disabled) return
      this.focused = state
    },
    onClickOutside: function(){
      // If already closed, lose focus also
      if(!this.open) this.focused = false
      this.open = false
    },
    /**
     * Set the current selected option to the given index,
     * and highlight it as well. The second parameter can be a truthy/falsy
     * indicating whether or not to close the dropdown after selecting
     */
    onClickOption: function(idx, close){
      const option = this.list.find(o => o.state.index === idx)

      // If disabled, don't do anything
      if(option && option.disabled) return false

      this.getAvailableOptions().forEach(o => o.selected = o.state.index == idx)
      this.highlightIndex = idx

      this.$nextTick(() => {
        this.scrollToHighlighted()
      })

      this.open = !!close
    },
    /**
     * When the native select input value changes,
     * find the index of the option from the value
     * and update the selected option in the data +list+
     */
    onSelectChanged: function(event){
      const option = this.getAvailableOptions().find(o => o.value == event.target.value)
      if(option) this.onClickOption(option.state.index)
    },
    /**
     * Implied option is first and foremost the option that
     * currently is highlighted. If no option is highlighted,
     * fall back to the currently hovered option, if any.
     * If no options with either hover or highlight state, does nothing
     */
    selectImpliedOption: function(){
      if(this.highlightIndex > -1){
        this.onClickOption(this.highlightIndex, true)
      }else if(this.hoverIndex > -1){
        this.onClickOption(this.hoverIndex, true)
      }
    },
    scrollToHighlighted: function(){
      const highlighted = this.$refs.options.querySelector('.is-highlighted')
      const options = this.$refs.scroll || this.$refs.options

      if(highlighted){
        const optionBottom = (highlighted.offsetTop - options.offsetHeight) + highlighted.offsetHeight + options.offsetHeight
        const scrollBottom = options.scrollTop + options.offsetHeight

        if(optionBottom >= scrollBottom){
          options.scrollTop = highlighted.offsetTop - options.offsetHeight + highlighted.offsetHeight
        }else if(highlighted.offsetTop < options.scrollTop){
          options.scrollTop = highlighted.offsetTop
        }
      }
    },
    hasAvailableOptions: function(){
      return this.getAvailableOptions().length > 0
    },
    getAvailableOptions: function(){
      return this.list.filter(o => !o.state.group && !o.disabled)
    },
    isMobile: function(){
      if(this.native instanceof Function){
        return this.native(this.agent)
      }

      const mobile = /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(this.agent)
                  || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(this.agent.substr(0,4))
      return this.native && mobile
    },
    resetFilter: debounce(function(){
      this.filter = ''
    }, 500),
    resetHover: debounce(function(){
      this.$el.classList.remove('is-seeking')
    }, 100)
  },
  computed: {
    classes: function(){
      return [
        { 'is-focused': this.focused },
        { 'is-disabled': this.disabled },
        { 'is-open': this.open },
        { 'is-mobile': this.isMobile() },
        { 'is-placeholding': !this.selection },
        this.direction
      ]
    },
    variables: function(){
      return {
        '--height': `${this.height}px`,
        '--width': this.width == 'auto' ? 'auto' : `${this.width}px`,
        '--top': `${this.top + (this.$refs.label ? this.$refs.label.offsetHeight : 0)}px`,
        '--left': `${this.left}px`
      }
    },
    selection: function(){
      return this.list.find(o => !o.state.group && !o.disabled && o.selected)
    },
    label: function(){
      if(this.highlighted){
        return this.highlighted.label
      }
      return null
    },
    highlighted: function(){
      return this.list.find(o => o.state.highlighted)
    }
  },
  data: function(){
    return {
      open: false,
      focused: false,
      width: 'auto',
      list: [],
      groups: [],
      hoverIndex: -1,
      highlightIndex: -1,
      filter: '',
      top: 0,
      left: 0,
      height: this.size,
      direction: 'is-down',
      agent: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.v-select {
  display: inline-block;
  min-width: 10px;
  box-sizing: border-box;
  text-align: left;
  position: relative;
  background: #fff;
  outline: none;
  width: var(--width);

  &.is-disabled .label {
    cursor: default;
  }

  &.is-open .options {
    z-index: 1;
    animation: show 150ms ease-out;
    animation-fill-mode: forwards;
  }

  /**
   * Prevent the hover event from being triggered while seeking
   * through the dropdown using up/down arrow keys
   * This class is removed after 100ms, after the hover event would
   * have normally been triggered
   */
  &.is-seeking .v-option {
    pointer-events: none;
  }

  /**
   * If on a mobile browser, make the native select input
   * 0% opacity, but overlay the entire clickable area, so
   * it will be invoked instead when clicked on
   */
  &.is-mobile .select {
    opacity: 0;
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }
}

/**
 * @see https://ghinda.net/article/mimic-native-focus-css/
 */
.v-select.is-focused .label {
  outline-width: 2px;
  outline-style: solid;
  outline-color: Highlight;
}

@media (-webkit-min-device-pixel-ratio: 0) {
  .v-select.is-focused .label {
    outline-color: -webkit-focus-ring-color;
    outline-style: auto;
  }
}

.v-select * {
  box-sizing: border-box;
}

.label {
  display: block;
  border: 1px solid #e5e5e5;
  padding: 6px 10px;
  width: 100%;
  max-width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
  cursor: pointer;
  font-weight: normal;
  font-size: 16px;
  line-height: 1.4;

  /**
   * Trick to enforce the height of the element
   * when it has no content, so it doesn't collapse
   */
  &:empty::after {
    content: '.';
    visibility: hidden;
  }
}

.options {
  overflow: auto;
  z-index: 0;
  border: 1px solid #e5e5e5;
  max-height: var(--height);
  background: inherit;
  position: fixed;
  top: var(--top);
  left: var(--left);
  min-width: var(--width);
  animation: hide 150ms ease-out;
  animation-fill-mode: forwards;
}

.select {
  cursor: pointer;
  display: none;
}

@keyframes hide {
  0% {
    display: block;
    opacity: 1;
  }
  99% {
    display: block;
    transform: scale(1);
  }
  100% {
    display: none;
    transform: scale(0);
    opacity: 0;
  }
}

@keyframes show {
  0% {
    display: none;
    opacity: 0;
  }
  1% {
    display: block;
    opacity: 0;
  }
  100% {
    display: block;
    opacity: 1;
  }
}
</style>

<style lang="scss">
.v-option {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>