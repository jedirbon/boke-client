# AvatarUpload 头像上传组件

## 功能特性

- ✅ 支持传入 `url` 显示现有头像
- ✅ 支持传入 `action` 指定上传接口
- ✅ 鼠标悬停显示上传遮罩层
- ✅ 文件类型和大小验证
- ✅ 支持自定义请求头
- ✅ 响应式设计
- ✅ TypeScript 支持

## 组件参数

### Props

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `url` | `string` | `''` | 头像URL，支持v-model |
| `action` | `string` | - | 上传接口地址（必填） |
| `headers` | `Record<string, string>` | `{}` | 请求头，用于认证等 |
| `maxSize` | `number` | `2` | 文件大小限制，单位MB |
| `acceptTypes` | `string[]` | `['image/jpeg', 'image/png', 'image/gif', 'image/webp']` | 接受的文件类型 |

### Events

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `update:url` | `(value: string)` | 头像URL更新时触发 |
| `success` | `(response: any)` | 上传成功时触发 |
| `error` | `(error: any)` | 上传失败时触发 |

## 使用方法

### 基础用法

```vue
<template>
  <AvatarUpload
    v-model:url="avatarUrl"
    :action="uploadAction"
    @success="handleSuccess"
    @error="handleError"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AvatarUpload from '@/components/AvatarUpload.vue'

const avatarUrl = ref('')
const uploadAction = '/api/upload/avatar'

const handleSuccess = (response: any) => {
  console.log('上传成功:', response)
}

const handleError = (error: any) => {
  console.error('上传失败:', error)
}
</script>
```

### 带认证头

```vue
<template>
  <AvatarUpload
    v-model:url="avatarUrl"
    :action="uploadAction"
    :headers="authHeaders"
    :max-size="5"
  />
</template>

<script setup lang="ts">
const authHeaders = {
  'Authorization': 'Bearer your-token-here'
}
</script>
```

### 预设头像

```vue
<template>
  <AvatarUpload
    v-model:url="avatarUrl"
    :action="uploadAction"
  />
</template>

<script setup lang="ts">
const avatarUrl = ref('https://example.com/avatar.jpg')
</script>
```

## 后端接口要求

### 请求格式
- 方法：POST
- 内容类型：multipart/form-data
- 文件字段名：file

### 响应格式

支持多种响应格式：

```javascript
// 格式1：标准格式
{
  "code": 200,
  "data": {
    "url": "https://example.com/avatar.jpg"
  },
  "message": "上传成功"
}

// 格式2：简单格式
{
  "url": "https://example.com/avatar.jpg"
}

// 格式3：直接返回URL字符串
"https://example.com/avatar.jpg"
```

## 样式定制

### 修改头像大小

```less
.avatar-container {
  width: 120px;  // 修改宽度
  height: 120px; // 修改高度
}
```

### 修改遮罩层样式

```less
.upload-mask {
  background-color: rgba(0, 0, 0, 0.7); // 修改遮罩颜色
  opacity: 0.8; // 修改透明度
}
```

### 修改占位图标

```vue
<template>
  <div class="avatar-placeholder">
    <el-icon class="avatar-icon">
      <!-- 替换为其他图标 -->
      <Avatar />
    </el-icon>
  </div>
</template>
```

## 注意事项

1. **文件大小限制**：默认限制2MB，可根据需要调整
2. **文件类型**：默认只接受图片文件
3. **响应式**：移动端会自动调整大小
4. **错误处理**：会自动显示错误提示
5. **加载状态**：上传时会显示加载状态

## 完整示例

```vue
<template>
  <div class="user-profile">
    <h2>用户资料</h2>
    
    <div class="avatar-section">
      <AvatarUpload
        v-model:url="userInfo.avatar"
        :action="uploadAction"
        :headers="authHeaders"
        :max-size="3"
        @success="handleAvatarSuccess"
        @error="handleAvatarError"
      />
      
      <div class="user-info">
        <p>用户名：{{ userInfo.username }}</p>
        <p>头像URL：{{ userInfo.avatar || '暂无' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import AvatarUpload from '@/components/AvatarUpload.vue'

const userInfo = ref({
  username: '张三',
  avatar: ''
})

const uploadAction = '/api/upload/avatar'
const authHeaders = {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}

const handleAvatarSuccess = (response: any) => {
  ElMessage.success('头像更新成功！')
  // 可以在这里调用API更新用户信息
}

const handleAvatarError = (error: any) => {
  ElMessage.error('头像上传失败，请重试！')
}
</script>

<style scoped lang="less">
.user-profile {
  padding: 20px;
}

.avatar-section {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.user-info {
  p {
    margin: 5px 0;
    color: #606266;
  }
}
</style>
```

## 常见问题

### Q: 如何修改头像大小？
A: 在样式中修改 `.avatar-container` 的 `width` 和 `height` 属性。

### Q: 如何自定义上传前的验证？
A: 可以在组件内部修改 `beforeUpload` 方法，或通过 props 传入自定义验证函数。

### Q: 如何支持拖拽上传？
A: 可以在 `el-upload` 上添加 `drag` 属性。

### Q: 如何显示上传进度？
A: 可以使用 `el-upload` 的 `on-progress` 事件来显示进度条。 