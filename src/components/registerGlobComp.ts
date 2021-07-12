/*
 * @Author: zhouxs
 * @Date: 2021-07-12 19:41:03
 * @LastEditors: zhouxs
 * @LastEditTime: 2021-07-12 19:42:57
 * @Description: file content
 */
import type { App } from 'vue';
import {
  // Need
  Button,
  Button as AntButton,
  Input,
  Layout,
} from 'ant-design-vue';

const compList = [AntButton.Group];

export function registerGlobComp(app: App) {
  compList.forEach((comp) => {
    app.component(comp.name || comp.displayName, comp);
  });

  app.use(Input).use(Button).use(Layout);
}
