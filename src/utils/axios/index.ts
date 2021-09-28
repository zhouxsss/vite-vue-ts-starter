import type { CreateAxiosOptions, AxiosTransform } from './axiosTransform'
import type { RequestOptions } from '/#/axios'
import type { AxiosResponse } from 'axios'
import type { Recordable } from '/#/global'
import { VAxios } from './Axios'
import { deepMerge } from '/@/utils'
import { isString, isObject } from '/@/utils/is'
import { joinTimestamp } from './helper'
import { checkStatus } from './checkStatus'
import { store } from '/@/store'
import useI18n from '/@/hooks/useI18n'
import useThrottleFn from '/@/hooks/useThrottleFn'
import { message as Message } from 'ant-design-vue'
import NET from '/@/constants/net'
const { t } = useI18n()

const authTimeout = useThrottleFn(
  function (msg, result) {
    // 登录失效
    if (result?.returnCode === NET.noAuthCode) {
      store.dispatch('loginOut')
      store.commit('setLoginVisible', true)
    } else {
      Message.error(msg)
    }
  },
  1000,
  true
)

const transform: AxiosTransform = {
  // 请求之前处理 config
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinTime = true, urlPrefix, joinPrefix } = options
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`
    }

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`
    }

    const params = config.params || {}
    const data = config.data || false
    if (config.method?.toUpperCase() === 'GET' || config.method?.toUpperCase() === 'PUT') {
      if (!isString(params)) {
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false))
      } else {
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`
        config.params = undefined
      }
    } else {
      if (!isString(params)) {
        if (
          isObject(config) &&
          Reflect.has(config, 'data') &&
          config.data &&
          Object.keys(config.data).length > 0
        ) {
          config.data = data
          config.params = params
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params
          config.params = undefined
        }
      } else {
        config.url = config.url + params
        config.params = undefined
      }
    }
    return config
  },
  requestInterceptors: (config, options) => {
    const token = store.getters.getToken
    const locale = store.getters.getLocale
    if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
      config.headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token
    }
    if (locale) {
      config.headers.Locale = locale
    }
    return config
  },
  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    return res
  },
  responseInterceptorsCatch: (error: any) => {
    const { response, code, message } = error || {}
    const err: string = error?.toString?.() ?? ''
    const msg: string = response?.data?.error?.message ?? ''
    let errMessage = ''

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = t('sys.api.apiTimeoutMessage')
      }
      if (err?.includes('Network Error')) {
        errMessage = t('sys.api.networkExceptionMsg')
      }

      if (errMessage) {
        Message.error(errMessage)
        return Promise.reject(error)
      }
    } catch (error) {
      throw new Error(error)
    }

    checkStatus(error?.response?.status, msg)
    return Promise.reject(error)
  },
  transformResponseHook: (res: AxiosResponse, options: RequestOptions) => {
    const { t } = useI18n()
    const { isTransformResponse, isReturnNativeResponse, isNeedCatchError } = options
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res
    }
    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code，data，message这些信息时开启
    if (!isTransformResponse) {
      return res.data
    }
    const { data } = res
    if (!data) {
      // return '[HTTP] Request has no return value';
      throw new Error(t('sys.api.apiRequestFailed'))
    }
    const { code, data: result, msg } = data

    // 这里逻辑可以根据项目进行修改
    const hasSuccess = data && Reflect.has(data, 'code') && code === NET.successCode
    if (hasSuccess) {
      return result
    } else {
      authTimeout(msg, result)
      if (isNeedCatchError) throw new Error(msg)
    }
  },
}

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        timeout: 10 * 2000,
        baseUrl: '',
        header: { 'Content-Type': 'application/json;charset=UTF-8' },
        transform,
        authenticationScheme: NET.tokenPrefix,
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          urlPrefix: import.meta.env.VITE_GLOB_API_URL_PREFIX,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: '',
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
        },
      },
      opt || {}
    )
  )
}

export const defHttp = createAxios()
