import type { Router, RouteLocationRaw } from 'vue-router'
import { useRouter } from 'vue-router'

function handleError(e: Error) {
  console.error(e)
}

// page switch
export function useGo(_router?: Router) {
  let router
  if (!_router) {
    router = useRouter()
  }
  const { push, replace } = _router || router
  function go(opt: RouteLocationRaw, isReplace = false) {
    if (!opt) return
    isReplace ? replace(opt).catch(handleError) : push(opt).catch(handleError)
  }
  return go
}

export function open(url: string) {
  window.open(url)
}
