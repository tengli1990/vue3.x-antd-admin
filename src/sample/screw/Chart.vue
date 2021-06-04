<template>
  <div>
    <a-row :gutter="16">
      <a-col :span="8">
        <a-card :loading="loading" title="饼图">
          <!-- <SalesProductPie :loading="loading" /> -->
          <m-echarts ref="pieECharts" :options="pieEChartsOptions"></m-echarts>
        </a-card>
      </a-col>
      <!-- <a-col :span="8">
        <a-card :loading="loading" title="饼图">
          <SalesProductLine :loading="loading" />
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card :loading="loading" title="饼图">
          <SalesProductPie :loading="loading" />
        </a-card>
      </a-col> -->
    </a-row>
    <!-- <a-row class="mt16" :gutter="16">
      <a-col :span="24">
        <a-card :loading="loading" title="折线图">
          <SalesProductLine :loading="loading" />
        </a-card>
      </a-col>
    </a-row>

    <a-row class="mt16" :gutter="16">
      <a-col :span="24">
        <a-card :loading="loading" title="自定义">
          <CustomEChart :loading="loading" />
        </a-card>
      </a-col>
    </a-row> -->
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, reactive, ref, toRaw } from 'vue';
  import SalesProductPie from './echartsComponent/SalesProductPie.vue';
  import SalesProductLine from './echartsComponent/SalesProductLine.vue';
  import CustomEChart from './echartsComponent/CustomEChart.vue';
  import pieOptions from './echarts/pieOptions';

  export default defineComponent({
    components: { SalesProductPie, SalesProductLine, CustomEChart },
    setup () {
      const loading = ref(false);
      const pieECharts: any = ref();

      const pieEChartsOptions: any = toRaw(pieOptions);
      setTimeout(() => {
        setTimeout(() => {
          pieEChartsOptions.title = {
            text: '异步加载标题'
          };
          pieEChartsOptions.title = {
            text: '异步加载标题1'
          };
          // pieEChartsOptions.series[0].data = [];
           const { setOptions } = pieECharts.value.useInstance();
           console.log(pieOptions);
          setOptions(pieOptions);
        }, 2000);

        loading.value = false;
        nextTick(() => {
          // const { setOptions } = pieECharts.value.useInstance();
          // setOptions(
          //   {
          //     title: {
          //       text: 2222
          //     }
          //   }
          // );
          // console.log('pieOptions', pieOptions);
          // pieEChartsOptions.title = {};
          //  pieEChartsOptions.series = [];
        });
      }, 1500);
      return {
        pieEChartsOptions,
        loading,
        pieECharts
      };
    }
  });
</script>

<style scoped></style>
