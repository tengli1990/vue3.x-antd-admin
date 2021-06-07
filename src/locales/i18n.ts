import { createI18n } from 'vue-i18n';
import zhCN from '@/locales/zh';
import enUS from '@/locales/en';
const i18n = createI18n({
  locale: window.localStorage.getItem('_LANGUAGE') || 'zhCN',
  messages: {
    zhCN, // 中文语言包
    enUS // 英文语言包
  }
});

export default i18n;
