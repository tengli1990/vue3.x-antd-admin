<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    created () {
      // 初始化vuex 暂存的状态

      this.vuexStateInit();
    },
    methods: {
      vuexStateInit () {
        const language = window.localStorage.getItem('_LANGUAGE') || 'cn';
        this.$store.dispatch('setLocale', language);
      }
    }
  });
</script>

<style scoped></style>
