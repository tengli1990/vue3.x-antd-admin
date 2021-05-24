<template>
  <a-layout class="basic-layout">
    <a-layout-sider class="basic-layout--sider" :width="siderWidth" v-model:collapsed="collapsed" :trigger="null" collapsible>
      <AsLogo />
      <!-- menu -->
      <a-menu mode="inline" theme="dark" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys">
        <m-menu v-for="route in menus" :key="route.path" :item="route"></m-menu>
      </a-menu>
      <!-- menu end -->
    </a-layout-sider>
    <a-layout>
      <a-layout-header class="basic-layout--header">
        <div class="collapsed-btn">
          <MenuUnfoldOutlined v-if="collapsed" @click="toggleCollapsed()" />
          <MenuFoldOutlined v-else @click="toggleCollapsed()" />
        </div>
        <div class="right-box">
          <AsAvatar />
        </div>
      </a-layout-header>
      <a-layout-content class="basic-layout--content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="basic-layout--footer">Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
  import { defineComponent, toRaw } from 'vue';
  import { asyncRoutes } from '../../router/index';
  import { setFulPath } from '@/utils/routes';
  import AsLogo from './logo/Logo.vue';
  import AsAvatar from './avatar/Index.vue';
  // import { mapGetters } from 'vuex';
  import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';

  export default defineComponent({
    name: 'm-layour',
    components: {
      [AsAvatar.name]: AsAvatar,
      [AsLogo.name]: AsLogo,
      MenuFoldOutlined,
      MenuUnfoldOutlined
    },
    data () {
      const selectedKeys: string[] = [];
      const openKeys: string[] = [];
      return {
        selectedKeys: selectedKeys,
        openKeys: openKeys,
        collapsed: false,
        siderWidth: 280
      };
    },
    computed: {
      menus () {
        const routers = setFulPath(asyncRoutes);
        return routers;
      }
    },

    watch: {
      $route: {
        handler ({ path, matched }) {
          this.openKeys = [];
          matched.forEach((route: any) => {
            if (route.redirect) {
              if (route.children.length > 1) {
                this.selectedKeys = [path];
              } else {
                this.selectedKeys = [route.path];
              }
              this.openKeys.push(route.path);
            }
          });
        },
        immediate: true
      }
    },
    mounted () {
      console.log(toRaw(this.$store.getters.user));
    },
    methods: {
      toggleCollapsed () {
        this.collapsed = !this.collapsed;
      }
    }
  });
</script>

<style lang="less" scoped></style>
