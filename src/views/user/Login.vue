<template>
  <div class="user-login login-bg">
    <section class="user-login--content">
      <div class="form">
        {{formState}}
        <a-form class="form" ref="formRef" :model="formState" :rules="rules">
          <a-form-item class="form-item" label="用户名" has-feedback name="username">
            <a-input class="input" v-model:value="formState.username" type="text" @keyup.enter="onSubmit()" placeholder="请输入用户名" autocomplete="off" allow-clear />
          </a-form-item>
          <a-form-item class="form-item" has-feedback name="password">
            <template v-slot:label>
              密
              <i class="emsp"></i>
              码
            </template>
            <a-input class="input" v-model:value="formState.password" type="password" @keyup.enter="onSubmit()" placeholder="请输入登录密码" autocomplete="off" allow-clear />
          </a-form-item>
          <!--        <a class="forget-password">忘记密码?</a>-->
          <a-button class="login-button mt-24" type="primary" block @click="onSubmit()">登录</a-button>
        </a-form>
      </div>
    </section>
    <section class="user-login--footer">
      ©2020-2021 湃方科技（天津）有限责任公司(Pi2Star Technology Ltd.) 版权所有
      <a class="record-number" target="_blank" href="https://beian.miit.gov.cn/">津ICP备19001173号-6</a>
    </section>
  </div>
</template>

<script lang="ts">
  import { message } from 'ant-design-vue';
import { defineComponent, reactive, ref, toRaw, UnwrapRef } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

  interface FormState {
    username: string;
    password: string;
  }

  export default defineComponent({
    setup () {
      const formRef = ref();
      const $route = useRoute();
      const $router = useRouter();
      const $store = useStore();

      const redirect: any = $route.query.redirect;
      const formState: UnwrapRef<FormState> = reactive({
        username: 'service_manager@pi2star.com',
        password: '123qwe'
      });

      console.log(formState);

      const rules = {
        username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      };

      const layout = {
        labelCol: { span: 4 },
        wrapperCol: { span: 19 }
      };

      const resetForm = () => {
        formRef.value.resetFields();
      };

      const onSubmit = () => {
        console.log(this);
        console.log(formRef);
        formRef.value.validate().then(() => {
          console.log('values', formState, toRaw(formState));
          $store.dispatch('handleLogin', toRaw(formState)).then(res => {
            console.log(res);
            if (res.code !== '0000') {
              message.error(res.msg);
              return;
            }

            $router.replace(redirect);
          });
        });
      };
      return {
        redirect: decodeURIComponent(redirect) || '/welcome',
        formRef,
        formState,
        rules,
        layout,
        resetForm,
        onSubmit
      };
    }
  });
</script>

<style lang="less" scoped>
  .user-login {
    height: 100%;
    display: flex;
    flex-direction: column;
    &--content {
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      .form {
        background: rgba(255, 255, 255, 0.8);
        width: 500px;
        height: 500px;
      }
    }
    &--footer {
      text-align: center;
      padding: 24px 50px;
      font-size: 12px;
      &.record-number {
        color: rgba(255, 255, 255, 0.75);
        &:hover {
          color: #fff;
        }
      }
    }
  }

  .login-bg {
    height: 100%;
    background-color: rgb(139, 173, 247);
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
