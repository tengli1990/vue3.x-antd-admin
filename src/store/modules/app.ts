import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN';
import enUS from 'ant-design-vue/lib/locale-provider/en_US';
import { Store } from 'vuex';
import { AppLocalState } from '@/types/vuex';

const app = {
  state: {
    locale: zhCN,
    localeName: window.localStorage.getItem('_LANGUAGE') || 'zhCN',
    siderWidth: 250
  },
  mutations: {
    setLocale (state: AppLocalState, language: string): void {
      const locales: any = {
        zhCN,
        enUS
      };
      state.locale = locales[language];
      state.localeName = language;
    },
    setSiderWidth (state: AppLocalState, value: number | string): void {
      state.siderWidth = value;
    }
  },
  actions: {
    setLocale (store: Store<any>, language: string): void {
      store.commit('setLocale', language);
    },
    setSiderWidth (store: Store<any>, value: number | string): void {
      store.commit('setSiderWidth', value);
    }
  }
};

export default app;
