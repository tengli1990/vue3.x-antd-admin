<template>
  <div>
    {{ $store.getters.localeName }}
    <editor v-if="visible" :api-key="apiKey" v-model="value" :init="init" @insertBefore="insertBefore" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import Editor from '@tinymce/tinymce-vue';
  import tinymce from 'tinymce';
  import './config';
  import 'tinymce/icons/default/icons';
  import 'tinymce/themes/silver';

  // import 'tinymce/plugins/image'; // 插入上传图片插件
  // import 'tinymce/plugins/link'; // 插入链接
  // import 'tinymce/plugins/preview'; // 插入预览

  // import 'tinymce/plugins/media'; // 插入视频插件
  // import 'tinymce/plugins/table'; // 插入表格插件
  // import 'tinymce/plugins/lists'; // 列表插件
  // import 'tinymce/plugins/contextmenu';
  // import 'tinymce/plugins/wordcount'; // 字数统计插件
  // import 'tinymce/plugins/paste'; // 粘贴
  // import 'tinymce/plugins/autolink'; // 链接
  // import 'tinymce/plugins/insertdatetime'; // 链接
  // import 'tinymce/plugins/hr'; // 分割线
  // import 'tinymce/plugins/colorpicker';
  // import 'tinymce/plugins/textcolor';

  import zhCN from './lang/zh_CN';
  tinymce.addI18n('zhCN', zhCN);
  tinymce.addI18n('enUS', {});
  export default defineComponent({
    name: 'm-tinymce-editer',
    components: {
      Editor
    },
    data () {
      return {
        apiKey: 'czp6df38tw0lnrbuoz0rodtriwatrc56cawx4mlu5wfynhcn',
        value: 'content',
        visible: true,
        language: this.$store.getters.localeName
      };
    },
    watch: {
      '$store.getters.localeName': {
        handler (newVal) {
          console.log(newVal);
        }
      }
    },
    computed: {
      init () {
        console.log(111, this.$store.getters.localeName);
        return {
          mode: 'textareas',
          theme: 'silver',
          menubar: true,
          language: this.$store.getters.localeName,
          skin_url: '/static/tinymce/skins/ui/oxide',
          branding: false,
          plugins:
            'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave',
          emoticons_database_url: '/static/tinymce/emoji.min.js',
          toolbar: `code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent |
    styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat |
    table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs`,
          height: 650, // 编辑器高度
          min_height: 400,
          /* content_css: [ //可设置编辑区内容展示的css，谨慎使用
        '/static/reset.css',
        '/static/ax.css',
        '/static/css.css',
    ], */
          fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
          font_formats:
            '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
          link_list: [
            { title: '预置链接1', value: 'http://www.tinymce.com' },
            { title: '预置链接2', value: 'http://tinymce.ax-z.cn' }
          ],
          image_list: [
            { title: '预置图片1', value: 'https://www.tiny.cloud/images/glyph-tinymce@2x.png' },
            { title: '预置图片2', value: 'https://www.baidu.com/img/bd_logo1.png' }
          ],
          image_class_list: [
            { title: 'None', value: '' },
            { title: 'Some class', value: 'class-name' }
          ],
          importcss_append: true,
          // 自定义文件选择器的回调内容
          file_picker_callback: function (callback: any, value: any, meta: any): any {
            if (meta.filetype === 'file') {
              // eslint-disable-next-line standard/no-callback-literal
              callback('https://www.baidu.com/img/bd_logo1.png', { text: 'My text' });
            }
            if (meta.filetype === 'image') {
              // eslint-disable-next-line standard/no-callback-literal
              callback('https://www.baidu.com/img/bd_logo1.png', { alt: 'My alt text' });
            }
            if (meta.filetype === 'media') {
              // eslint-disable-next-line standard/no-callback-literal
              callback('movie.mp4', { source2: 'alt.ogg', poster: 'https://www.baidu.com/img/bd_logo1.png' });
            }
          },
          toolbar_sticky: true,
          autosave_ask_before_unload: false
        };
      }
    },
    methods: {
      insertBefore () {
        console.log('insertBefore');
      }
    }
  });
</script>

<style scoped></style>
