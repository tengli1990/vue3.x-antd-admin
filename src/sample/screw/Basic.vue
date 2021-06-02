<template>
  <m-field title="组件-PageHeader">
    <m-page-header title="组件详情" sub-title="副标题">
      <template #extra>
        <a-button type="default" @click="refresh">
          <SyncOutlined solt="icon" />
        </a-button>
        <a-button key="3">按钮3</a-button>
        <a-button key="2">按钮2</a-button>
        <a-button key="1" type="primary">按钮1</a-button>
      </template>
    </m-page-header>
  </m-field>

  <m-field class="mt10" title="组件-Details">
    <m-details column="2" :label-width="100" v-model:config="detailConfig" v-model="detailData">
      <template v-slot:custom="{text,record}" >
        <!-- {{text}} -->
        <a class="mr10" href="">{{record.value}}</a>
        <a-tag>{{text}}</a-tag>
        <a-tag color="red">{{text}}</a-tag>
      </template>
    </m-details>
  </m-field>

</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { SyncOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    components: {
      SyncOutlined
    },
    data () {
      return {
        detailData: {},
        detailConfig: {
          'name.label': {
            label: '姓名',
            customRender: (val: any): any => {
              return val && val + 1111;
            },
            unit: '㊙️'

          },
          count: {
            label: '数量数量',
            unit: '个'
          },
          type: {
            label: '类型类型'
          },
          custom: {
            label: '自定义',
            row: 2
          }
        }
      };
    },
    created () {
      setTimeout(() => {
        console.log('start');
        this.detailData = {
          name: {
            label: '是否老师的螺蛳粉是否老师的螺蛳粉是否老师的螺蛳粉是否老师的螺蛳粉是否老师的螺蛳粉是否老师的螺蛳粉是否老师的螺蛳粉'

          },
          count: 100,
          type: '组合',
          custom: '自定义的值'
        };
      }, 3000);
    }
  });
</script>

<style scoped></style>
