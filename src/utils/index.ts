import { isObject } from './is'
import useI18n from '/@/hooks/useI18n'
import { message } from 'ant-design-vue'

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key])
  }
  return src
}

export function timeFormatter(time: number) {
  if (!time) return { ss: 0 }
  let t = time
  const ss = t % 60
  t = (t - ss) / 60
  if (t < 1) return { ss }
  const mm = t % 60
  t - (t - mm) / 60
  if (t < 1) return { mm, ss }
  const hh = t % 24
  t = (t - hh) / 24
  if (t < 1) return { hh, mm, ss }
  const dd = t
  return { dd, hh, mm, ss }
}

export function getRandomNumber(max: number): number {
  return Math.floor((Math.random() * 100000) % max)
}

export function CopyUrl(text: any) {
  let url = text
  let oInput = document.createElement('input')
  oInput.value = url
  document.body.appendChild(oInput)
  oInput.select() // 选择对象;
  document.execCommand('Copy') // 执行浏览器复制命令
  const { t } = useI18n()
  message.success(t('sys.copySuccess'))
  oInput.remove()
}
