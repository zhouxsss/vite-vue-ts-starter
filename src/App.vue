<template>
  <ConfigProvider :locale="getLocale">
    <router-view />
  </ConfigProvider>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { ConfigProvider } from 'ant-design-vue'

export default defineComponent({
  name: 'App',
  components: { ConfigProvider },
  setup() {
    const store = useStore()
    onMounted(() => {
      // todo： 需要添加移动端限制
      const htmlDom = document.querySelector('html') as HTMLElement
      htmlDom.style.fontSize = '4.26vw'
    })
    return {
      locale: computed(() => store.getters.getLocale),
    }
  },
})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
