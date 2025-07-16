<template>
    <el-dialog v-model="dialogVisible" title="登录" width="30%" @close="close">
        <el-form v-show="registerVisible" :model="form" :rules="registerRules" ref="registerRef" label-width="100px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password" />
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="form.nickname" type="text" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
                <el-input v-model="form.email" type="email" />
            </el-form-item>
        </el-form>
        <el-form v-show="!registerVisible" :model="form" :rules="loginRules" ref="formRef" label-width="100px">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" type="password" />
            </el-form-item>
        </el-form>
        <template #footer>
            <div v-if="!registerVisible">
                <el-link type="primary" @click="switchToRegister">没有账号?去注册</el-link>
            </div>
            <div v-else>
                <el-link type="primary" @click="switchToLogin">已有账号?去登录</el-link>
            </div>
            <br>
            <el-button v-if="registerVisible" type="success" @click="register">注册</el-button>
            <el-button v-else type="primary" @click="login">登录</el-button>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { rules } from './data'
import { ref, watch } from 'vue'
import { encryptPassword } from '@/utils/global'
import { loginApi, registerApi } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'

const userStroe = useUserStore()
const props = defineProps<{
    modelValue: boolean
}>()

const dialogVisible = ref(false)
const emit = defineEmits(['close', 'update:modelValue'])
const registerVisible = ref(false)

const form = ref({
    username: '',
    password: '',
    nickname: '',
    email: ''
})

const formRef = ref()
const registerRef = ref()

// 登录表单验证规则（只需要用户名和密码）
const loginRules = {
    username: rules.username,
    password: rules.password
}

// 注册表单验证规则（需要所有字段）
const registerRules = {
    username: rules.username,
    password: rules.password,
    nickname: rules.nickname,
    email: rules.email
}

// 切换到注册
const switchToRegister = () => {
    registerVisible.value = true
    // 清除表单验证状态
    if (formRef.value) {
        formRef.value.clearValidate()
    }
}

// 切换到登录
const switchToLogin = () => {
    registerVisible.value = false
    // 清除表单验证状态
    if (registerRef.value) {
        registerRef.value.clearValidate()
    }
}
const router = useRouter()
const login = async () => {
    if (formRef.value) {
        formRef.value.validate(async (valid: any) => {
            if (valid) {
                try {
                    form.value.password = await encryptPassword(form.value.password)
                    const res: any = await loginApi({
                        username: form.value.username,
                        password: form.value.password
                    })
                    if (res.code === 200) {
                        console.log(res.data)
                        userStroe.saveToken(res.data.token)
                        userStroe.saveUserInfo(res.data.userInfo)
                        ElMessage.success('登录成功')
                        close()
                        router.push('/userCenter')
                    } else {
                        ElMessage.error(res.message || '登录失败')
                    }
                } catch (error) {
                    console.error('登录错误:', error)
                    ElMessage.error('登录失败')
                }
            }
        })
    }
}

const register = async () => {
    if (registerRef.value) {
        registerRef.value.validate(async (valid: any) => {
            if (valid) {
                try {
                    form.value.password = await encryptPassword(form.value.password)
                    const res: any = await registerApi({
                        username: form.value.username,
                        password: form.value.password,
                        nickname: form.value.nickname,
                        email: form.value.email
                    })
                    if (res.code === 200) {
                        ElMessage.success('注册成功')
                        registerVisible.value = false
                        // 清空表单
                        form.value = {
                            username: '',
                            password: '',
                            nickname: '',
                            email: ''
                        }
                    } else {
                        ElMessage.error(res.message || '注册失败')
                    }
                } catch (error) {
                    console.error('注册错误:', error)
                    ElMessage.error('注册失败')
                }
            }
        })
    }
}

const close = () => {
    dialogVisible.value = false
    form.value = {
        username: '',
        password: '',
        nickname: '',
        email: ''
    }
    registerVisible.value = false
    emit('close')
    emit('update:modelValue', false)
}

watch(
    () => props.modelValue,
    (val) => {
        if (val) {
            dialogVisible.value = true
        }
    }
)
</script>

<style scoped lang="less"></style>
