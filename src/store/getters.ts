import { UserState } from './types/user.d';

export default {
  // app
  locale: (state: any): number => state.app.locale,
  // user
  user: (state: any): UserState => state.user.user,
  token: (state: any): string => state.user.token

  // token: state => state.user.token,
  // roles: state => state.user.roles,
  // user: state => state.user.user,
  // permissions: state => state.user.permissions,
  // // permission
  // addRoutes: state => state.permission.addRoutes,
  // permissionRoutes: state => state.permission.routes,
  // // customer
  // refreshState: state => state.customer.refreshState
};
