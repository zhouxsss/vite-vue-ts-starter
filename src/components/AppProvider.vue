<script lang="ts">
import { ref, defineComponent } from 'vue'
import { createAppProviderContext } from '/@/hooks/context/useAppContext'
import { createBreakpointListen } from '/@/hooks/useBreakpoint'

export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  setup(_, { slots }) {
    const isMobile = ref(false)
    createAppProviderContext(isMobile)

    const htmlDom = document.querySelector('html') as HTMLElement

    createBreakpointListen(({ screenMap, sizeEnum, width }) => {
      const lgWidth = screenMap.get(sizeEnum.LG)
      if (lgWidth) {
        isMobile.value = width.value - 1 < lgWidth
        htmlDom.style.fontSize = isMobile.value ? '4.26vw' : ''
      }
    })
    return () => slots?.default?.()
  },
})
</script>
