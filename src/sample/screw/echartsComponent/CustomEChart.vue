<template>
  <div ref="chartRef" :style="{ width, height }"></div>
</template>

<script lang="ts">
  import { Card } from 'ant-design-vue';
  import { defineComponent, PropType, Ref, ref, watch } from 'vue';
  import { useECharts } from '@/components/echarts';

  const OPTIONS: any = {
    legend: {},
    tooltip: {},
    dataset: {
        source: [
            ['product', '2015', '2016', '2017'],
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]
        ]
    },
    xAxis: { type: 'category' },
    yAxis: {},
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
        { type: 'bar' },
        { type: 'bar' },
        { type: 'bar' }
    ]
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
           console.log(1111);
          setOptions(OPTIONS);
        },
        { immediate: true }
      );
      return { chartRef };
    }
  });
</script>
