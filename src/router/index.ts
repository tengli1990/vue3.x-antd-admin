import { Component } from '@vue/runtime-core';
import { createRouter, createWebHistory } from 'vue-router';
import Layout from '../components/layout/Index.vue';
import RouteView from '../components/layout/RouteView.vue';
import { CustomRouteRecordRaw } from './router.d';

export const constantRoutes: Array<CustomRouteRecordRaw> = [
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
  // {
  //   path: '/404',
  //   name: '404',
  //   component: () => import('@/views/404'),
  //   hidden: true
  // }
];

export const asyncRoutes: Array<CustomRouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页'
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: (): Component => import('@/views/index/Index.vue'),
        meta: {
          title: '首页',
          icon: 'icon-as-sever'
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
      icon: 'icon-as-interation'
    },
    children: [
      {
        path: '/comp/echart',
        name: 'Echart',
        component: (): Component => import('@/views/echart.sample/Index.vue'),
        meta: {
          title: '图表'
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
          title: '页头'
          // icon: 'icon-as-tags'
        },
        children: [
          {
            path: '/comp/echart1',
            name: 'Echart1',
            component: (): Component => import('@/views/echart.sample/Index.vue'),
            meta: {
              title: '图表'
              // icon: 'icon-as-view'
            }
          },
          {
            path: '/page-header1',
            name: 'PageIcon1',
            component: (): Component => import('@/views/Home.vue'),
            meta: {
              title: '页头'
              // icon: 'icon-as-tags'
            }
          }
        ]
      }
    ]
  },
  // {
  //   path: '/test',
  //   component: Layout,
  //   redirect: '/test/test',
  //   meta: {
  //     title: '动态路由测试',
  //     icon: 'test-tube-line'
  //   },
  //   children: [
  //     {
  //       path: 'test',
  //       name: 'Test',
  //       component: () => import('@/views/test'),
  //       meta: {
  //         title: '动态路由测试',
  //         icon: 'test-tube-line'
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/error',
  //   name: 'Error',
  //   component: Layout,
  //   redirect: '/error/403',
  //   meta: {
  //     title: '错误页',
  //     icon: 'error-warning-line'
  //   },
  //   children: [
  //     {
  //       path: '403',
  //       name: 'Error403',
  //       component: () => import('@/views/403'),
  //       meta: {
  //         title: '403',
  //         icon: 'error-warning-line'
  //       }
  //     },
  //     {
  //       path: '404',
  //       name: 'Error404',
  //       component: () => import('@/views/404'),
  //       meta: {
  //         title: '404',
  //         icon: 'error-warning-line'
  //       }
  //     }
  //   ]
  // },
  {
    path: '/*',
    redirect: '/404',
    hidden: true
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: asyncRoutes
});

export default router;
