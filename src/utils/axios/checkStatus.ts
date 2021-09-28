import useI18n from '/@/hooks/useI18n'
import { message as Message } from 'ant-design-vue'

export function checkStatus(status: number, msg: string): void {
  const { t } = useI18n()
  let errMessage = ''
  switch (status) {
    case 400:
      errMessage = `${msg}`
      break
    case 401:
      errMessage = t('sys.api.errMsg401')
      break
    case 404:
      errMessage = t('sys.api.errMsg404')
      break
    case 408:
      errMessage = t('sys.api.errMsg408')
      break
    case 500:
      errMessage = t('sys.api.errMsg500')
      break
  }
  if (errMessage) {
    Message.error(errMessage)
  }
}
