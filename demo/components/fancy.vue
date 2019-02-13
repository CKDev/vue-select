<template>
  <div class="v-select" :class="classes" :style="variables" role="listbox" tabindex="0" @click.stop @keydown="onFilter($event)" @keydown.enter="onEnter()" @keydown.tab="onTab($event)" @keydown.up="onArrowPress($event, -1)" @keydown.down="onArrowPress($event, 1)" @keydown.left="onArrowPress($event, -1)" @keydown.right="onArrowPress($event, 1)" @keydown.space="onToggle($event, true)" @keydown.esc="onEscape()" @focus="focused = true" @blur="focused = false">
    <div ref="label" class="label" v-html="label || placeholder" @click="onToggle()"></div>
    <div ref="options" class="options-wrapper" style="animation-duration: 0s;" :aria-hidden="!open">
      <div ref="scroll" class="options">
        <template v-for="opt in list">
          <component v-if="opt.state.group" :is="optgroup" :group="opt"></component>
          <component v-else :is="option" :option="opt" @click.native.stop="onClickOption(opt.state.index)" @mouseover.native="onHover($event, opt.state.index)"></component>
        </template>
      </div>
    </div>
    <select ref="select" class="select" tabindex="-1" v-html="getOptionsHtml()" @change="onSelectChanged($event)" @focus="focused = true"></select>
  </div>
</template>

<script type="text/javascript">
import VSelect from '@/select.vue'

export default {
  name: 'VFancy',
  extends: VSelect
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
}

.v-select * {
  box-sizing: border-box;
}

.v-select.is-down .options-wrapper {
  animation: hide-down 400ms ease-out;
  animation-fill-mode: forwards;
}

.v-select.is-up .options-wrapper {
  animation: hide-up 400ms ease-out;
  animation-fill-mode: forwards;
}

.v-select.is-open.is-down .options-wrapper {
  z-index: 1;
  animation: show-down 400ms ease-out;
  animation-fill-mode: forwards;
}

.v-select.is-open.is-up .options-wrapper {
  z-index: 1;
  animation: show-up 400ms ease-out;
  animation-fill-mode: forwards;
}

/**
 * Prevent the hover event from being triggered while seeking
 * through the dropdown using up/down arrow keys
 * This class is removed after 100ms, after the hover event would
 * have normally been triggered
 */
.v-select.is-seeking .v-option {
  pointer-events: none;
}

/**
 * If on a mobile browser, make the native select input
 * 0% opacity, but overlay the entire clickable area, so
 * it will be invoked instead when clicked on
 */
.v-select.is-mobile .select {
  opacity: 0;
  visibility: hidden;
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.v-select.is-focused .label {
  border: 1px solid #231e49;
}

.label {
  transition: border 400ms ease-out;
  display: block;
  border: 1px solid #e5e5e5;
  padding: 6px 10px;
  width: var(--width);
  max-width: 100%;
  user-select: none;
  cursor: pointer;
  font-weight: normal;
  font-size: 14px;
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

.options-wrapper {
  position: fixed;
  top: var(--top);
  left: var(--left);
  width: var(--width);
  background: inherit;
  min-width: 500px;
  margin-left: calc(-250px + var(--width) / 2);
}

.options {
  overflow: auto;
  z-index: 0;
  max-height: var(--height);
  background: inherit;
  font-size: 13px;
  border-radius: 8px;
  box-shadow: 0 1px 12px -2px rgba(0, 0, 0, 0.3);
}

.v-select.is-down .options {
  &::after, &::before {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    z-index: 2;
  }

  &::after {
    border-color: rgba(136, 183, 213, 0);
    border-bottom-color: #fff;
    border-width: 9px;
    margin-left: -9px;
  }
  &::before {
    border-color: rgba(194, 225, 245, 0);
    border-bottom-color: #e5e5e5;
    border-width: 10px;
    margin-left: -10px;
  }
}

.v-select.is-up .options {
  &::after, &::before {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    z-index: 2;
  }

  &::after {
    border-color: rgba(136, 183, 213, 0);
    border-top-color: #fff;
    border-width: 9px;
    margin-left: -9px;
  }
  &::before {
    border-color: rgba(194, 225, 245, 0);
    border-top-color: #e5e5e5;
    border-width: 10px;
    margin-left: -10px;
  }
}

.v-optgroup /deep/ .label {
  font-weight: bold;
}

.select {
  cursor: pointer;
  display: none;
}

@keyframes hide-down {
  0% {
    display: block;
    opacity: 1;
    margin-top: 12px;
  }
  99% {
    display: block;
    transform: scale(1);
  }
  100% {
    display: none;
    transform: scale(0);
    opacity: 0;
    margin-top: 30px;
  }
}

@keyframes show-down {
  0% {
    display: none;
    opacity: 0;
    margin-top: 30px;
  }
  1% {
    display: block;
    opacity: 0;
  }
  100% {
    display: block;
    opacity: 1;
    margin-top: 12px;
  }
}

@keyframes hide-up {
  0% {
    display: block;
    opacity: 1;
    margin-top: -12px;
  }
  99% {
    display: block;
    transform: scale(1);
  }
  100% {
    display: none;
    transform: scale(0);
    opacity: 0;
    margin-top: -30px;
  }
}

@keyframes show-up {
  0% {
    display: none;
    opacity: 0;
    margin-top: -30px;
  }
  1% {
    display: block;
    opacity: 0;
  }
  100% {
    display: block;
    opacity: 1;
    margin-top: -12px;
  }
}
</style>
