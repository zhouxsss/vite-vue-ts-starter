<template>
  <a-layout-footer class="footer common-padding">
    footer
  </a-layout-footer>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'layoutFooter'
})
</script>

<style lang="less" scoped>
.footer {
  height: @footer-height;
  background: #fff;
}
@media (max-width: 768px) {
  .footer {
    height: calc(@footer-height + 0.4rem);
  }
}
</style>
