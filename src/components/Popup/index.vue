<template>
  <transition name="fade">
    <div
      :class="`mask fixed inset-0 ${maskClassName}`"
      :style="`z-index: ${zIndex};`"
      v-show="visible"
      @click="handleClose"
    >
      <slot></slot>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, watch, onUnmounted } from 'vue'

export default defineComponent({
  name: 'popup',
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
    maskClassName: {
      type: String,
      require: false,
      default: null,
    },
    zIndex: {
      type: Number,
      require: false,
      default: 9,
    },
  },
  setup(props, { emit }) {
    watch(
      () => props.visible,
      (val) => {
        if (val) {
          window.document.body.style.overflowY = 'hidden'
        } else {
          window.document.body.style.overflowY = 'auto'
        }
      }
    )
    onUnmounted(() => {
      window.document.body.style.overflowY = 'auto'
    })
    return {
      handleClose: () => {
        emit('update:visible', false)
        // window.document.querySelector('html')?.style.overflowY = 'auto'
      },
    }
  },
})
</script>
<style lang="less" scoped>
.mask {
  background-color: rgba(0, 0, 0, 0.4);
  overflow-y: auto;
  z-index: 9;
}
</style>
