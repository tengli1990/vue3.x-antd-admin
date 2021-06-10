<template>
  <div class="sample-markdown">
    <v-md-editor v-model="text" height="400px"></v-md-editor>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  const text = `\`\`\`mermaid
      graph LR
      A --- B
      B-->C[fa:fa-ban forbidden]
      B-->D(fa:fa-spinner 哈哈哈);
      \`\`\`
      `;
  export default defineComponent({
    data () {
      return {
        text: '# hello world \n```js \nvar a = ‘hello world’ \nconsole.log(a) // hello world \n``` \n' + text
      };
    }
  });
</script>

<style scoped></style>
