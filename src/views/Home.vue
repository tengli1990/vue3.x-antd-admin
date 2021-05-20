<template>
  <div class="home">
   页头
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Aboute from './About.vue';

export default defineComponent({
  name: 'Home',
  components: {
    Aboute
  }
});
</script>

<style lang="less">
.home{
  // background-color:red;
  width:100%;
  height:50%;
}
</style>
