<template>
  <div class="v-optgroup" :class="classes" :style="{ 'padding-left': `${12 + 12 * group.state.depth}px` }">
    <div class="label" v-html="group.label"></div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: 'VOptgroup',
  props: {
    group: {
      type: Object,
      required: true
    }
  },
  computed: {
    aria: function(){
      return {} // What aria attributes are associated with optgroups?
    },
    classes: function(){
      return {
        'is-disabled': this.group.disabled
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-optgroup {
  padding: 8px 12px;

  &.is-disabled {
    opacity: 0.7;
  }
}

.label {
  white-space: nowrap;
  user-select: none;
}
</style>
