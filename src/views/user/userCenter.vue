<template>
    <div class="gradient-bg"></div>
    <div class="headInfo">
        <div class="flex gap-10px">
            <div class="head-avatar">
                <img :src="FormatUrl(userInfo?.avatar) || avatar" alt="">
            </div>
            <div class="info">
                <div class=""><span class="name">{{ userInfo?.nickname }}</span> <el-link class="email">{{
                        userInfo?.email }}</el-link></div>
                <div class="flex gap-10px b-r-1">
                    <span><span class="value">75</span> 总访问量</span>
                    <span><span class="value"></span> 暂无原创</span>
                    <span><span class="value"></span> 暂无排名</span>
                    <span><span class="value">3</span> 粉丝</span>
                </div>
                <div>IP属地：中国</div>
                <div>加入博客时间：{{ dayjs(userInfo?.CreatedAt).format('YYYY-MM-DD') }}</div>
                <div>博客简介：{{ userInfo?.abstract }}</div>
            </div>
        </div>
        <div class="">
            <el-button type="primary" @click="handleEdit">
                编辑资料
            </el-button>
            <el-button type="primary" @click="toArticle">
                发布文章
            </el-button>
        </div>
    </div>
    <EditUser v-model="visible" :formData="userInfo" />
</template>
<script setup lang="ts">
import { useUserStore } from '@/store/user'
import type { UserInfo } from '@/store/user'
import { computed, ref } from 'vue';
import EditUser from './editUser.vue'
import dayjs from 'dayjs'
import avatar from '@/assets/img/default-avatar.jpg'
import { FormatUrl } from '@/utils/global'
import { useRouter } from 'vue-router'
const router = useRouter()
const userStore = useUserStore()
const userInfo = computed<UserInfo>(() => userStore.userInfo!)

const visible = ref(false)
const handleEdit = () => {
    visible.value = true
}
const toArticle = () => {
    //去创作
    router.push('/addArticle')
}
</script>
<style scoped lang="less">
.gradient-bg {
    width: 100%;
    height: 100px;
    background: linear-gradient(45deg, #ff9a9e, #fad0c4, #fbc2eb, #a6c1ee);
    background-size: 300% 300%;
    /* 扩大背景尺寸以实现渐变移动 */
    animation: gradientShift 8s ease infinite;
    /* 循环动画 */
}

/* 关键帧动画：控制背景位置变化 */
@keyframes gradientShift {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.headInfo {
    width: 80%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    gap: 20px;

    .head-avatar {
        position: relative;
        top: -20px;
        left: 0;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        border: 4px solid #fff;

        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            object-fit: cover;
        }
    }

    .info {
        .name {
            font-size: 30px;
            font-weight: 400;
        }

        .value {
            font-size: 20px;
            font-weight: 600;
        }
    }
}
</style>
