type Fn = () => void

export default function useDebounceFn(fn: Fn, duration: number = 80): Fn {
  let timer: NodeJS.Timeout
  return function () {
    const context = this
    const args = arguments
    if (timer !== null) clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(context, [...args])
      clearTimeout(timer)
    }, duration)
  }
}
