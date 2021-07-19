<template>
  <h1>{{ msg }}</h1>

  <a-button type="button" @click="count++">count++</a-button>
  count is: {{ count }}

  <a-button type="button" @click="inCrement">inCrement store</a-button>
  store count is: {{ computedCount }}

  <p>{{ $t('layout.header.home') }}</p>
  <p>{{ isMobile ? 'isMobile' : 'not isMobile' }}</p>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '/@/store'
import { useAppProviderContext } from '/@/hooks/context/useAppContext'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true,
      default: '111',
    },
  },
  setup: () => {
    const store = useStore(key)
    const count = ref(0)
    const computedCount = computed(() => store.state.count)
    const isMobile = useAppProviderContext()
    return {
      count,
      computedCount,
      inCrement: () => store.commit('increment'),
      isMobile: isMobile,
    }
  },
})
</script>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
