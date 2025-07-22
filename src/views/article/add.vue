<template>
    <div class="wang-editor-example">
        <el-form :model="formData" :rules="rules" ref="formRef">
            <h2>创建文章</h2>
            <div class="example-section">
                <el-form-item label="文章标题" prop="title">
                    <el-input v-model="formData.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                <div class="h-[10px]"></div>
                <WangEditor v-model="formData.content" placeholder="请输入内容..." @change="handleChange"
                    @created="handleCreated" />
            </div>
            <div class="h-[10px]"></div>
            <el-form-item label="文章标签" prop="tagList">
                <el-input-tag v-model="formData.tagList" placeholder="请输入文章标签" />
            </el-form-item>
            <el-form-item label="文章类型" prop="categoryId">
                <el-select v-model="formData.categoryId" placeholder="请选择文章类型">
                    <el-option v-for="item in cateGoryList" :label="item.title" :value="item.ID"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="文章封面" prop="cover">
                <el-upload
                    ref="uploadRef"
                    :action="uploadUrl + 'api/upload/cover'"
                    :headers="{
                        'Authorization':'Bearer ' + userStore.getToken
                    }"
                    accept="image/*"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    :show-file-list="false"
                    :limit="1"
                    :on-exceed="handleExceed"
                >
                <img v-if="formData.cover" :src="FormatUrl(formData.cover)" class="avatar" />
                <el-button v-else type="primary">点击上传</el-button>
                </el-upload>
            </el-form-item>
        </el-form>
        <div class="flex justify-end">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSubmit">确定</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { FormatUrl } from '@/utils/global'
import WangEditor from '@/components/WangEditor.vue'
import { getCategoryListApi } from '@/api/category'
import { rules } from './data'
import { useUserStore } from '@/store/user'
import { uploadUrl } from '@/utils/global'
import { ElMessage } from 'element-plus'
import { addArticleApi } from '@/api/article'
const userStore = useUserStore()


const formData = ref({
    title: "",
    content: "",
    tagList: [],
    cover: "",
    categoryId:0,
})
const  cateGoryList = ref<any[]>([
    {
        label:"",
        value:0,
    }
])

const handleAvatarSuccess = (res:any) => {
    if(res.code == 200){
        formData.value.cover = res.data.url
    }
}

const beforeAvatarUpload = (file:any) => {
    console.log(file)
}

const uploadRef = ref<any>(null)
const handleExceed = (files:any, uploadFiles:any) => {
    uploadRef.value.clearFiles()
    uploadRef.value.handleStart(uploadFiles[0])
}



const getCategoryList = async () => {
    const res:any = await getCategoryListApi({
        pageIndex:1,
        pageSize:100,
    })
    if(res.code == 200){
        cateGoryList.value = res.data
    }
}
// 内容变化回调
const handleChange = (value: string) => {
    console.log('内容变化:', value)
}

// 编辑器创建完成回调
const handleCreated = (editor: any) => {
    console.log('编辑器创建完成:', editor)
}
const formRef = ref<any>(null)
const handleSubmit = () => {
    formRef.value.validate( async (valid:any) => {
        if(valid){
            const res:any = await addArticleApi(formData.value)
            console.log(res)
            if(res.code == 200){
                ElMessage.success('创建成功')
            }
        }else{
            console.log('验证失败')
        }
    })
}

const handleCancel = () => {
    console.log('取消')
}

//获取类别
getCategoryList()
</script>

<style scoped lang="less">
:deep(.el-input__inner) {
    height: 50px !important;
    font-size: 20px !important;
}
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
.wang-editor-example {
    padding: 20px;
    height: 100vh;
    overflow-y: auto;
    h2 {
        color: #303133;
        margin-bottom: 30px;
    }
}

.example-section {
    margin-bottom: 40px;
    padding: 20px;
    border: 1px solid #e4e7ed;
    border-radius: 8px;
    background-color: #fafafa;

    h3 {
        color: #606266;
        margin-bottom: 20px;
        font-size: 16px;
    }
}

.content-preview {
    margin-top: 20px;
    padding: 15px;
    background-color: white;
    border: 1px solid #e4e7ed;
    border-radius: 4px;

    h4 {
        color: #606266;
        margin-bottom: 10px;
        font-size: 14px;
    }

    .preview-content {
        color: #303133;
        line-height: 1.6;

        p {
            margin: 5px 0;
        }
    }
}

.button-group {
    margin-bottom: 15px;

    .el-button {
        margin-right: 10px;
        margin-bottom: 10px;
    }
}
</style>