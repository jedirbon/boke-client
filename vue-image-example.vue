<template>
  <div class="image-example">
    <!-- 方式1：使用import导入的图片 -->
    <img :src="logoImage" alt="Logo" class="logo" />
    
    <!-- 方式2：使用动态导入 -->
    <img :src="dynamicImage" alt="Dynamic" class="dynamic" />
    
    <!-- 方式3：使用public文件夹（不推荐） -->
    <img src="/images/logo.png" alt="Public Logo" class="public-logo" />
    
    <!-- 方式4：使用URL构造函数 -->
    <img :src="getImageUrl('logo.png')" alt="URL Logo" class="url-logo" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// 方式1：静态导入（推荐）
import logoImage from '@/assets/images/logo.png'
import bannerImage from '@/assets/images/banner.jpg'

// 方式2：动态导入
const dynamicImage = ref('')

onMounted(async () => {
  // 动态导入图片
  const imageModule = await import('@/assets/images/dynamic.png')
  dynamicImage.value = imageModule.default
})

// 方式3：使用URL构造函数
const getImageUrl = (name: string) => {
  return new URL(`../assets/images/${name}`, import.meta.url).href
}

// 方式4：使用Vite的glob导入（批量导入）
const images = import.meta.glob('@/assets/images/*.(png|jpg|jpeg|gif|svg)', { eager: true })
console.log('Available images:', Object.keys(images))
</script>

<style scoped>
.image-example {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.logo, .dynamic, .public-logo, .url-logo {
  max-width: 200px;
  height: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
}
</style> 