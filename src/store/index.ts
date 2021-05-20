import { createStore } from 'vuex';
import getters from './getters';

const modulesFiles = require.context('./modules', false, /\.ts$/);
const modules = modulesFiles.keys().reduce((modules: any, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  modules[moduleName] = value.default;
  return modules;
}, {});

console.log(modules);
const store = createStore({
  modules,
  getters
});

export default store;
