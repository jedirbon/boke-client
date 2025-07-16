<template>
  <div class="avatar-upload">
    <el-upload
      :action="action"
      :show-file-list="false"
      :before-upload="beforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :headers="headers"
      accept="image/*"
      class="avatar-uploader"
    >
      <div class="avatar-container" :class="{ 'has-avatar': avatarUrl }">
        <!-- 显示头像 -->
        <img 
          v-if="avatarUrl" 
          :src="avatarUrl" 
          class="avatar-image"
          alt="头像"
        />
        
        <!-- 默认头像占位 -->
        <div v-else class="avatar-placeholder">
          <el-icon class="avatar-icon">
            <User />
          </el-icon>
        </div>
        
        <!-- 上传遮罩层 -->
        <div class="upload-mask">
          <el-icon class="upload-icon">
            <Plus />
          </el-icon>
          <span class="upload-text">更换头像</span>
        </div>
      </div>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Plus } from '@element-plus/icons-vue'

interface Props {
  url?: string
  action: string
  headers?: Record<string, string>
  maxSize?: number // 文件大小限制，单位MB
  acceptTypes?: string[] // 接受的文件类型
}

interface Emits {
  (e: 'update:url', value: string): void
  (e: 'success', response: any): void
  (e: 'error', error: any): void
}

const props = withDefaults(defineProps<Props>(), {
  url: '',
  maxSize: 2, // 默认2MB
  acceptTypes: () => ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  headers: () => ({})
})

const emit = defineEmits<Emits>()

// 头像URL
const avatarUrl = ref(props.url)

// 监听url变化
watch(() => props.url, (newUrl) => {
  avatarUrl.value = newUrl
})

// 上传前验证
const beforeUpload = (file: File) => {
  // 检查文件类型
  if (!props.acceptTypes.includes(file.type)) {
    ElMessage.error('只能上传图片文件！')
    return false
  }
  
  // 检查文件大小
  const isLtMaxSize = file.size / 1024 / 1024 < props.maxSize
  if (!isLtMaxSize) {
    ElMessage.error(`文件大小不能超过 ${props.maxSize}MB！`)
    return false
  }
  
  return true
}

// 上传成功回调
const handleSuccess = (response: any, file: File) => {
  console.log('上传成功:', response)
  
  // 根据后端返回格式处理
  let imageUrl = ''
  if (response.code === 200) {
    // 如果后端返回标准格式 { code: 200, data: { url: 'xxx' } }
    imageUrl = response.data?.url || response.data
  } else if (response.url) {
    // 如果直接返回 { url: 'xxx' }
    imageUrl = response.url
  } else {
    // 如果返回的是图片URL字符串
    imageUrl = response
  }
  
  if (imageUrl) {
    avatarUrl.value = imageUrl
    emit('update:url', imageUrl)
    emit('success', response)
    ElMessage.success('头像上传成功！')
  } else {
    ElMessage.error('上传成功但未获取到图片地址')
  }
}

// 上传失败回调
const handleError = (error: any, file: File) => {
  console.error('上传失败:', error)
  emit('error', error)
  ElMessage.error('头像上传失败，请重试！')
}
</script>

<style scoped lang="less">
.avatar-upload {
  display: inline-block;
}

.avatar-uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 50%;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s;
    
    &:hover {
      border-color: #409eff;
    }
  }
}

.avatar-container {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  background-color: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &.has-avatar {
    .upload-mask {
      opacity: 0;
    }
    
    &:hover .upload-mask {
      opacity: 1;
    }
  }
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
}

.avatar-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  
  .avatar-icon {
    font-size: 40px;
    color: #c0c4cc;
  }
}

.upload-mask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  border-radius: 50%;
  
  .upload-icon {
    font-size: 20px;
    color: white;
    margin-bottom: 4px;
  }
  
  .upload-text {
    font-size: 12px;
    color: white;
    text-align: center;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .avatar-container {
    width: 80px;
    height: 80px;
  }
  
  .avatar-placeholder .avatar-icon {
    font-size: 32px;
  }
  
  .upload-mask .upload-icon {
    font-size: 16px;
  }
  
  .upload-mask .upload-text {
    font-size: 10px;
  }
}
</style> 