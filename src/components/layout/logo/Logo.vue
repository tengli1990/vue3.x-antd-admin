<template>
  <div class="layout-logo">
    <img :src="logo" alt="">
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'as-logo',
  setup () {
    return {
      logo: require('@/assets/logo.png')
    };
  }
});
</script>

<style  scoped>
.layout-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 33px;
  margin: 16px 5px;
  overflow: hidden;
  overflow: hidden;
  font-size: 15px;
  color: #fff;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
