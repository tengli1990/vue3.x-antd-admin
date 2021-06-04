<template>
  <div ref="chartRef" :style="{ width, height }"></div>
</template>

<script lang="ts">
  import { defineComponent, PropType, Ref, ref, watch } from 'vue';
  import { useECharts } from './index';

  export default defineComponent({
    name: 'm-echarts',
    props: {
      width: {
        type: String as PropType<string>,
        default: '100%'
      },
      height: {
        type: String as PropType<string>,
        default: '300px'
      },
      options: {}
    },
    setup (props: any) {
      const chartRef = ref<HTMLDivElement | null>(null);
      const { setOptions, echarts, resize } = useECharts(chartRef as Ref<HTMLDivElement>);

      const useInstance = () => {
        return {
          echarts,
          setOptions,
          resize
        };
      };

      watch(
        () => props.options,
        () => {
          setOptions(props.options, false);
        },
        { deep: true }
      );

      setOptions(props.options);
      return {
        chartRef,
        useInstance,
        ...props
      };
    }
  });
</script>

<style scoped></style>
