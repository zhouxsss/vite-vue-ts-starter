<template>
  <a-layout-header
    class="
      header
      sm:overflow-auto sm:h-0.8
      overflow-x-scroll
      common-padding
      flex
      items-center
      fixed
      inset-0
      justify-between
    "
  >
    <a href="/" @click="goRoute('/')" class="mr-20">
      <img src="/@/assets/logo.png" alt="logo" class="logo" />
    </a>
    <Menu />
  </a-layout-header>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Menu from './menu.vue'
import { useGo } from '/@/hooks/useGo'
export default defineComponent({
  name: 'layoutHeader',
  components: {
    Menu,
  },
  setup() {
    const goRoute = useGo()
    return {
      goRoute,
    }
  },
})
</script>

<style lang="less" scoped>
.header {
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(80px);
  z-index: 9;
  overflow-y: hidden;
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
  -webkit-overflow-scrolling: touch;
  img {
    display: inline-block;
  }
}
.logo {
  width: 0.9rem;
  height: auto;
}
@media (min-width: 992px) {
  .logo {
    width: 1.54rem;
    height: auto;
  }
}
</style>
