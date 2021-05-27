import { CustomRouteRecordRaw } from '@/types/router';
import { Component } from '@vue/runtime-core';
import Layout from '@/components/layout/Index.vue';
// import RouteView from '../components/layout/RouteView.vue';

const index: Array<CustomRouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      permission: true
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: (): Component => import('@/sample/index/Index.vue'),
        meta: {
          title: '首页',
          icon: 'icon-as-sever',
          permission: true,
          default: 10,
          affix: true
        }
      }
    ]
  }
];

export default index;
