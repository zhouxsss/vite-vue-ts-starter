<template>
  <a-layout class="bg-white">
    <Header />
    <a-layout class="main">
      <router-view v-slot="{ Component, route }">
        <transition :name="route.meta.transition || 'fade'">
          <div>
            <keep-alive>
              <component :is="Component" v-if="route.meta.keepAlive" />
            </keep-alive>
            <component :is="Component" v-if="!route.meta.keepAlive" />
          </div>
        </transition>
      </router-view>
    </a-layout>
    <Footer />
  </a-layout>
  <LoginModal />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Header from './header.vue'
import Footer from './footer.vue'
import LoginModal from '/@/views/Login/index.vue'
export default defineComponent({
  name: 'layout',
  components: {
    Header,
    Footer,
    LoginModal,
  },
  setup() {},
})
</script>
<style lang="less" scoped>
.main {
  min-height: calc(100vh - @header-height - @footer-height);
}
</style>
