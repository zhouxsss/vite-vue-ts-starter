<!--
 * @Author: zhouxs
 * @Date: 2021-07-07 17:53:51
 * @LastEditors: zhouxs
 * @LastEditTime: 2021-07-12 19:31:31
 * @Description: file content
-->
<template>
  <h1>{{ msg }}</h1>

  <Button type="button" @click="count++">count++</Button>
  count is: {{ count }}

  <Button type="button" @click="inCrement">inCrement store</Button>
  store count is: {{ computedCount }}

  <p>{{$t('layout.header.home')}}</p>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import { useStore } from 'vuex'
import { key } from '/@/store'
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
