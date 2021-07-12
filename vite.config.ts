/*
 * @Author: zhouxs
 * @Date: 2021-07-07 17:53:51
 * @LastEditors: zhouxs
 * @LastEditTime: 2021-07-12 19:50:16
 * @Description: file content
 */
import type { UserConfig, ConfigEnv } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'
import { getThemeVariables } from 'ant-design-vue/dist/theme'

import { createProxy } from './build/vite/proxy'
import { OUTPUT_DIR } from './build/constants'

export default ({command, mode}: ConfigEnv) : UserConfig  => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const { VITE_PUBLIC_PATH, VITE_PORT, VITE_PROXY, VITE_DROP_CONSOLE } = env
  return {
    base: VITE_PUBLIC_PATH,
    root,
    resolve: {
      alias: [
        // /@/xxxx => src/xxxx
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        // /#/xxxx => types/xxxx
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ]
    },
    server: {
      host: true,
      port: VITE_PORT ? Number(VITE_PORT) : 3000,
      proxy: createProxy(JSON.parse(VITE_PROXY))
    },
    build: {
      target: 'es2015',
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: genBoolean(VITE_DROP_CONSOLE)
        }
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: getThemeVariables({ dark: false }),
          javascriptEnabled: true
        }
      }
    },
    plugins: [
      vue(),
      styleImport({
        libs: [{
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`
          }
        }]
      })
    ],
    optimizeDeps: {
      include: [
        'ant-design-vue/es/locale/zh_CN',
        'moment/dist/locale/zh-cn',
        'ant-design-vue/es/locale/en_US',
        'moment/dist/locale/eu',
      ]
    },
  }
}

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir)
}

function genBoolean(val: string | undefined) {
  return val === 'true' ? true : val ==='false' ? false : undefined
}