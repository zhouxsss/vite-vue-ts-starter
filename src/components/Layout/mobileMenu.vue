<template>
  <teleport to="body">
    <div class="menu-mobile fixed inset-0" v-show="visible">
      <!-- <div class="bg fixed inset-0"></div> -->
      <div class="flex items-center justify-between">
        <a href="#" @click="goRoute('/')">
          <img src="/@/assets/logo.png" alt="logo" class="logo" />
        </a>
        <a href="#" @click="handleClose">
          <img src="/@/assets/close-menu.png" alt="logo" class="close" />
        </a>
      </div>
      <ul class="block normal">
        <li v-for="menu in headerMenu" :key="menu.key">
          <a @click="() => goRoute(menu.path)">{{ menu.title }}</a>
          <div v-if="menu.subMenus" class="sub">
            <a
              @click="() => goRoute(subMenu.path)"
              v-for="subMenu in menu.subMenus"
              :key="subMenu.key"
              >{{ subMenu.title }}</a
            >
          </div>
        </li>
      </ul>
      <ul class="block user">
        <li v-if="isLogin">
          <a @click="handleGoToUser">{{ userName }}</a>
        </li>
      </ul>
      <div class="block" v-if="!isLogin">
        <a-button @click="showLogin">{{
          `${$t('login.login')} | ${$t('login.register')}`
        }}</a-button>
      </div>
      <ul class="block locales bottom-0 left-0 flex">
        <li v-for="(item, idx) in localeList" :key="item.key">
          <span class="division" v-if="idx"></span>
          <div
            :class="`${locale === item.key ? 'active' : ''} inline-block`"
            @click="() => handleClickLocale(item)"
          >
            <img :src="item.iconPath" :alt="item.title" class="w-24 mr-10 inline-block" />
            <span>{{ item.title }}</span>
          </div>
        </li>
      </ul>
    </div>
  </teleport>
</template>
<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { storeKey } from '/@/store'
import { useGo } from '/@/hooks/useGo'
import { useLocales } from '/@/locales/useLocales'

export default defineComponent({
  name: 'menuMobile',
  props: ['headerMenu', 'loginMenu', 'userName', 'visible'],
  setup(props, { emit }) {
    const go = useGo()
    const store = useStore(storeKey)
    const handleClose = () => {
      emit('update:visible', false)
    }
    const { getLocale, getLocaleList, changeLocale } = useLocales()
    const localeList = getLocaleList()
    const showLogin = () => {
      handleClose()
      store.commit('setLoginVisible', true)
    }
    const handleClickLocale = (cur) => {
      changeLocale(cur.key)
    }
    const goRoute = (path) => {
      if (path === '/user?i=3') {
        store.commit('setUseri', 3)
      }
      handleClose()
      go(path)
    }
    const handleGoToUser = () => {
      handleClose()
      emit('goToUser')
      store.commit('setUseri', 0)
      handleClose()
    }

    // 兼容Android的blur
    watch(
      () => props.visible,
      (cur) => {
        const root = document.getElementById('app')

        if (cur) {
          root?.setAttribute('style', 'filter:blur(120px)')
        } else {
          root?.removeAttribute('style')
        }
      }
    )

    return {
      goRoute,
      isLogin: computed(() => store.state.user?.isLogin),
      handleClose,
      showLogin,
      locale: getLocale(),
      localeList: localeList,
      handleClickLocale,
      handleGoToUser
    }
  },
})
</script>

<style lang="less" scoped>
.menu-mobile {
  padding: 0.22rem 0.24rem;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(120px);
  overflow-y: auto;
  z-index: 10;
  .bg {
    backdrop-filter: blur(120px);
    filter: blur(120px);
    background: rgba(255, 255, 255, 0.4);
  }
  .logo {
    width: 0.9rem;
    height: auto;
  }
  .close {
    width: 0.24rem;
  }
  .block {
    padding: 0.4rem 0;
    &:not(:last-child) {
      border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
    }
  }
  .normal {
    & li:not(:last-child) {
      padding-bottom: 0.1rem;
    }
    a {
      margin-bottom: 0.2rem;
      display: block;
      font-size: 0.16rem;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 600;
    }
    .sub {
      a {
        margin-bottom: 0;
        display: block;
        font-size: 0.14rem;
        color: rgba(0, 0, 0, 0.85);
        font-weight: 400;
        &:not(:last-child) {
          margin-bottom: 0.2rem;
        }
      }
    }
  }
  .user {
    font-size: 0.14rem;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 600;
    border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
    a {
      display: block;
    }
    & li:not(:last-child) {
      margin-bottom: 0.2rem;
    }
  }
  .locales {
    background: transparent;
    & > li {
      & > div {
        padding: 0.02rem 0.08rem;
        border-radius: 4px;
        border: 1px solid transparent;
      }
      .active {
        border: 1px solid rgba(0, 0, 0, 0.4);
      }
    }
  }
  .division {
    margin: 0 0.12rem;
    height: 0.08rem;
    width: 0;
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }
}
</style>
