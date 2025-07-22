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
                :url="formData.avatar"
                :action="uploadAction"
                :auto-upload="false"
                :limit="1"
                @change="handleChange"
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
import { ObjToFormData } from '@/utils/global'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
import { useUserStore } from '@/store/user'
const userStore = useUserStore()
const uploadAction = ref('http://localhost:8080/api/upload')
const visible = ref(false)

const props = defineProps<{
    formData:any
}>()

const handleChange = (file:File) => {
    props.formData.file = file
}
const handleUploadError = (err: any) => {
    console.log(err)
}
const handleSubmit = async () => {
    const form = ObjToFormData(props.formData)
    form.forEach((value:any, key:any) => {
        console.log(value, key)
    })
    const res:any = await uploadUserApi(form)
    console.log(res)
    if(res.code === 200){
        ElMessage.success('修改成功')
        visible.value = false
        modelValue.value = false
        userStore.saveUserInfo(res.data)
    }
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
