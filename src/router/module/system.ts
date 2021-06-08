import { CustomRouteRecordRaw } from '@/types/router';
import { Component } from '@vue/runtime-core';
import Layout from '@/components/layout/Index.vue';
// import RouteView from '@/components/layout/RouteView.vue';

const system: Array<CustomRouteRecordRaw> = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/account',
    meta: {
      title: '系统管理',
      permission: true
    },
    children: [
      {
        path: 'account',
        name: 'SystemAccount',
        redirect: '/system/account/tab1',
        component: (): Component => import('@/sample/system/Account.vue'),
        // component: RouteView,
        meta: {
          title: '账户管理',
          icon: 'icon-as-sever',
          permission: true,
          default: 10
        },
        children: [
          {
            path: 'tab1',
            name: 'SystemAccountTab1',
            component: (): Component => import('@/sample/system/account/Tab1.vue'),
            meta: {
              title: '账户管理tab1',
              permission: true,
              tagHidden: true
            }
          },
          {
            path: 'tab2',
            name: 'SystemAccountTab2',
            component: (): Component => import('@/sample/system/account/Tab2.vue'),
            meta: {
              title: '账户管理tab2',
              permission: true,
              tagHidden: true
            }
          }
        ]
      }
    ]
  }
];

export default system;
