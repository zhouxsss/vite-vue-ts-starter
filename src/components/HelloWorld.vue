<!--
 * @Author: zhouxs
 * @Date: 2021-07-07 17:53:51
 * @LastEditors: zhouxs
 * @LastEditTime: 2021-07-09 19:00:10
 * @Description: file content
-->
<template>
  <h1>{{ msg }}</h1>

  <button type="button" @click="count++">count++</button>
  count is: {{ count }}

  <button type="button" @click="inCrement">inCrement store</button>
  store count is: {{ computedCount }}
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '../store'
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const store = useStore(key)
    const count = ref(0)
    const computedCount = computed(() => store.state.count)
    return {
      count,
      computedCount,
      inCrement: () => store.commit('increment')
    }
  }
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
