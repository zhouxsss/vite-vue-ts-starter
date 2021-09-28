<template>
  <modal :visible="visible" :title="$t('login.registerSuccess')" :hideClose="true">
    <div class="w-120 text-center m-auto">
      <p class="mb-20">{{ $t('login.getNFTTip') }}</p>
    </div>
    <template #footer>
      <a-button shape="round" @click="goToOwner" class="w-full" type="primary">
        {{ $t('login.getNFT') }}
      </a-button>
    </template>
  </modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useGo } from '/@/hooks/useGo'
import paths from '/@/constants/paths'

export default defineComponent({
  name: 'registerSuccess',
  props: ['visible'],
  setup(_, { emit }) {
    const goRoute = useGo()
    const goToOwner = () => {
      goRoute(paths.user)
      emit('update:visible', false)
    }
    return {
      goToOwner,
    }
  },
})
</script>
