<template>
  <div class="layout">
    <Head />
    <div class="main-content">
      <!-- 主要内容区域 -->
      <div class="content">
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-4">
          欢迎使用应用
        </h1>
        <p class="text-center text-gray-600">
          这是一个撑满整个屏幕的布局示例
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Head from './head.vue'
</script>

<style scoped>
.layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  overflow-y: auto;
}
</style>

