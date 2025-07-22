import { getUserDetailsApi } from '@/api/user'
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
  avatar: string
  roleId: string
  CreatedAt: string
}
export interface ResponseData {
  code: number
  data: any
  message: string
}

export interface UserState {
  userInfo: UserInfo
  token: string
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    userInfo: {
      id: 0,
      username: '',
      nickname: '',
      abstract: '',
      registerSource: '',
      create: '',
      email: '',
      avatar: '',
      roleId: '',
      CreatedAt: ''
    },
    token: ''
  }),

  getters: {
    // 获取用户名
    username: (state) => state.userInfo?.username || '游客',
    //获取token
    getToken:(state) => state.token
  },

  actions: {
    //get Details
    async getUserDetails(){
      const res:any = await getUserDetailsApi()
      if(res.code === 200){
        this.userInfo = res.data
        this.saveUserInfo(res.data)
      }
    },
    //save token
    saveToken(token: string) {
      this.token = token
    },
    // 更新用户信息
    saveUserInfo(userInfo: Partial<UserInfo>) {
        this.userInfo = userInfo as UserInfo
    },
  },

  // 持久化配置
  persist: true
}) 