<template>
  <ConfigProvider :locale="getLocale">
    <AppProvider>
      <router-view />
    </AppProvider>
  </ConfigProvider>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useStore } from 'vuex'
import { ConfigProvider } from 'ant-design-vue'
import AppProvider from '/@/components/AppProvider.vue'

export default defineComponent({
  name: 'App',
  components: { ConfigProvider, AppProvider },
  setup() {
    const store = useStore()
    onMounted(() => {})
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
