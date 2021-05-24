import router from '@/router/index';
import store from '@/store/index';
import NProgress from 'nprogress'; // progress bar
// import '@/assets/styles/nprogress.less'; // progress bar custom style
// import { setDocumentTitle, domTitle } from '@/utils';
import { getToken } from '@/utils/token';
import { toRaw } from 'vue';
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

NProgress.configure({ showSpinner: false }); // NProgress Configuration

NProgress.start();
router.beforeEach(async (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext):Promise<any> => {
  // 设置标题
  // to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${domTitle} - ${to.meta.title}`));
  // 加载不需要验证登录和授权的页面
  if (to.meta.verification === false) {
    next();
    return;
  }
  const token = getToken();
  const user = toRaw(store.getters.user);
  const permissions = toRaw(store.getters.permissions); // ['dashboard-111', 'dashboard-222']

  // console.log(token, user, permissions);
  if (token) {
    if (user != null && permissions != null) {
      next();
    } else {
      // 有 token 无 user 信息, 通常在登录后在页面刷新的情况, 通过getUserInfo拿user信息
      await store.dispatch('getUserInfo', token);
      const routes = await store.dispatch('setRoutes', toRaw(store.getters.permissions));
      console.log(11231231, routes);
      console.log(router);
      // router.addRoute(routes); // 通过获取到的权限来动态添加路由
      routes.forEach((route: any) => {
        router.addRoute(route);
      });
      next();
      router.replace(to);
    }
  } else {
    const currentRoute = document.URL.split(location.host)[1];
    console.log(currentRoute);
    // next('/login?redirect=' + encodeURIComponent(currentRoute));
    next({
      path: '/login',
      query: {
        redirect: encodeURIComponent(currentRoute)
      }
    });
  }
});

router.afterEach(() => {
  NProgress.done(); // finish progress bar
});

export default router;
