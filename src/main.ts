import { createApp } from 'vue';
import App from './App.vue';
import router from './router/interceptor';
import store from './store';
import Antd from 'ant-design-vue';
import { registerComponents } from './components/index';
import i18n from '@/utils/i18n';
import './assets/style/global.less';
/** @module markdown */
import VMdEditor from '@kangc/v-md-editor/lib/codemirror-editor';
import '@kangc/v-md-editor/lib/style/codemirror-editor.css';
import githubTheme from '@kangc/v-md-editor/lib/theme/github.js';
import '@kangc/v-md-editor/lib/theme/style/github.css';
import Codemirror from 'codemirror';
// mode
import 'codemirror/mode/markdown/markdown';
// placeholder
import 'codemirror/addon/display/placeholder';
// active-line
import 'codemirror/addon/selection/active-line';
// scrollbar
import 'codemirror/addon/scroll/simplescrollbars';
import 'codemirror/addon/scroll/simplescrollbars.css';
// style
import 'codemirror/lib/codemirror.css';

import hljs from 'highlight.js';
import enUS from '@kangc/v-md-editor/lib/lang/en-US';
import zhCN from '@kangc/v-md-editor/lib/lang/zh-CN';

if (store.getters.localeName === 'zhCN') {
  VMdEditor.lang.use('zh-CN', zhCN);
} else {
  VMdEditor.lang.use('en-US', enUS);
}

VMdEditor.Codemirror = Codemirror;
VMdEditor.use(githubTheme, {
  Hljs: hljs
});

const app = createApp(App);
registerComponents(app);
app.use(i18n).use(VMdEditor);
app.use(store).use(router).use(Antd).mount('#app');
