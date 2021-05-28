import { CustomRouteRecordRaw } from '@/types/router';
import { Component } from '@vue/runtime-core';
import Layout from '@/components/layout/Index.vue';
// import RouteView from '../components/layout/RouteView.vue';

const screw: Array<CustomRouteRecordRaw> = [
  {
    path: '/component',
    component: Layout,
    redirect: '/component/icon',
    meta: {
      icon: 'icon-as-sever',
      title: '组件',
      permission: true
    },
    children: [
      {
        path: 'icon',
        name: 'ComponentIcon',
        component: (): Component => import('@/sample/screw/Icon.vue'),
        meta: {
          title: '图标',
          permission: true,
          default: 10
          // affix: true
        }
      },
      {
        path: 'chart',
        name: 'ComponentChart',
        component: (): Component => import('@/sample/screw/Chart.vue'),
        meta: {
          title: '图表',
          permission: true,
          default: 10
        }
      },
      {
        path: 'editor',
        name: 'ComponentEditor',
        component: (): Component => import('@/sample/screw/Tinymce.vue'),
        meta: {
          title: '富文本',
          permission: true,
          default: 10
        }
      },
      {
        path: 'markdown',
        name: 'ComponentMarkdown',
        component: (): Component => import('@/sample/screw/Markdown.vue'),
        meta: {
          title: 'markdown',
          permission: true,
          default: 10
        }
      },
      {
        path: 'json-tree',
        name: 'ComponentJsonTree',
        component: (): Component => import('@/sample/screw/JsonTree.vue'),
        meta: {
          title: '数据树',
          permission: true,
          default: 10
        }
      }
    ]
  }
];

export default screw;
