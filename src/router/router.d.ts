import { RouteRecordRaw } from 'vue-router';

// 扩展属性
export declare type CustomRouteRecordRaw = RouteRecordRaw & {
  hidden?: boolean
  fullPath?: string
}
