<template>
  <transition name="fade">
    <div
      :class="`overlay fixed inset-0 ${className}`"
      :style="`z-index: ${zIndex};`"
      v-show="visible"
    >
      <slot></slot>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'overlay',
  props: {
    visible: {
      type: Boolean,
      require: false,
      default: false,
    },
    className: {
      type: String,
      require: false,
      default: null,
    },
    zIndex: {
      type: Number,
      require: false,
      default: 9,
    },
    teleport: {
      type: String,
      require: false,
      default: null,
    },
  },
  setup() {
    return {}
  },
})
</script>

<style lang="less" scoped>
.overlay {
  background-color: rgba(0, 0, 0, 0.4);
  overflow-y: auto;
  padding: 0.2rem;
}
</style>
