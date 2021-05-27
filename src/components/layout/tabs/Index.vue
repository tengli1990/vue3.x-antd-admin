<template>
  <div>
    <div class="vab-tabs-left-panel">
      <a-tabs
        @tab-click="handleTabClick"
        @edit="handleTabRemove"
        v-model:activeKey="tabActive"
        hide-add
        type="editable-card"
      >
        <a-tab-pane
          v-for="item in visitedRoutes"
          :key="item.fullPath"
          :closable="!isAffix(item)"
          :tab="item.meta.title"
        ></a-tab-pane>
      </a-tabs>
    </div>

  </div>
</template>

<script lang="ts">
import { CustomRouteRecordRaw } from '@/types/router';
import { defineComponent } from 'vue';
  import { mapActions, mapGetters } from 'vuex';

  export default defineComponent({
    name: 'AsTab',
    data () {
      return {
        affixTabs: [],
        tabActive: null,
        created: false
      };
    },
    computed: {
      ...mapGetters({
        visitedRoutes: 'visitedRoutes',
        routes: 'routes'
      })
    },
    watch: {
      $route: {
        handler (route) {
          this.addTabs(route);
        }
      }
    },
    created () {
      this.initAffixTabs(this.routes);
      this.addTabs(this.$route);
    },
    methods: {
      ...mapActions({
        addVisitedRoute: 'addVisitedRoute',
        delVisitedRoute: 'delVisitedRoute',
        delOthersVisitedRoutes: 'delOthersVisitedRoutes',
        delLeftVisitedRoutes: 'delLeftVisitedRoutes',
        delRightVisitedRoutes: 'delRightVisitedRoutes',
        delAllVisitedRoutes: 'delAllVisitedRoutes'
      }),
      initAffixTabs (routes: CustomRouteRecordRaw[]) {
        routes.forEach((route) => {
          if (route.meta && route.meta.affix) this.addTabs(route);
          if (route.children) this.initAffixTabs(route.children);
        });
      },
      async addTabs (tag: any) {
        if (tag.name && tag.meta && tag.meta.tagHidden !== true) {
          let matched = [tag.name];
          if (tag.matched) matched = tag.matched.map((item :any) => item.name);
          await this.addVisitedRoute({
            path: tag.path,
            fullPath: tag.fullPath,
            query: tag.query,
            params: tag.params,
            name: tag.name,
            matched: matched,
            meta: { ...tag.meta }
          });
          this.tabActive = tag.fullPath;
        }
      },
      isActive (route: CustomRouteRecordRaw) {
        return route.path === this.$route.path;
      },
      isAffix (tag: any) {
        return tag.meta && tag.meta.affix;
      },
      handleTabClick (tab: any) {
        const route = this.visitedRoutes.filter((item :any) => item.path === tab)[0];
        if (this.$route.fullPath !== route.fullPath) this.$router.push(route);
      },
      async handleTabRemove (fullPath: string) {
        const view = this.visitedRoutes.find((item: CustomRouteRecordRaw) => {
          return fullPath === item.fullPath;
        });
        await this.delVisitedRoute(view);
        if (this.isActive(view)) this.toLastTag();
      },
      handleClick ({ key }: any) {
        switch (key) {
          case 'closeOthersTabs':
            this.closeOthersTabs();
            break;
          case 'closeLeftTabs':
            this.closeLeftTabs();
            break;
          case 'closeRightTabs':
            this.closeRightTabs();
            break;
          case 'closeAllTabs':
            this.closeAllTabs();
            break;
        }
      },
      async closeSelectedTag (view) {
        await this.delVisitedRoute(view);
        if (this.isActive(view)) {
          this.toLastTag();
        }
      },
      async closeOthersTabs () {
        await this.delOthersVisitedRoutes(this.toThisTag());
      },
      async closeLeftTabs () {
        await this.delLeftVisitedRoutes(this.toThisTag());
      },
      async closeRightTabs () {
        await this.delRightVisitedRoutes(this.toThisTag());
      },
      async closeAllTabs () {
        await this.delAllVisitedRoutes();
        // if (this.affixTabs.some((tag) => tag.path === this.toThisTag().path)) { return; }
        this.toLastTag();
      },
      toLastTag () {
        const latestView = this.visitedRoutes.slice(-1)[0];
        if (latestView) this.$router.push(latestView);
        else this.$router.push('/');
      },
      toThisTag () {
        // const view = this.visitedRoutes.find(
        //   (item) => item.fullPath === this.$route.fullPath
        // );
        // if (this.$route.path !== view.path) this.$router.push(view);
        // return view;
      }
    }
  });
</script>

<style scoped></style>
