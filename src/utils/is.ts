const toString = Object.prototype.toString

export function is(val: unknown, type: string): boolean {
  return toString.call(val) === `[object ${type}]`
}

export function isDef<T = unknown>(val?: T): val is T {
  return typeof val !== 'undefined'
}

export function isUnDef<T = unknown>(val?: T): val is T {
  return !isDef(val)
}

export function isNull(val: unknown): val is null {
  return val === null
}

export function isNullOrUnDef(val: unknown): val is null | undefined {
  return isUnDef(val) || isNull(val)
}

export function isFunction(val: unknown): val is Function {
  return is(val, 'Function')
}

export function isObject(val: unknown): val is Object {
  return is(val, 'Object')
}

export function isString(val: unknown): val is Object {
  return is(val, 'String')
}

export function isWindow(val: any): val is Window {
  return typeof window !== 'undefined' && is(val, 'Window')
}
