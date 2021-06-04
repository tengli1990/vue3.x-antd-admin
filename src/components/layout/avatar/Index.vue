<template>
  <div class="as-avatar right-item">
    <a-dropdown :trigger="['hover']">
      <span class="ant-dropdown-link">
        <a-avatar :src="avatar" />
        {{ username }}
        <DownOutlined class="right-item--icon" />
      </span>
      <template v-slot:overlay>
        <a-menu>
          <a-menu-item><AsIcon type="team" />个人信息</a-menu-item>
          <a-menu-item><AsIcon type="tags" />修改密码</a-menu-item>
          <a-menu-item @click="logout()"><AsIcon type="retweet" />退出登录</a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
  import { DownOutlined } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';

  // import { mapGetters } from 'vuex';
  export default defineComponent({
    name: 'AsAvatar',
    components: { DownOutlined },
    data () {
      return {
        avatar: require('@/assets/image/avatar.gif'),
        username: '李腾'
      };
    },
    methods: {
      async logout () {
        await this.$store.dispatch('handleLogout');
        const fullPath = this.$route.fullPath;
        this.$router.push(`/login?redirect=${fullPath}`);
      }
    }
  });
</script>
<style lang="less">

</style>
