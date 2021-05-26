import { CustomRouteRecordRaw } from '@/types/router';
import { asyncRoutes } from '@/router/index';
import { setFulPath, filterRoutes, defaultRoutesSort } from '@/utils/routes';
import { Commit, Store } from 'vuex';

const routes: any = {
  state: {
    user: {
      routes: []
    },
    token: ''
  },
  mutations: {
    SET_ROUTES: (state: any, routes: CustomRouteRecordRaw[]): void => {
      state.routes = routes;
    }
  },
  actions: {
    setRoutes (store: Store<any>, access: string[]): Promise<any> {
      const commit: Commit = store.commit;
      return new Promise((resolve: any) => {
        const newRoutes = setFulPath(asyncRoutes);
        const availableRoutes = filterRoutes(newRoutes, access);
        // 404 重定向 排序
        const defaultRoutes = defaultRoutesSort(asyncRoutes);
        // 插入默认重定向页面
        for (const item of defaultRoutes) {
          const { permission, path } = item;
          if (access.includes(permission) || permission === true) {
            availableRoutes.push({ path: '/:pathMatch(.*)*', redirect: path, hidden: true, meta: { permission: true } });
            break;
          }
        }

        // 如果没有配置重定向页面则返回404
        if (defaultRoutes.length === 0) {
          availableRoutes.push({ path: '/:pathMatch(.*)*', redirect: '/404', hidden: true, meta: { permission: true } });
        }
        commit('SET_ROUTES', availableRoutes);
        resolve(availableRoutes);
      });
    }
  }
};

export default routes;
