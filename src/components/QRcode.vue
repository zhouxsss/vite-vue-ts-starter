<template>
  <div class="qrimg">
    <img :src="state.url" alt />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import QRCode from 'qrcode'

export default defineComponent({
  props: {
    text: String,
  },
  components: {},
  setup(props) {
    const state = reactive({
      url: <any>'',
    })
    const qrcode = () => {
      QRCode.toDataURL(props.text).then((imgData) => {
        state.url = imgData
      })
    }
    onMounted(() => {
      qrcode()
    })
    return {
      qrcode,
      state,
    }
  },
})
</script>

<style lang="less" scoped>
.qrimg {
  border: 1px solid #00e676;
  img {
    width: 100%;
  }
}
</style>
