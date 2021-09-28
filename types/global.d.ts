import type {
  PropType as VuePropType
} from 'vue'

// vue
declare type PropType<T> = VuePropType<T>

declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>
declare type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T
}