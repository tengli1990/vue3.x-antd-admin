import { CustomRouteRecordRaw } from '@/router/router';
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
    // checkPermission: ({commit}){

    // },
    setRoutes (store: Store<any>, access: string[]): Promise<any> {
      const commit: Commit = store.commit;
      return new Promise((resolve: any) => {
        const newRoutes = setFulPath(asyncRoutes);
        const availableRoutes = filterRoutes(newRoutes, access);
        // console.log('ava', availableRoutes);
        // 404 重定向 排序
        const defaultRoutes = defaultRoutesSort(asyncRoutes);

        for (const item of defaultRoutes) {
          const { permission, path } = item;
          if (access.includes(permission) || permission === true) {
            availableRoutes.push(
              {
                path: '/:pathMatch(.*)*', redirect: path, hidden: true, meta: { permission: true }
              }
            );
            break;
          }
        }

        if (defaultRoutes.length === 0) {
          availableRoutes.push(
            {
              path: '/:pathMatch(.*)*', redirect: '/404', hidden: true, meta: { permission: true }
            }
          );
        }
        console.log(availableRoutes);
        commit('SET_ROUTES', availableRoutes);
        resolve(availableRoutes);
      });
    }
  }
};

export default routes;
