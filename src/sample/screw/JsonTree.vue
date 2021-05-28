<template>
  <div class="sample-json-tree">
    <vue-json-pretty path="res"  :data="data" ></vue-json-pretty>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import VueJsonPretty from 'vue-json-pretty';
  import 'vue-json-pretty/lib/styles.css';

  export default defineComponent({
    components: { VueJsonPretty },
    setup () {
      return {
        data: {
          code: '0000',
          msg: 'xxx',
          data: { key: 'value' }

        }
      };
    },
    methods: {
      handleClick (a: any) {
        console.log(a);
      }
    }
  });
</script>

<style scoped>
.sample-json-tree{
  background:#fff;
  padding:16px;
}
</style>
