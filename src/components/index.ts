import { App, Component } from 'vue';
import FilterItem from './filterItem/Index.vue';
import Layout from './layout/Index.vue';
import Menu from './layout/menu/Menu.vue';
import Icon from './icon/Index.vue';
import { createFromIconfontCN } from '@ant-design/icons-vue';

// icon
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2248787_j06912w2li.js'
});
const components: Component[] = [
  FilterItem,
  Layout,
  Menu,
  Icon
];

export const registerComponents = (app: App): void => {
  app.component('icon-font', IconFont);
  components.forEach(component => {
    if (component.name) {
      app.component(component.name, component);
    }
  });
};
