# artBingo

## 配置

### Vue 全家桶

vue3.0 + vuex4 + vue-router4

### 组件库

ant-design-vue

### 其他工具

vue-i18n axios tailwindcss

### 构建工具

vite + eslint + prettier

## 目录结构

```
├── build 打包配置文件
├── dist 打包后生成文件
├── public
├── src
│   ├── App.vue
│   ├── apis 接口定义
│   ├── assets 图片资源
│   ├── components 组件
│   │   ├── AppProvider.vue 嵌套组件
│   │   ├── ArtBingo 业务组件
│   │   ├── Layout 布局
│   │   └── registerGlobComp.ts 注册公共组件
│   ├── constants 变量
│   ├── design 样式
│   ├── hooks hooks
│   ├── locales 语言
│   │   ├── imgs 图片
│   │   ├── lang 文字
│   ├── main.ts 入口文件
│   ├── router 路由
│   ├── store 状态
│   ├── utils 工具
│   ├── views 页面
├── tailwind.config.js tailwind配置文件
├── types 类型声明
├── vite.config.ts vite配置文件
```
