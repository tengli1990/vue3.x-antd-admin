/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 声明全局方法
declare module 'vue/types/vue' {
  import VueRouter, { Route } from 'vue-router'
  import VueI18n from 'vue-i18n'
  interface Vue {
    $message: any;
    // $i18n: VueI18n;
    $router: VueRouter;
    $route: Route;

  }
}


declare module '@kangc/v-md-editor/lib/theme/github.js';
declare module '@kangc/v-md-editor/lib/lang/en-US';
declare module '@kangc/v-md-editor/lib/lang/zh-CN';
declare module '@kangc/v-md-editor/lib/plugins/mermaid/cdn';
declare module '@kangc/v-md-editor/lib/codemirror-editor';
declare module '@kangc/v-md-editor';
