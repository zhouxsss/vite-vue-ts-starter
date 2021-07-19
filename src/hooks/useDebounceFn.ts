type Fn = () => void

export default function useDebounceFn(fn: Fn, duration: number = 80): Fn {
  let timer: NodeJS.Timeout
  return function () {
    if (!timer) clearTimeout(timer)
    timer = setTimeout(fn, duration)
  }
}
