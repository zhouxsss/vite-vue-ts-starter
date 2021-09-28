import { Recordable } from "./global";

export type ErrorMessageMode = 'none' | 'message' | undefined

export interface RequestOptions {
  joinParamsToRrl?: boolean
  formatDate?: boolean
  // whether to return native response headers
  isReturnNativeResponse?: boolean
  isTransformResponse?: boolean
  isNeedCatchError?: boolean // 是否需要再次reject出错误
  joinPrefix?: boolean,
  urlPrefix?: string
  apiUrl?: string
  errorMessageMode?: ErrorMessageMode
  joinTime?: boolean
  ignoreCancelToken?: boolean
  withToken?: boolean
}

export interface Result<T = any> {
  code: number
  type: 'success' | 'error' | 'warning'
  message: string
  result: T
}

// mutipart/form-data: upload filters
export interface UploadFileParams {
  // Other parameters
  data?: Recordable
  // File parameter interface filed name
  name?: string
  // file name
  file: File | Blob
  // file name
  filename?: string
  [key: string]: any
}