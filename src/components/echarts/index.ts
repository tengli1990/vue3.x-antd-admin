import type { EChartsOption } from 'echarts';
import type { Ref } from 'vue';

import { tryOnUnmounted, useDebounceFn, useTimeoutFn } from '@vueuse/core';
import { unref, nextTick, computed, ref } from 'vue';

import { useEventListener } from '@/hooks/useEventListener';

import echarts from './echarts';
export function useECharts (
  elRef: Ref<HTMLDivElement>,
  theme: 'light' | 'dark' | 'default' = 'light'
) {
  let chartInstance: echarts.ECharts | null = null;

  let resizeFn: Fn = resize;
  const cacheOptions = ref<EChartsOption>({});
  let removeResizeFn: Fn = () => {};

  resizeFn = useDebounceFn(resize, 50);

  const getOptions = computed((): EChartsOption => {
    if (theme !== 'dark') {
      return cacheOptions.value;
    }
    return {
      backgroundColor: 'transparent',
      ...cacheOptions.value
    };
  });

  function initCharts (t = theme) {
    const el = unref(elRef);
    if (!el || !unref(el)) {
      return;
    }

    chartInstance = echarts.init(el, t);

    const { removeEvent } = useEventListener({
      el: window,
      name: 'resize',
      listener: resizeFn
    });
    removeResizeFn = removeEvent;

    useTimeoutFn(() => {
      resizeFn();
    }, 30);
  }

  function setOptions (options: EChartsOption, clear = true) {
    cacheOptions.value = options;

    console.log(unref(elRef)?.offsetHeight === 0);
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions));
      }, 30);
      return;
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts();
          if (!chartInstance) {
            return;
          }
        }
        clear && chartInstance?.clear();
        chartInstance.setOption(unref(getOptions));
      }, 30);
    });
  }

  function resize () {
    chartInstance?.resize();
  }

  tryOnUnmounted(() => {
    if (!chartInstance) return;
    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  });

  return {
    setOptions,
    resize,
    echarts
  };
}
