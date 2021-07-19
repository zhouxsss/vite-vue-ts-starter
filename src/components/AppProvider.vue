<script>
import { ref } from 'vue'
import { defineComponent } from '@vue/composition-api'
import { createContext } from '/@/hooks/useContext'

export default defineComponent({
  setup(props, { slot }) {
    const isMobile = ref(false)
    createContext({ isMobile })

    return () => slot.default?.()
  },
})
</script>
