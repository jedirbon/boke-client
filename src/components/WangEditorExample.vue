<template>
  <div class="wang-editor-example">
    <h2>WangEditor 富文本编辑器示例</h2>
    
    <!-- 基础用法 -->
    <div class="example-section">
      <h3>基础用法</h3>
      <WangEditor
        v-model="content1"
        placeholder="请输入内容..."
        @change="handleChange"
        @created="handleCreated"
      />
      <div class="content-preview">
        <h4>内容预览：</h4>
        <div v-html="content1" class="preview-content"></div>
      </div>
    </div>
    <!-- 操作按钮 -->
    <div class="example-section">
      <h3>操作按钮</h3>
      <div class="button-group">
        <el-button @click="setContent">设置内容</el-button>
        <el-button @click="getContent">获取内容</el-button>
        <el-button @click="clearContent">清空内容</el-button>
        <el-button @click="getText">获取纯文本</el-button>
      </div>
      <WangEditor
        ref="editorRef"
        v-model="content4"
        placeholder="点击按钮操作内容"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import WangEditor from './WangEditor.vue'

// 编辑器内容
const content1 = ref('<p>这是基础用法示例</p>')
const content2 = ref('<p>这是只读模式的内容，无法编辑</p>')
const content3 = ref('<p>这是自定义高度的编辑器</p>')
const content4 = ref('<p>这是可以操作的内容</p>')

// 编辑器实例
const editorRef = ref()

// 内容变化回调
const handleChange = (value: string) => {
  console.log('内容变化:', value)
}

// 编辑器创建完成回调
const handleCreated = (editor: any) => {
  console.log('编辑器创建完成:', editor)
}

// 设置内容
const setContent = () => {
  content4.value = '<p>这是通过按钮设置的新内容</p><p>支持 <strong>HTML</strong> 格式</p>'
  ElMessage.success('内容已设置')
}

// 获取内容
const getContent = () => {
  console.log('当前内容:', content4.value)
  ElMessage.success('内容已输出到控制台')
}

// 清空内容
const clearContent = () => {
  content4.value = ''
  ElMessage.success('内容已清空')
}

// 获取纯文本
const getText = () => {
  if (editorRef.value?.editorRef?.value) {
    const text = editorRef.value.editorRef.value.getText()
    console.log('纯文本内容:', text)
    ElMessage.success('纯文本已输出到控制台')
  }
}
</script>

<style scoped lang="less">
.wang-editor-example {
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