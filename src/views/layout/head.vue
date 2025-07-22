<template>
    <div class="head">
        <div class="menu-list">
            <div v-for="item in menuList" class="menu-item" @click="handleMenuClick(item)"
                :class="{ 'active-menu': activeMenu === item.name }">{{ item.name }}</div>
        </div>
        <div class="user-info">
            <el-icon>
                <Message />
            </el-icon>
            <el-dropdown placement="bottom" teleported>
                <el-avatar :size="40" :src="userStore.userInfo?.avatar" />
                <template #dropdown>
                    <el-dropdown-menu @click="handleDropdownClick('userCenter')">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                    </el-dropdown-menu>
                    <el-dropdown-menu @click="handleDropdownClick('logout')">
                        <el-dropdown-item>退出</el-dropdown-item>
                    </el-dropdown-menu>
                    <el-dropdown-menu @click="handleDropdownClick('login')">
                        <el-dropdown-item>登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <span class="username">{{ userStore.username }}</span>
        </div>
    </div>
    <Login v-model="loginVisible" />
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useUserStore } from '@/store/modules';
import { useRouter } from 'vue-router';
import Login from '@/views/login/login.vue'
const router = useRouter()

const userStore = useUserStore();

const menuList = ref([
    {
        name: '首页',
        path: '/home',
        icon: 'HomeFilled'
    },
    {
        name: '订阅',
        path: '/subscribe',
        icon: 'Subscription'
    },
    {
        name: '收藏',
        path: '/collect',
        icon: 'forck'
    }
])

const activeMenu = ref("首页")
const handleMenuClick = (item: any) => {
    activeMenu.value = item.name
    router.push(item.path)
}
const loginVisible = ref(false)
const handleDropdownClick = (type: string) => {
    if (type === 'userCenter') {
        router.push('/userCenter')
    } else if (type === 'logout') {
        router.push('/login')
    } else if (type === 'login') {
        loginVisible.value = true
    }
}
</script>

<style scoped lang="less">
.head {
    background-color: #303030;
    border-bottom: 1px solid #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    height: 60px;
    flex-shrink: 0;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

    .menu-list {
        display: flex;
        align-items: center;
        gap: 20px;

        .menu-item {
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
            color: #ffffff;
            background-color: #303030;
            padding: 10px 20px;
            border-radius: 10px;
        }

        .active-menu {
            color: #404040;
            background-color: #e2fa08;
            padding: 10px 20px;
            border-radius: 10px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 500;
        }
    }
}

.logo {
    display: flex;
    align-items: center;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.username {
    font-size: 14px;
    color: #ffffff;
    font-weight: 500;
}
</style>
