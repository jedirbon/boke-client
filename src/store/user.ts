import { defineStore } from 'pinia'

export interface UserConfModel {
    userId: number
    likeTags: string[]
    UpdateUsernameDate: string
    openCollect: string[]
    OpenFans: string[]
    OpenFollow: string[]
    homeStyleId: number
    ID: number
    CreatedAt: string
    UpdatedAt: string
    DeletedAt: string
}
export interface UserInfo {
  id: number
  username: string
  nickname: string
  abstract: string
  registerSource: string
  create: string
  email: string
  avatar?: string
  roleId: string
  UserConfModel: UserConfModel
}

export interface UserState {
  userInfo: UserInfo | null
  token: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: null,
    token: ''
  }),

  getters: {
    // 获取用户名
    username: (state) => state.userInfo?.username || '游客',
  },

  actions: {
    // 登录
    async login() {

    },

    // 登出
    logout() {
        
    },

    // 更新用户信息
    updateUserInfo(userInfo: Partial<UserInfo>) {
      if (this.userInfo) {
        this.userInfo = { ...this.userInfo, ...userInfo }
      }
    },
  },

  // 持久化配置
  persist: true
}) 