<template>
  <div class="flex-1 flex items-center justify-end">
    <Menu mode="horizontal" v-model:selectedKeys="selectedKeys" class="menu" v-if="!isMobile">
      <div class="flex w-full items-center justify-between">
        <div class="leftMenu flex">
          <MenuItem :menus="headerMenu" :selectedKeys="selectedKeys" />
        </div>
        <div class="rightMenu flex items-center">
          <DropdownMenu
            :title="locale"
            :menus="localeList"
            @clickMenu="handleClickLocale"
          ></DropdownMenu>
          <div
            v-if="isLogin"
            class="
              w-80
              overflow-hidden overflow-ellipsis
              cursor-pointer
              whitespace-nowrap
              pl-12
              pr-12
            "
            @click="goToUser"
            >{{ userName }}</div
          >
          <div v-else @click="showLogin" class="cursor-pointer pl-12 pr-12">{{
            `${$t('login.login')}/${$t('login.register')}`
          }}</div>
        </div>
      </div>
    </Menu>
    <template v-if="isMobile">
      <span class="division mr-10 ml-10"></span>
      <a href="#" @click="handleShowMenu">
        <img src="/@/assets/menu.png" alt="logo" class="w-24" />
      </a>
      <MobileMenu
        :headerMenu="headerMenu"
        :headerRightMenu="headerRightMenu"
        :userName="userName"
        @goToUser="goToUser"
        v-model:visible="state.mobileVisible"
      />
    </template>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, computed, reactive } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { storeKey } from '/@/store'
import { MenuType } from '/@/constants/menus'
import { Menu, Dropdown } from 'ant-design-vue'
import MenuItem from './menuItem.vue'
import MobileMenu from './mobileMenu.vue'
import DropdownMenu from '../DropdownMenu/index.vue'
import { headerMenu } from '/@/constants/menus'
import { useI18n } from 'vue-i18n'
import { useLocales } from '/@/locales/useLocales'
import { useAppProviderContext } from '/@/hooks/context/useAppContext'
import { useGo } from '/@/hooks/useGo'
import paths from '/@/constants/paths'

export default defineComponent({
  name: 'layoutMenu',
  components: {
    Menu,
    AMenuItem: Menu.Item,
    MenuItem: MenuItem,
    Dropdown,
    DropdownMenu,
    MobileMenu,
  },
  props: {
    menus: {
      type: Object as PropType<MenuType>,
      require: true,
      default: function () {
        return []
      },
    },
  },
  setup() {
    const store = useStore(storeKey)
    const { t } = useI18n()
    const route = useRoute()
    const { getLocale, getLocaleList, changeLocale } = useLocales()
    const localeList = getLocaleList()
    const state = reactive({
      mobileVisible: false,
    })
    const context = useAppProviderContext()
    const goRoute = useGo()
    const ownerPath = paths.user + '?i=3'

    const showLogin = () => {
      store.commit('setLoginVisible', true)
    }
    const handleClickLocale = (cur) => {
      changeLocale(cur.key)
    }
    const handleShowMenu = () => {
      state.mobileVisible = true
    }
    const goToUser = () => {
      store.commit('setUseri', 0)
      goRoute(paths.user)
    }
    const fullPath = computed({
      set: () => {},
      get: () => [route.fullPath],
    })
    return {
      headerMenu: computed(() => headerMenu(t)),
      userName: computed(() => store.state.user?.username),
      goToUser,
      selectedKeys: fullPath,
      isLogin: computed(() => store.state.user?.isLogin),
      showLogin,
      locale: computed(() => localeList.find((item) => item.key === getLocale().value)?.title),
      localeList: localeList,
      handleClickLocale,
      state,
      handleShowMenu,
      isMobile: computed(() => context.isMobile),
      ownerPath,
    }
  },
})
</script>
<style lang="less" scoped>
.menu {
  flex: 1;
  background-color: transparent;
  .leftMenu {
    color: rgba(0, 0, 0, 0.65);
    font-weight: 700;
    font-size: 0.14rem;
    align-items: center;
  }
  .rightMenu {
    color: rgba(0, 0, 0, 0.65);
  }
}
.ant-menu-horizontal {
  border: none;
}
.division {
  display: inline-block;
  height: 0.16rem;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
}
.contact-btn {
  padding: 0.01rem;
  height: 0.3rem;
  line-height: 0.28rem;
  border-radius: 0.3rem;
  // background: linear-gradient(to right, @primary-color, #b2fffa);
  border: 1px solid @primary-color;
  font-size: 0.14rem;
  div {
    padding: 0 0.1rem;
    height: 0.28rem;
    border-radius: 0.28rem;
    background: transparent;
  }
  img {
    display: inline-block;
    width: 0.16rem;
  }
}
.contact-cont {
  padding: 0.16rem;
  width: 1.82rem;
  font-size: 0.12rem;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 8px;
}
</style>
