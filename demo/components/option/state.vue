<template>
  <div class="v-option" :class="state" :style="{ 'padding-left': `${12 + 12 * option.state.depth}px` }" role="option" v-bind="aria">
    <img class="icon" src="https://placekitten.com/20/20" width="20" height="20" />
    <div class="label" v-html="option.item"></div>
  </div>
</template>

<script type="text/javascript">
import VOption from '@/option.vue'

export default {
  name: 'VState',
  extends: VOption
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

.icon {
  float: left;
  margin-right: 8px;
  border-radius: 50%;
}

.label {
  white-space: nowrap;
  user-select: none;
}
</style>
