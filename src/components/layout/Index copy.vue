<template>
  <a-layout class="ant-layout-basic">
    <a-layout-sider>
      <!-- menu -->
      <a-menu v-if="showMenu" mode="inline" theme="dark" v-model:selectedKeys="selectedKeys" v-model:openKeys="openKeys">
        <m-menu v-for="route in menus" :key="route.path"  :item="route"></m-menu>
      </a-menu>
      <!-- menu end -->
    </a-layout-sider>
    <a-layout>
      <a-layout-header>

      </a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-footer>Footer</a-layout-footer>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
  import { defineComponent, toRaw } from 'vue';
  import { asyncRoutes } from '../../router/index';
 import { filterRoutes } from '@/utils/routes';
 import AsLogo from './logo/Logo.vue';
  // import { mapGetters } from 'vuex';

  export default defineComponent({
    name: 'm-layour',
    components: {
      [AsLogo.name]: AsLogo
    },
    data () {
      const selectedKeys:string[] = [];
      const openKeys: string[] = [];
      return {
        selectedKeys: selectedKeys,
        openKeys: openKeys,
        showMenu: false
      };
    },
    computed: {
      menus () {
        const routers = filterRoutes(asyncRoutes);
        return routers;
      }
    },

    watch: {
      $route: {
        handler ({ path, matched }) {
           console.log(matched[0]);
          matched[0].children.length > 1
            ? (this.selectedKeys = [path])
            : (this.selectedKeys = [matched[0].path]);
          this.openKeys = [matched[0].path];
        },
        immediate: true
      }
    },
    mounted () {
      setTimeout(() => {
        this.showMenu = true;
      });
      console.log(toRaw(this.$store.getters.user));
      // console.log(this.locale);
    }
  });
</script>

<style scoped></style>
