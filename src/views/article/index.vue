<template>
    <div class="content">
        <div class="article-list">
            <div class="article-item" v-for="item in articleList" :key="item.ID">
                <div class="article-item-title">
                    <span>{{ item.title }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getArticleListApi } from '@/api/article'
const articleList = ref([])

const init = async()=> {
    const res = await getArticleListApi()
    console.log(res)
    if (res.code == 200) {
        articleList.value = res.data.data
    }
}

onMounted(()=> {
    init()
})
</script>
<style scoped lang="less">
.article-list{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
        .article-item{
        width: 100%;
        height: 100px;
        background-color: #f0f0f0;
        }
}

</style>