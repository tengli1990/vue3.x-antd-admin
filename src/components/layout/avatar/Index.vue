<template>
  <div class="as-avatar">
    <a-dropdown :trigger="['click']">
      <span class="ant-dropdown-link">
        <a-avatar :src="avatar" />
        {{ username }}
        <DownOutlined />
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

  // import { mapGetters } from 'vuex';
  export default {
    name: 'AsAvatar',
    components: { DownOutlined },
    data (): any {
      return {
        avatar: require('@/assets/image/avatar.gif'),
        username: '李腾'
      };
    },
    computed: {
      // ...mapGetters({
      //   avatar: 'user/avatar',
      //   username: 'user/username'
      // })
    },
    methods: {
      logout (): void {
        // await this.$store.dispatch('user/logout');
        const fullPath = this.$route.fullPath;
        this.$router.push(`/login?redirect=${fullPath}`);
      }
    }
  };
</script>
<style lang="less">
  .as-avatar {
    float: right;
    .ant-dropdown-link {
      display: block;
      min-height: 64px;
      cursor: pointer;
    }
  }
</style>
