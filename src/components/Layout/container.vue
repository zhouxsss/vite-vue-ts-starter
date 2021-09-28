<template>
  <div class="container m-auto xl:w-1200">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'container',
  setup() {},
})
</script>

<style lang="less" scoped>
.container {
  padding-left: 0.24rem;
  padding-right: 0.24rem;
}
</style>
