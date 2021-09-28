type Fn = (...any) => void

export default function useThrottleFn(fn: Fn, duration: number = 80, immediate = false): Fn {
  let valid: boolean = true
  return function () {
    const context = this
    const args = arguments
    if (!valid) {
      return
    }
    valid = false
    if (immediate) {
      fn.apply(context, [...args])
    }
    setTimeout(() => {
      valid = true
      if (!immediate) fn.apply(context, [...args])
    }, duration)
  }
}
