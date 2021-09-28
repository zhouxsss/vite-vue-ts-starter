<script lang="ts">
import { ref, defineComponent } from 'vue'
import { createAppProviderContext } from '/@/hooks/context/useAppContext'
import { createBreakpointListen } from '/@/hooks/useBreakpoint'

export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  setup(_, { slots }) {
    const isMobile = ref(false)
    createAppProviderContext({ isMobile })

    const htmlDom = document.querySelector('html') as HTMLElement

    createBreakpointListen(({ screenMap, sizeEnum, width, realWidth }) => {
      const lgWidth = screenMap.get(sizeEnum.LG)
      const mdWidth = screenMap.get(sizeEnum.MD)
      if (lgWidth && mdWidth) {
        isMobile.value = width.value - 1 < lgWidth
        const isMiniMobile = width.value - 1 < mdWidth
        const mobileFont = isMiniMobile
          ? (realWidth.value / 375) * 100
          : ((realWidth.value / 375) * 100) / 2
        htmlDom.style.fontSize = isMobile.value ? `${mobileFont}px` : '625%'
      }
    })
    return () => slots?.default?.()
  },
})
</script>
