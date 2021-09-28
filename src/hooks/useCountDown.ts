import { ref } from 'vue'
import { timeFormatter } from '/@/utils'

interface CountDownType {
  isMiniSecond?: number
  isManual?: boolean
}

interface TimeType {
  time: number
  dd?: number
  hh?: number
  mm?: number
  ss?: number
}

export default function useCountDown(time: number, options: CountDownType = {}) {
  const { isMiniSecond, isManual } = options
  time = isMiniSecond ? Math.round(+time / 1000) : Math.round(time)
  const current = ref<TimeType>({
    time: time,
  })
  const isCountDown = ref(false)

  let timerId: ReturnType<typeof setTimeout> | null
  let curTime: ReturnType<typeof Date.now>

  function getTIme(time = current.value.time) {
    clear()
    if (time < 0) {
      reset()
      return
    }
    isCountDown.value = true
    const { dd, hh, mm, ss } = timeFormatter(time)
    current.value = { dd, hh, mm, ss, time }
    timerId = setTimeout(() => {
      const now = Date.now()
      const diffTime = Math.floor((now - curTime) / 1000)
      curTime = now
      getTIme(time - diffTime)
    }, 1000)
  }

  function start() {
    curTime = Date.now()
    getTIme(current.value.time)
  }

  function clear() {
    timerId && clearTimeout(timerId)
  }

  function stop() {
    isCountDown.value = false
    clear()
    timerId = null
  }

  function reset() {
    current.value = {
      time: time,
    }
    stop()
  }

  function restart() {
    reset()
    start()
  }

  if (!isManual) start()
  return { current: current, start, restart, reset, clear, stop, isCountDown: isCountDown }
}
