<template>
  <div class="sample-markdown">
   <v-md-editor v-model="text" height="400px"></v-md-editor>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    data () {
      return {
        text: '# hello world \n```js \nvar a = ‘hello world’ \nconsole.log(a) // hello world \n```'
      };
    }
  });
</script>

<style scoped></style>
