<template>
  <div class="v-option" :class="classes" :style="{ 'padding-left': `${12 + 12 * option.state.depth}px` }" role="option" v-bind="aria">
    <div class="label" v-html="option.item"></div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'VOption',
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  computed: {
    aria: function(){
      return {
        'aria-disabled': this.option.disabled,
        // The selected attribute should show no matter what,
        // so we provide the value in an always "truthy" format (aka string)
        'aria-selected': this.option.selected ? 'true' : 'false'
      }
    },
    classes: function(){
      return {
        'is-disabled':    this.option.disabled,
        'is-selected':    this.option.selected,
        'is-highlighted': this.option.state.highlighted,
        'is-hovered':     this.option.state.hovered
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-option {
  padding: 8px 12px;

  &.is-hovered {
    background-color: #e5e5e5;
  }

  &.is-disabled {
    cursor: default;
    opacity: .7;
  }

  &.is-highlighted {
    color: #fff;
    background-color: #231e49;
  }
}

.label {
  white-space: nowrap;
  user-select: none;
  pointer-events: none;
}
</style>
