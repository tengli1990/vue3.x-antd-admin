import { RouteRecordRaw } from 'vue-router';

// 扩展属性
export declare type CustomRouteRecordRaw = RouteRecordRaw & {
  permissionId?: any;
  hidden?: boolean;
  fullPath?: string;
  index?: any;
}

// 重定向路由
export declare interface CustomRedirectRoute{
  permissionId: unknow | string;
  path: string;
  index: number;
}
