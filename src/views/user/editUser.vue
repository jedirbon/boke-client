<template>
    <el-dialog v-model="visible" @close="close">
        <el-form :model="formData" label-width="100px">
            <el-form-item label="昵称">
                <el-input v-model="formData.nickname" />
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="formData.email" />
            </el-form-item>
            <el-form-item label="简介">
                <el-input v-model="formData.abstract" />
            </el-form-item>
            <el-form-item label="头像">
                <AvatarUpload v-model="formData.avatar" 
                :action="uploadAction"
                @success="handleUploadSuccess"
                @error="handleUploadError" />    
            </el-form-item>
        </el-form>
        <template #footer>
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="handleSubmit">提交</el-button>
        </template>
    </el-dialog>
</template>
<script setup lang="ts">
import { uploadUserApi } from '@/api/user'
import AvatarUpload from '@/components/AvatarUpload.vue'
import type { UserInfo } from '@/store/user'
import { ref, watch } from 'vue'
const uploadAction = ref('http://localhost:8080/api/upload')
const visible = ref(false)

const props = defineProps<{
    formData:UserInfo
}>()

const handleUploadSuccess = (res: any) => {
    props.formData.avatar = res.data.url
}
const handleUploadError = (err: any) => {
    console.log(err)
}
const handleSubmit = async () => {
    const res = await uploadUserApi(props.formData)
    console.log(res)
}
const close = () => {
    visible.value = false
    modelValue.value = false
}
const modelValue = defineModel<boolean>('modelValue', { required: true })

watch(()=> modelValue.value, (newVal) => {
    visible.value = newVal
})
</script>
<style scoped lang="less">
.edit-user{
    width: 100%;
    height: 100%;
}
</style>
