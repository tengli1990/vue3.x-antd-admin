<template>
  <div class="right-item">
    <SettingOutlined class="right-item--icon" @click="showDrawer" />
    <a-drawer width="400" :title="title" :placement="placement" :closable="false" :visible="visible" @close="onClose">
      <ul class="text-list">
        <h3>界面功能</h3>
        <li>
          <div class="label">{{$store.getters.siderWidth}}</div>
          <div class="content">
            {{siderWidth}}
            <a-input v-model:value="siderWidth.value" placeholder="Basic usage" />
          </div>
        </li>
      </ul>
    </a-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, UnwrapRef } from 'vue';
  import { SettingOutlined } from '@ant-design/icons-vue';
  import { useStore } from 'vuex';
  export default defineComponent({
    name: 'AsSettings',
    components: {
      SettingOutlined
    },
    setup () {
      const store = useStore();
      const siderWidth: UnwrapRef<any> = reactive({
        value: store.getters.siderWidth
      });
      return {
        siderWidth
      };
    },
    data () {
      return {
        title: '项目配置',
        visible: false,
        placement: 'right'
      };
    },
    watch: {
      siderWidth: {
        handler (newVal, oldVal) {
          let ret = 150;
          if (newVal.value > 150) {
            ret = newVal.value;
          }
          console.log(newVal, oldVal);
          this.$store.dispatch('setSiderWidth', Number(ret));
        },
        deep: true
      }
    },
    methods: {
      onClose () {
        this.visible = false;
      },
      showDrawer () {
        this.visible = true;
      }
    }
  });
</script>

<style scoped></style>
