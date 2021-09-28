import type { Ref } from 'vue'

import { ref, watch, onMounted, onUnmounted } from 'vue'
import { isWindow } from '/@/utils/is'
import useThrottleFn from './useThrottleFn'

export default function useScroll(refEl: Ref<Element | Window>, wait?: number) {
  const refX = ref(0)
  const refY = ref(0)

  let stopWatch: () => void

  let handler = () => {
    if (isWindow(refEl.value)) {
      refX.value = refEl.value.scrollX
      refY.value = refEl.value.scrollY
    } else {
      refX.value =
        refEl.value.scrollLeft ||
        document.documentElement.scrollLeft ||
        window.pageXOffset ||
        document.body.scrollLeft
      refY.value =
        refEl.value.scrollTop ||
        document.documentElement.scrollTop ||
        window.pageYOffset ||
        document.body.scrollTop
    }
  }

  if (wait && wait > 0) {
    handler = useThrottleFn(handler, wait)
  }

  onMounted(() => {
    stopWatch = watch(
      refEl,
      (el, prevEl, onCleanup) => {
        if (el) {
          el.addEventListener('scroll', handler)
        } else if (prevEl) {
          prevEl.removeEventListener('scroll', handler)
        }
        onCleanup(() => {
          refX.value = refY.value = 0
          el && el.removeEventListener('scroll', handler)
        })
      },
      { immediate: true }
    )
  })

  onUnmounted(() => {
    refEl.value && refEl.value.removeEventListener('scroll', handler)
  })
  function stop() {
    stopWatch && stopWatch()
  }

  return {
    refX,
    refY,
    stop,
  }
}
