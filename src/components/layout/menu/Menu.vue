<template>
  <component
    :is="menuComponent"
    v-if="!item.hidden"
    :item="item"
    :route-children="routeChildren"
    @titleClick="subMenuClick"
  >
    <template v-if="item.children && item.children.length">
      <m-menu
        v-for="route in item.children"
        :key="route.path"
        :item="route"
      ></m-menu>
    </template>
  </component>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import MenuItem from './Item.vue';
  import SubMenu from './Sub.vue';
  export default defineComponent({
    name: 'm-menu',
    components: {
      [MenuItem.name]: MenuItem,
      [SubMenu.name]: SubMenu
    },
    props: {
      item: {
        type: Object,
        required: true
      },
      level: {
        type: Number,
        default: 0
      }
    },
    setup () {
      return {
        routeChildren: {},
        menuComponent: ''
      };
    },
    created () {
      const showChildren = this.handleChildren(this.item.children);
      if (showChildren.length === 0) {
        this.menuComponent = MenuItem.name;
        this.routeChildren = this.item;
      } else if (showChildren.length === 1 && this.item.alwaysShow !== true) {
        this.menuComponent = MenuItem.name;
        this.routeChildren = showChildren[0];
      } else {
        this.menuComponent = SubMenu.name;
      }
    },
    computed: {},
    methods: {
      handleChildren (children = []) {
        if (children === null) return [];
        return children.filter((item: any) => item.hidden !== true);
      },
      subMenuClick () {
        if (this.level === 1) {
          this.$emit('clearOpenKeys');
        }
      }
    }
  });
</script>

<style scoped></style>
