import { getUserInfo, login, logout } from '@/apis/user';
import { LoginParameters } from '@/types/login';
import { ResponseData } from '@/types/request';
import { removeToken, removeUser, setToken, setUser } from '@/utils/token';
import { Commit, Store } from 'vuex';
import { UserInfoState, UserState } from '../types/user';

const user = {
  state: {
    user: null,
    permissions: null,
    token: ''
  },
  mutations: {
    // 将 token 信息存入 cookie
    SET_TOKEN: (state: UserState, token: string): void => {
      state.token = token;
      setToken(token);
    },
    // 将用户信息存入 localStorage
    SET_USER: (state: UserState, user: UserInfoState): void => {
      state.user = user;
      setUser(user);
    },
    // 设置用户权限
    SET_PERMISSIONS: (state: UserState, permissions: string[]): void => {
      state.permissions = permissions;
    }
  },
  actions: {
    handleLogin (store: Store<any>, paramter : LoginParameters): Promise<any> {
      const commit: Commit = store.commit;
      return new Promise((resolve, reject) => {
        login(paramter).then((res: ResponseData) => {
          if (res.code !== '0000') {
            // message.error(res.msg)
            resolve(res);
            return;
          }
          const { token } = res.data;
          // 设置 token
          commit('SET_TOKEN', token);

          resolve(res);
        }).catch(err => {
          reject(err);
        });
      });
    },
    // 退出登录
    handleLogout (store: Store<any>): Promise<any> {
      const commit: Commit = store.commit;
      return new Promise((resolve, reject) => {
        logout().then(() => {
          // 清除 Cookie 中的 token
          removeToken();
          removeUser();
          commit('SET_USER', null);
          // 跳转sso
          // redirectToSSOPage()
          // window.location.reload()
          resolve(null);
        }).catch(err => {
          reject(err);
        });
      });
    },
    // 获取用户信息
    getUserInfo (store: Store<any>): Promise<any> {
      const commit: Commit = store.commit;
      return new Promise((resolve, reject) => {
        getUserInfo().then((res: ResponseData) => {
          const data = res.data;
          // 操作用户信息
          commit('SET_USER', data);
          // if (store.getters.waterMark) { // 判断是否开启水印
          //   buildWaterMark({ content: data.name + ' ' + data.userId }) // 水印内容为name + userId，可根据需要进行修改
          // }
          const defaultPermissions: string[] = [];
          const rolePermissionsList = data.resources.concat(defaultPermissions);
          window.localStorage.setItem('ROLE_PERMISSIONS_LIST', JSON.stringify(rolePermissionsList));
          // 操作用户信息
          commit('SET_PERMISSIONS', rolePermissionsList);
          resolve(data);
        }).catch(err => {
          reject(err);
        });
      });
    }
  }
};

export default user;
