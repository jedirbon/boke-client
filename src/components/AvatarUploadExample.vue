<template>
  <div class="avatar-upload-example">
    <h2>头像上传组件示例</h2>
    
    <!-- 基础用法 -->
    <div class="example-section">
      <h3>基础用法</h3>
      <AvatarUpload
        v-model:url="avatarUrl"
        :action="uploadAction"
        @success="handleUploadSuccess"
        @error="handleUploadError"
      />
      <p>当前头像URL: {{ avatarUrl || '暂无' }}</p>
    </div>
    
    <!-- 带认证头 -->
    <div class="example-section">
      <h3>带认证头</h3>
      <AvatarUpload
        v-model:url="avatarUrl2"
        :action="uploadAction"
        :headers="authHeaders"
        :max-size="5"
        @success="handleUploadSuccess"
        @error="handleUploadError"
      />
    </div>
    
    <!-- 自定义大小限制 -->
    <div class="example-section">
      <h3>自定义大小限制 (1MB)</h3>
      <AvatarUpload
        v-model:url="avatarUrl3"
        :action="uploadAction"
        :max-size="1"
        @success="handleUploadSuccess"
        @error="handleUploadError"
      />
    </div>
    
    <!-- 预设头像 -->
    <div class="example-section">
      <h3>预设头像</h3>
      <AvatarUpload
        v-model:url="presetAvatarUrl"
        :action="uploadAction"
        @success="handleUploadSuccess"
        @error="handleUploadError"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import AvatarUpload from './AvatarUpload.vue'

// 头像URL
const avatarUrl = ref('')
const avatarUrl2 = ref('')
const avatarUrl3 = ref('')
const presetAvatarUrl = ref('https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png')

// 上传接口地址
const uploadAction = '/api/upload/avatar'

// 认证头
const authHeaders = {
  'Authorization': 'Bearer your-token-here'
}

// 上传成功回调
const handleUploadSuccess = (response: any) => {
  console.log('上传成功回调:', response)
  ElMessage.success('头像上传成功！')
}

// 上传失败回调
const handleUploadError = (error: any) => {
  console.error('上传失败回调:', error)
  ElMessage.error('头像上传失败！')
}
</script>

<style scoped lang="less">
.avatar-upload-example {
  padding: 20px;
  
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
  
  p {
    margin-top: 10px;
    color: #909399;
    font-size: 14px;
  }
}
</style> 