type Fn = () => void

export default function useThrottleFn(
  fn: Fn,
  duration: number = 80
): Fn {
  let valid: boolean = true
  return function () {
    if (!valid) {
      return false
    }
    valid = false
    setTimeout(() => {
      fn()
      valid = true
    }, duration)
  }
}