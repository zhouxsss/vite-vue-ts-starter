<template>
  <ConfigProvider :locale="{ locale }">
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
import { storeKey } from '/@/store'

export default defineComponent({
  name: 'App',
  components: { ConfigProvider, AppProvider },
  setup() {
    const store = useStore(storeKey)
    onMounted(() => {})
    return {
      locale: computed(() => store.getters.getLocale),
    }
  },
})
</script>
