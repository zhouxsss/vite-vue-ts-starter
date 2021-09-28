<template>
  <a style="overflow: hidden" class="flex items-center ml-5 mr-5 flex-shrink-0" @click="handleCopy">
    <input
      v-model="text"
      type="text"
      style="position: absolute; right: -40000px; color: transparent"
      ref="inputRef"
      @change="() => {}"
      readonly
    />
    <slot>
      <span>复制</span>
    </slot>
  </a>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import { message } from 'ant-design-vue'
import useI18n from '/@/hooks/useI18n'

export default defineComponent({
  name: 'copier',
  props: {
    text: {
      type: String,
      required: true,
      default: '',
    },
    sucessTip: {
      type: String,
    },
  },
  setup(props) {
    const inputRef = ref()
    const { t } = useI18n()
    const handleCopy = () => {
      inputRef.value.select()
      document.execCommand('copy')
      message.success(props.sucessTip || t('sys.copySuccess'))
    }

    return {
      inputRef,
      handleCopy,
    }
  },
})
</script>
