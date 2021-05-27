/**
 * @module app
 */
export interface AppLocalState {
  locale: any;
}
export interface AppState {
  app: AppLocalState
}

/**
 * @module user
 */
export interface UserInfoState {
  name: string
  mobild: number
}
export interface UserState {
  user: UserInfoState
  permissions: string[]
  token: string
}

/**
 * @module tabsBar
 */
export interface TabsBarState {
  visitedRoutes: CustomRouteRecordRaw[]
}
