<template>
  <div ref="chartRef" :style="{ width, height }"></div>
</template>

<script lang="ts">
  import { Card } from 'ant-design-vue';
  import { defineComponent, PropType, Ref, ref, watch } from 'vue';
  import { useECharts } from '@/components/echarts';

  const options: any = {
    title: {
      text: '未来一周气温变化',
      subtext: '纯属虚构'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      selectedMode: 'single'
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {
          yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {}
      }
    },
    xAxis: { type: 'category' },
    yAxis: { gridIndex: 0 },
    series: [
      {
        type: 'line'
      },
      {
        type: 'line'
      },
      {
        type: 'line'
      }
    ],
    dataset: {
      source: [
        ['product', '2012', '2013', '2014'],
        ['2018-05-06', 56.5, 82.1, 88.7],
        ['2018-06-06', 51.1, 51.4, 55.1],
        ['2018-07-06', 40.1, 62.2, 69.5]
      ]
    }
  };

  export default defineComponent({
    components: { Card },
    props: {
      loading: Boolean,
      width: {
        type: String as PropType<string>,
        default: '100%'
      },
      height: {
        type: String as PropType<string>,
        default: '300px'
      }
    },
    setup (props) {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);
      watch(
        () => props.loading,
        () => {
          if (props.loading) {
            return;
          }
          setOptions(options);
        },
        { immediate: true }
      );
      return { chartRef };
    }
  });
</script>
