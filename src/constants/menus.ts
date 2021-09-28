import paths from './paths'
export interface MenuType {
  key: string
  title: string
  path?: string
  iconPath?: string
}

export const headerMenu = (t) => [
  {
    key: 'home',
    title: t('layout.menu.home'),
    path: paths.home,
  }
]
