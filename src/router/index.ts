import { Component } from '@vue/runtime-core';
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../components/layout/Index.vue';
import RouteView from '../components/layout/RouteView.vue';
import { CustomRouteRecordRaw } from './router.d';

export const constantRoutes: Array<CustomRouteRecordRaw> = [
  {
    path: '/login',
    component: () => import('@/views/user/Login.vue'),
    hidden: true,
    meta: {
      verification: false
    }
  },
  // {
  //   path: '/login',
  //   component: () => import('@/views/login'),
  //   hidden: true
  // },
  // {
  //   path: '/403',
  //   name: '403',
  //   component: () => import('@/views/403'),
  //   hidden: true
  // },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/failed/404.vue'),
    hidden: true
  }
];

export const asyncRoutes: Array<CustomRouteRecordRaw> = [
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
        component: (): Component => import('@/views/index/Index.vue'),
        meta: {
          title: '首页',
          icon: 'icon-as-sever',
          permission: true,
          default: 10
        }
      }
    ]
  },
  {
    path: '/comp',
    component: Layout,
    redirect: '/comp/echart',
    meta: {
      title: '组件',
      icon: 'icon-as-interation',
      permission: true
    },
    children: [
      {
        path: '/comp/echart',
        name: 'Echart',
        component: (): Component => import('@/views/echart.sample/Index.vue'),
        meta: {
          title: '图表',
          permission: true
          // icon: 'icon-as-view'
        }
      },
      {
        path: 'page-header',
        name: 'PageIcon',
        // component: (): Component => import('@/views/Home.vue'),
        component: RouteView,
        redirect: '/comp/echart1',
        meta: {
          title: '页头',
          permission: true
          // icon: 'icon-as-tags',
        },
        children: [
          {
            path: 'echart1',
            name: 'Echart1',
            component: (): Component => import('@/views/echart.sample/Index.vue'),
            meta: {
              title: '图表',
              permission: 'test-demo'
              // permission: true
              // icon: 'icon-as-view'
            }
          },
          {
            path: 'page-header1',
            name: 'PageIcon1',
            component: (): Component => import('@/views/Home.vue'),
            meta: {
              title: '页头',
              permission: true,
              default: 9
              // icon: 'icon-as-tags'
            }
          }
        ]
      },
      {
        path: 'test',
        name: 'Test',
        // component: (): Component => import('@/views/Home.vue'),
        component: RouteView,
        redirect: '/comp/echart1',
        meta: {
          title: '页头',
          permission: true
          // icon: 'icon-as-tags',
        },
        children: [
          {
            path: 'test-1',
            name: 'Test-1',
            component: (): Component => import('@/views/echart.sample/Index.vue'),
            meta: {
              title: '图表',
              permission: 'test-demo'
              // permission: true
              // icon: 'icon-as-view'
            }
          },
          {
            path: 'test-2',
            name: 'Test-2',
            component: (): Component => import('@/views/Home.vue'),
            meta: {
              title: '页头',
              permission: true,
              default: 9
              // icon: 'icon-as-tags'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/demo',
    component: Layout,
    redirect: '/index',
    meta: {
      title: 'demo',
      permission: true
    },
    children: [
      {
        path: 'index',
        name: 'DemoIndex',
        component: (): Component => import('@/views/index/Index.vue'),
        meta: {
          title: 'hahha',
          icon: 'icon-as-sever',
          permission: true,
          default: 10
        }
      },
      {
        path: 'index1',
        name: 'DemoIndex1',
        component: (): Component => import('@/views/failed/404.vue'),
        meta: {
          title: 'hahha',
          icon: 'icon-as-sever',
          permission: true,
          default: 10
        }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: constantRoutes
});

export default router;
