<template>
  <popup :visible="visible">
    <div :class="`modal w-4/5 sm:w-280 ${contentClass}`">
      <a class="close" @click="close" v-if="!hideClose">
        <slot name="close">
          <img src="/@/assets/close.svg" alt="close" />
        </slot>
      </a>
      <slot name="info">
        <img class="logo" src="/@/assets/logoImg.png" alt="artBingo" />
      </slot>
      <slot name="title">
        <h3 v-if="title" class="title">{{ title }}</h3>
      </slot>
      <div class="cont">
        <slot></slot>
      </div>
      <div class="footer flex justify-between flex-grow">
        <slot name="footer">
          <a-button @click="cancel" style="background-color: transparent; width: 48%">
            {{ cancelText || $t('sys.modal.cancel') }}
          </a-button>
          <a-button @click="ok" type="primary" style="width: 48%">
            {{ okText || $t('sys.modal.ok') }}
          </a-button>
        </slot>
      </div>
    </div>
  </popup>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'modal',
  props: {
    visible: {
      type: Boolean,
      require: false,
      default: false,
    },
    title: String,
    okText: String,
    cancelText: String,
    onOk: {
      type: Function,
      require: false,
      default: () => () => {},
    },
    onCancel: {
      type: Function,
      require: false,
      default: () => () => {},
    },
    hideClose: {
      type: Boolean,
      require: false,
      default: false,
    },
    contentClass: {
      type: String,
      require: false,
      default: '',
    },
  },
  setup(props, { emit }) {
    const handleClose = () => {
      emit('update:visible', false)
      emit('close')
    }
    const handleCancel = () => {
      if (props.onCancel) {
        props.onCancel()
      } else {
        handleClose()
      }
    }
    const handleOk = () => {
      if (props.onOk) {
        props.onOk()
      } else {
        handleClose()
      }
    }
    return {
      close: handleClose,
      cancel: handleCancel,
      ok: handleOk,
    }
  },
})
</script>
<style lang="less" scoped>
.modal {
  position: relative;
  padding: 0.24rem;
  min-height: 3rem;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.9);
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0px 8px 12px rgba(0, 0, 0, 0.1);
  border-radius: 0.08rem;
  backdrop-filter: blur(40px);
  margin: 0 auto;
  top: 50%;
  transform: translateY(-50%);
  .close {
    position: absolute;
    top: 0.24rem;
    right: 0.24rem;
  }
  .logo {
    width: 0.64rem;
    height: 0.64rem;
    margin: 0 auto;
  }
  .title {
    margin-top: 0.24rem;
    font-size: 0.2rem;
    font-weight: 600;
    text-align: center;
  }
  .cont {
    padding-top: 0.24rem;
  }
  .footer {
    padding-top: 0.24rem;
    border-top: 0.5px solid rgba(0, 0, 0, 0.1);
  }

  :deep(.ant-input),
  :deep(.ant-input-affix-wrapper) {
    background-color: transparent;
    padding: 0.04rem 0.16rem;
    border-radius: 0.2rem;
    .ant-input {
      padding: 0;
      border-radius: 0;
    }
  }

  :deep(.ant-input-group) {
    border: 1px solid #d9d9d9;
    border-radius: 0.2rem;
    padding: 0 0.16rem;
    overflow: hidden;
    .ant-input-prefix {
      padding: 0.08rem 0;
    }
    & > *:not(:last-child) {
      border-right: none;
    }
    .ant-select-selector,
    .ant-input {
      background-color: transparent !important;
      border: none;
    }
    .ant-input {
      padding-left: 0;
      padding-right: 0;
    }
  }
}
</style>
