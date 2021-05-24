import { createApp } from 'vue';
import App from './App.vue';
import router from './router/interceptor';
import store from './store';
import Antd from 'ant-design-vue';
import { registerComponents } from './components/index';
import './assets/style/global.less';

const app = createApp(App);
registerComponents(app);

app.use(store).use(router).use(Antd).mount('#app');
