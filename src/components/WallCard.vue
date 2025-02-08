<template>
  <div class="flex flex-wrap gap-4">
  <div @click="ToDetail(content.id)" class="cursor-pointer" v-for="content in Contents" :key="content.image_url" >
    <CardContainer>
      <CardBody
        class="group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
        <CardItem :translate-z="50" class="text-xl font-bold text-neutral-600 dark:text-white">
          {{ content.title }}
        </CardItem>
        <CardItem as="p" translate-z="60" class="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300">
          {{ content.subtitle }}
        </CardItem>
        <CardItem :translate-z="100" :rotate-x="20" :rotate-z="-10" class="mt-4 w-full">

          <img :src="`${publicPath}${content.image_url || '/uploads/aa.jpg'}`" height="1000" width="1000"
            class="h-60 w-full rounded-xl object-cover group-hover/card:shadow-xl" alt="thumbnail" />
        </CardItem>
        <div class="mt-20 flex items-center justify-between">
          <CardItem :translate-z="20" :translate-x="-40" as="a" href="https://rahulv.dev" target="__blank"
            class="rounded-xl px-4 py-2 text-xs font-normal dark:text-white">
            {{ content.created_at }}
          </CardItem>
          <CardItem :translate-z="20" :translate-x="40" as="button"
            class="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black">
            Get Started
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  </div>
</div>
</template>

<script lang="ts" setup>
import { onMounted, ref, type Ref } from 'vue';
import CardBody from './ui/CardBody.vue';
import CardContainer from './ui/CardContainer.vue';
import CardItem from './ui/CardItem.vue';
import axios from 'axios';

import { useRouter } from 'vue-router';

interface Content {
  id: number;
  content_id: number;
  created_at: string;
  subtitle: string;
  title: string;
  text_content: string;
  image_url: string;
  user_id: number;
  // 添加其他可能的属性
}
const router = useRouter()

const imageUrl = ref('')
const Contents: Ref<Content[]> = ref([])  // 明确 Contents 是 Content 类型的数组
const publicPath = 'http://localhost:4000'
// 当页面渲染的时候，发送请求获取图片数据
onMounted(() => {
  getContents()
})

const getContents = async () => {
  const { data } = await axios.get('http://localhost:4000/getContents')
  // console.log(data[0].image_url);
  Contents.value = data as Content[];  // 确保 data 被类型断言为 Content[]
  if (Contents.value.length <= 0) {
    return
  }

  console.log(Contents.value);
  // imageUrl.value = data[0].image_url; 
}


const ToDetail = (id: number) => {
  router.push(`/Detail/${id}`)  
  console.log('detail');
}
</script>
