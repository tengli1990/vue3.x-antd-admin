<template>
  <div>
    <MTinymceEditer v-model="content"></MTinymceEditer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MTinymceEditer from '@/components/tinymce/Index.vue';
export default defineComponent({
  components: { MTinymceEditer },
  setup () {
    return {
      content: '<h3>爽肤水地方</h3>'
    };
  }
});
</script>

<style scoped>

</style>
