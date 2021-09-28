<template>
  <template v-for="menu in menus" :key="menu.key">
    <!-- <SubMenu v-if="menu.subMenus">
      <template #title>
        {{ menu.title }}
        <CaretDownOutlined class="align-middle" />
      </template>
      <menu-item :menus="menu.subMenus" />
    </SubMenu> -->
    <Dropdown placement="bottomCenter" v-if="menu.subMenus">
      <div :class="`subs-title ant-menu-submenu-title ${calIsSubActiveClass(menu.subMenus)}`">
        <span class="ant-menu-title-content" style="font-size: 0.13rem">{{ menu.title }}</span>
        <CaretDownOutlined class="align-middle" />
      </div>
      <template #overlay>
        <div class="subs flex items-start box-background">
          <div v-for="sub in menu.subMenus" :key="sub.key" class="subs-item">
            <a
              :class="`w-120 h-120 flex flex-col justify-center items-center ${
                selectedKeys[0] === sub.path ? 'active' : ''
              }`"
              href="javascript:"
              @click="() => handleClickMenu(sub)"
            >
              <img :src="sub.iconPath" :alt="sub.title" class="mb-5" />
              <p>{{ sub.title }}</p>
            </a>
          </div>
        </div>
      </template>
    </Dropdown>
    <MenuItem v-else @click="() => handleClickMenu(menu)" :key="menu.path">
      <template v-if="menu.iconPath" #icon>
        <img :src="menu.iconPath" :alt="menu.title" />
      </template>
      {{ menu.title }}
    </MenuItem>
  </template>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { Menu, Dropdown } from 'ant-design-vue'
import { CaretDownOutlined } from '@ant-design/icons-vue'
import { useGo } from '/@/hooks/useGo'
export default defineComponent({
  name: 'menu-item',
  components: {
    MenuItem: Menu.Item,
    SubMenu: Menu.SubMenu,
    CaretDownOutlined,
    Dropdown,
  },
  props: ['menus', 'selectedKeys'],
  setup(props, { emit }) {
    const goRoute = useGo()
    const handleClickMenu = ({ key, path }) => {
      if (path) {
        goRoute(path)
      } else {
        emit('clickMenu', key)
      }
    }
    const calIsSubActiveClass = (subs) => {
      return !!subs.find((item) => props.selectedKeys.includes(item.path))
        ? 'ant-menu-item-selected'
        : ''
    }
    return {
      handleClickMenu,
      calIsSubActiveClass,
    }
  },
})
</script>
<style lang="less">
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-open::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected::after,
.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected::after {
  border: none !important;
}
.ant-menu-item,
.ant-menu-submenu-title {
  padding: 0 0.12rem !important;
}
.ant-menu-horizontal > .ant-menu-item::after,
.ant-menu-horizontal > .ant-menu-submenu::after {
  transition: none !important;
}
.ant-menu-item-icon {
  display: inline-block;
  width: 0.24rem;
  height: auto;
}
.subs {
  padding: 0.16rem 0;
  font-size: 0.12rem;
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  border-radius: 8px;
  &-item {
    padding: 0 0.12rem;
    &:not(:last-child) {
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }
    a {
      background: #e1fbe8;
      border-radius: 8px;
      border: 1px solid transparent;
      cursor: pointer;
      img {
        height: 0.8rem;
        width: auto;
      }
      &.active,
      &:hover {
        border: 1px solid #00e676;
      }
    }
  }
}
</style>
