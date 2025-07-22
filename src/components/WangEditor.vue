<template>
  <div class="wang-editor-container">
    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden;"
        v-model="valueHtml"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, shallowRef, onBeforeUnmount, watch, onMounted } from 'vue'
// @ts-ignore
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

interface Props {
  modelValue?: string
  placeholder?: string
  height?: number
  readonly?: boolean
}

interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'created', editor: any): void
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  placeholder: '请输入内容...',
  height: 500,
  readonly: false
})

const emit = defineEmits<Emits>()

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref(props.modelValue)

// 模拟 ajax 异步获取内容
onMounted(() => {
  setTimeout(() => {
    valueHtml.value = props.modelValue
  }, 1500)
})

const toolbarConfig = {
  excludeKeys: [
    'uploadImage',
    'uploadVideo',
    'insertTable',
    'codeBlock',
    'fullScreen'
  ]
}

const editorConfig = {
  placeholder: props.placeholder,
  readOnly: props.readonly,
  MENU_CONF: {
    uploadImage: {
      server: '/api/upload/image',
      fieldName: 'file',
      maxFileSize: 2 * 1024 * 1024, // 2M
      maxNumberOfFiles: 10,
      allowedFileTypes: ['image/*'],
      meta: {
        token: 'xxx',
        otherKey: 'yyy'
      },
      metaWithUrl: true,
      withCredentials: false,
      timeout: 5 * 1000, // 5s
      onBeforeUpload(file: File) {
        console.log('onBeforeUpload', file)
        return file
      },
      onProgress(progress: number) {
        console.log('onProgress', progress)
      },
      onSuccess(file: File, res: any) {
        console.log('onSuccess', file, res)
      },
      onFailed(file: File, res: any) {
        console.log('onFailed', file, res)
      },
      onError(file: File, err: any, res: any) {
        console.log('onError', file, err, res)
      },
      customInsert(res: any, insertFn: any) {
        console.log('customInsert', res)
        insertFn(res.data.url, res.data.alt, res.data.href)
      }
    }
  }
}

const mode = ref('default')

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
  emit('created', editor)
}

const handleChange = (editor: any) => {
  emit('change', valueHtml.value)
  emit('update:modelValue', valueHtml.value)
}

// 监听 props.modelValue 变化
watch(() => props.modelValue, (newValue) => {
  if (newValue !== valueHtml.value) {
    valueHtml.value = newValue
  }
})

// 监听 valueHtml 变化
watch(valueHtml, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<style scoped lang="less">
.wang-editor-container {
  .w-e-text-container {
    height: 400px !important;
  }
  
  .w-e-toolbar {
    border-bottom: 1px solid #ccc;
  }
  
  .w-e-text {
    padding: 10px;
  }
}

// 自定义工具栏样式
:deep(.w-e-toolbar) {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
}

:deep(.w-e-bar-item) {
  &:hover {
    background-color: #e9ecef;
  }
}

:deep(.w-e-bar-item-active) {
  background-color: #007bff;
  color: white;
}
</style> 