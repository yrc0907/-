<template>
  <!-- 写一个顶部导航栏，用tailwindcss -->
  <el-affix :offset="0">
    <div class="flex justify-between items-center p-4 bg-white shadow-md relative ">
      <div class="flex items-center">
        <img src="../assets/icons8-推特.gif" alt="logo" class="w-10 h-10 mr-4">
        <!-- <MorphingText :texts="texts" /> -->
        <h1 class="text-2xl font-bold">言无止境</h1>
      </div>
      <!-- 留言墙和照片墙切换 -->
      <div class="flex items-center space-x-4">
        <RippleButton @click="emitChangeWall(1)"> 留言墙</RippleButton>

        <RippleButton @click="emitChangeWall(2)"> 照片墙</RippleButton>

        <RippleButton @click="emitChangeWall(3)"> 视频墙</RippleButton>
      </div>

    <div v-if="!authStore.isLogin" class="flex items-center space-x-4">
      <!-- 登录按钮 -->
      <div>
        <InteractiveHoverButton text="登录" @click="login"/>
      </div>
    </div>

    <div v-if="authStore.isLogin" class="flex items-center space-x-4">
        <AvatarInfo/>
    </div>

    </div>
  </el-affix>

</template>

<script lang="ts" setup>
import RippleButton from './ui/RippleButton.vue';
import InteractiveHoverButton from './ui/InteractiveHoverButton.vue'
import EventBus from '../lib/event-bus';
import { useRouter } from 'vue-router';
import AvatarInfo from './AvatarInfo.vue';
import { ref } from 'vue';
import { useAuthStore } from '../store/authStore';
const router = useRouter();
const authStore = useAuthStore();
// const isLogin = localStorage.getItem('isLogin');
const isLogin = ref('');
isLogin.value = authStore.isLogin;


function login() {
  // 跳转到登录页面
  router.push('/login');
}


const emit = defineEmits(['changeWall']);

function emitChangeWall(num: number) {
  EventBus.emit('changeWall', num);
}
</script>

<style lang="">

</style>