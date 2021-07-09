<!--
 * @Author: zhouxs
 * @Date: 2021-07-09 19:01:39
 * @LastEditors: zhouxs
 * @LastEditTime: 2021-07-09 19:05:38
 * @Description: file content
-->
<template>
  <img
    alt="Vue logo"
    src="../assets/logo.png"
  />
  <h1>{{ msg }}</h1>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'About',
  data() {
    return {
      msg: 'about page'
    }
  },
  setup() {}
})
</script>