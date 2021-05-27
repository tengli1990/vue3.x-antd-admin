import { CustomRouteRecordRaw } from '@/types/router';
import { Store } from 'vuex';
import { TabsBarState } from '@/types/vuex';

const tabsBar = {
  state: {
    visitedRoutes: []
  },
  mutations: {
    /**
    * @description 添加标签页
    * @param {*} state
    * @param {*} route
    * @returns
    */
    addVisitedRoute (state: TabsBarState, route: CustomRouteRecordRaw): void {
      const target = state.visitedRoutes.find((item: any) => item.path === route.path);
      if (target) {
        if (route.fullPath !== target.fullPath) Object.assign(target, route);
        return;
      }
      state.visitedRoutes.push(Object.assign({}, route));
    },
    /**
     * @description 删除当前标签页
     * @param {*} state
     * @param {*} route
     * @returns
     */
    delVisitedRoute (state: TabsBarState, route: CustomRouteRecordRaw): void {
      state.visitedRoutes.forEach((item: any, index: any) => {
        if (item.path === route.path) state.visitedRoutes.splice(index, 1);
      });
    },
    /**
     * @description 删除当前标签页以外其它全部多标签页
     * @param {*} state
     * @param {*} route
     * @returns
     */
    delOthersVisitedRoutes (state: TabsBarState, route: CustomRouteRecordRaw): void {
      state.visitedRoutes = state.visitedRoutes.filter(
        (item: any) => item.meta.affix || item.path === route.path
      );
    },
    /**
     * @description 删除当前标签页左边全部多标签页
     * @param {*} state
     * @param {*} route
     * @returns
     */
    delLeftVisitedRoutes (state: TabsBarState, route: CustomRouteRecordRaw): void {
      let index = state.visitedRoutes.length;
      state.visitedRoutes = state.visitedRoutes.filter((item: any) => {
        if (item.name === route.name) index = state.visitedRoutes.indexOf(item);
        return item.meta.affix || index <= state.visitedRoutes.indexOf(item);
      });
    },
    /**
     * @description 删除当前标签页右边全部多标签页
     * @param {*} state
     * @param {*} route
     * @returns
     */
    delRightVisitedRoutes (state: TabsBarState, route: CustomRouteRecordRaw): void{
      let index = state.visitedRoutes.length;
      state.visitedRoutes = state.visitedRoutes.filter((item: any) => {
        if (item.name === route.name) index = state.visitedRoutes.indexOf(item);
        return item.meta.affix || index >= state.visitedRoutes.indexOf(item);
      });
    },
    /**
     * @description 删除全部多标签页
     * @param {*} state
     * @param {*} route
     * @returns
     */
    delAllVisitedRoutes (state: TabsBarState): void {
      state.visitedRoutes = state.visitedRoutes.filter((item: any) => item.meta.affix);
    }

  },
  actions: {
    /**
   * @description 添加标签页
   * @param {*} { commit }
   * @param {*} route
   */
    addVisitedRoute ({ commit }: Store<any>, route:CustomRouteRecordRaw): void {
      commit('addVisitedRoute', route);
    },
    /**
     * @description 删除当前标签页
     * @param {*} { commit }
     * @param {*} route
     */
    delVisitedRoute ({ commit }: Store<any>, route: CustomRouteRecordRaw): void {
      commit('delVisitedRoute', route);
    },
    /**
     * @description 删除当前标签页以外其它全部多标签页
     * @param {*} { commit }
     * @param {*} route
     */
    delOthersVisitedRoutes ({ commit }: Store<any>, route:CustomRouteRecordRaw): void {
      commit('delOthersVisitedRoutes', route);
    },
    /**
     * @author chuzhixin 1204505056@qq.com
     * @description 删除当前标签页左边全部多标签页
     * @param {*} { commit }
     * @param {*} route
     */
    delLeftVisitedRoutes ({ commit }: Store<any>, route:CustomRouteRecordRaw): void {
      commit('delLeftVisitedRoutes', route);
    },
    /**
     * @description 删除当前标签页右边全部多标签页
     * @param {*} { commit }
     * @param {*} route
     */
    delRightVisitedRoutes ({ commit }: Store<any>, route:CustomRouteRecordRaw): void {
      commit('delRightVisitedRoutes', route);
    },
    /**
     * @description 删除全部多标签页
     * @param {*} { commit }
     */
    delAllVisitedRoutes ({ commit }: Store<any>): void {
      commit('delAllVisitedRoutes');
    }
  }
};

export default tabsBar;
