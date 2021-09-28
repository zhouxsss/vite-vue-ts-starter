import { defHttp } from '../utils/axios'
import { LoginParams } from './model/userModel'

enum Api {
  getStatistics = '/app/lottery/statistics',
  login = '/app/user/login',
  getVerifyCode = '/app/sms/getSmsCode',
  getUserInfo = '/app/user/tUserIndex',
  updateName = '/app/user/updateName',
  updatePhone = '/app/user/updatePhone',
}

export function loginApi(params: LoginParams) {
  return defHttp.post({
    url: Api.login,
    params,
  })
}

export function getVerifyCode(params) {
  return defHttp.get(
    {
      url: Api.getVerifyCode,
      params,
    },
    {
      isNeedCatchError: true,
    }
  )
}

export function getStatistics() {
  return defHttp.get({
    url: Api.getStatistics,
  })
}

export function getUserInfo() {
  return defHttp.get({
    url: Api.getUserInfo,
  })
}

export function updateName(params) {
  return defHttp.put({
    url: Api.updateName,
    params,
  })
}

export function updatePhone(params) {
  return defHttp.put({
    url: Api.updatePhone,
    params,
  })
}
