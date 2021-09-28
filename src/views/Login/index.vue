<template>
  <modal :visible="visible" @close="handleClose">
    <a-form ref="formRef" :model="formState" :hideRequiredMark="true" :rules="rules">
      <a-form-item :colon="false" name="phone">
        <a-input-group compact class="flex items-center pr-0">
          <div class="ant-input-prefix">
            <img src="/@/assets/user/number.svg" class="mr-5" />
          </div>
          <a-select style="width: 40%" v-model:value="formState.regionCode">
            <template #suffixIcon>
              <CaretDownOutlined class="align-middle" />
            </template>
            <a-select-option
              v-for="item in codeList"
              :key="item.value"
              :value="item.value"
              :title="item.title"
              >{{ item.title }}</a-select-option
            >
          </a-select>
          <a-input
            style="width: 50%"
            v-model:value="formState.phone"
            :placeholder="$t('login.phone')"
            :maxlength="11"
          ></a-input>
        </a-input-group>
      </a-form-item>
      <a-form-item :colon="false" name="verifyCode">
        <a-input
          v-model:value="formState.verifyCode"
          class="w-1/2"
          :placeholder="$t('login.verifyCode')"
          :maxlength="6"
        >
          <template #prefix>
            <img src="/@/assets/user/code.svg" class="mr-10" />
          </template>
        </a-input>
        <a-button
          type="link"
          @click="handleCountDown"
          :disabled="isCountDown"
          class="w-1/2 text-right"
          >{{ isCountDown ? `${currentSecond}s` : $t('login.send') }}</a-button
        >
      </a-form-item>
      <a-form-item :colon="false" name="invitationCode" v-if="formState.invitationCode">
        <a-input v-model:value="formState.invitationCode" :placeholder="$t('login.invite')">
          <template #prefix>
            <img src="/@/assets/user/invite.svg" class="mr-10" />
            <span class="ml-5 mr-5">
              {{ $t('login.invite') }}
            </span>
          </template>
        </a-input>
      </a-form-item>
    </a-form>
    <template #footer>
      <a-button shape="round" @click="onLogin" class="w-full" type="primary"
        >{{ $t('login.login') }} | {{ $t('login.register') }}</a-button
      >
    </template>
  </modal>
  <RegisterSuccess v-model:visible="isRegisterVisible" />
</template>
<script lang="ts">
import { defineComponent, UnwrapRef, reactive, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { storeKey } from '/@/store'
import useCountDown from '/@/hooks/useCountDown'
import { loginApi, getVerifyCode } from '/@/apis/user'
import { commonPattern } from '/@/constants/patterns'
import { regionList } from '/@/constants/regions'
import useI18n from '/@/hooks/useI18n'
import RegisterSuccess from './registerSuccess.vue'
import { CaretDownOutlined } from '@ant-design/icons-vue'

export interface FormState {
  regionCode: string
  phone: string
  verifyCode: string
  invitationCode?: any
  uniqueSerialNo: ''
}

export default defineComponent({
  name: 'loginModal',
  components: { RegisterSuccess, CaretDownOutlined },
  setup() {
    const formRef = ref()
    const isRegisterVisible = ref(false)
    const {
      query: { invite },
    } = useRoute()
    const { current, start, stop, isCountDown } = useCountDown(59, { isManual: true })
    const { t } = useI18n()
    const store = useStore(storeKey)
    const formState: UnwrapRef<FormState> = reactive({
      regionCode: '86',
      phone: '',
      verifyCode: '',
      invitationCode: Array.isArray(invite) ? invite[0] : invite,
      uniqueSerialNo: '',
    })
    const rules = computed(() => {
      return {
        phone: [
          { required: true, message: `${t('sys.form.input')}${t('login.phone')}`, trigger: 'blur' },
          // {
          //   pattern: commonPattern.phone,
          //   message: `${t('login.phone')}${t('sys.form.errorRule')}`,
          //   trigger: 'blur',
          // },
        ],
        verifyCode: [
          {
            required: true,
            message: `${t('sys.form.input')}${t('login.verifyCode')}`,
            trigger: 'blur',
          },
          {
            pattern: commonPattern.check,
            message: `${t('login.verifyCode')}${t('sys.form.errorRule')}`,
            trigger: 'blur',
          },
        ],
        invitationCode: [
          {
            pattern: commonPattern.invite,
            message: `${t('login.invite')}${t('sys.form.errorRule')}`,
            trigger: 'blur',
          },
        ],
      }
    })
    const handleCountDown = () => {
      start()
      getVerifyCode({ phoneNo: formState.phone, regionCode: formState.regionCode })
        .then((res) => {
          formState.uniqueSerialNo = res.uniqueSerialNo
        })
        .catch(() => {
          stop()
        })
    }
    const onLogin = () => {
      formRef.value
        .validate()
        .then(() => {
          loginApi(formState).then(({ username, accountId, token, loginType }) => {
            store.commit('setUser', {
              isLoginVisible: false,
              isLogin: true,
            })
            store.commit('setUserTokenAndStore', token)
            store.commit('setUserInfoAndStore', { username, accountId })
            // 注册，跳转私人博物馆
            if (loginType === '1') {
              isRegisterVisible.value = true
            }
          })
        })
        .catch((err) => {
          console.error(err)
        })
    }
    const handleClose = () => {
      store.commit('setLoginVisible', false)
      formRef.value.resetFields()
    }
    return {
      visible: computed(() => store.getters.getLoginVisible),
      formRef,
      rules,
      formState,
      currentSecond: computed(() => current.value.ss),
      isCountDown: computed(() => isCountDown.value),
      onLogin,
      handleCountDown,
      handleClose,
      isRegisterVisible,
      codeList: regionList,
    }
  },
})
</script>
