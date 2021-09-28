<template>
  <Dropdown class="pl-10 pr-10">
    <a @click.stop class="title">
      <slot>
        {{ title }}
        <CaretDownOutlined class="title-icon align-middle" />
      </slot>
    </a>
    <template #overlay>
      <Menu>
        <MenuItem v-for="menu in menus" @click.stop="() => handleClickMenu(menu)" :key="menu.path">
          <template v-if="menu.iconPath" #icon>
            <img :src="menu.iconPath" :alt="menu.title" />
          </template>
          {{ menu.title }}
        </MenuItem>
      </Menu>
    </template>
  </Dropdown>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Dropdown, Menu } from 'ant-design-vue'
import { CaretDownOutlined } from '@ant-design/icons-vue'

type DirectionType = 'row' | 'column'

export default defineComponent({
  name: 'DropdownMenu',
  components: {
    Menu,
    MenuItem: Menu.Item,
    Dropdown,
    CaretDownOutlined,
  },
  props: {
    title: {
      type: String,
      require: false,
      default: '',
    },
    menus: {
      type: Array,
      require: true,
      default: () => [],
    },
    direction: {
      type: String as PropType<DirectionType>,
      require: false,
      default: 'column',
    },
  },
  setup(_, { emit }) {
    const handleClickMenu = (menu) => {
      emit('clickMenu', menu)
    }
    return {
      handleClickMenu,
    }
  },
})
</script>
<style lang="less" scoped>
.title {
  .title-icon {
    transition: transform 0.2s ease-in;
  }
  &:hover {
    .title-icon {
      transform: rotate(180deg);
    }
  }
}
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
.ant-menu-horizontal > .ant-menu-item::after,
.ant-menu-horizontal > .ant-menu-submenu::after {
  transition: none !important;
}
.ant-dropdown-menu-item-icon {
  display: inline-block;
  width: 0.24rem;
  height: auto;
}
</style>
