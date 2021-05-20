import { CustomRouteRecordRaw } from '@/router/router.d';
import { isExternal } from '@/utils/validate';
const path = require('path');

/**
 * @description 根据roles数组拦截路由
 * @param routes
 * @param baseUrl
 * @returns {[]}
 */
export function filterRoutes (routes:CustomRouteRecordRaw[], baseUrl = '/'): CustomRouteRecordRaw[] {
  return routes
    .map((route: any) => {
      if (route.path !== '*' && !isExternal(route.path)) { route.path = path.resolve(baseUrl, route.path); }
      route.fullPath = route.path;
      if (route.children) { route.children = filterRoutes(route.children, route.fullPath); }
      return route;
    });
}
