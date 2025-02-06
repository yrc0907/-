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
    </div>

    <v-if isLogin>
      <div class="flex items-center space-x-4 ">

        <!-- 登录按钮 -->
      <div>
      <InteractiveHoverButton text="登录" @click="login"/>
      </div>

      <!-- 注册按钮 -->
      <div>
      <InteractiveHoverButton text="注册" @click="register"/>
      </div>
      
    </div>
    </v-if>
    
  </div>
  </el-affix>

</template>

<script lang="ts" setup>
import RippleButton from './ui/RippleButton.vue';
import InteractiveHoverButton from './ui/InteractiveHoverButton.vue'
import EventBus from '../lib/event-bus';

function login() {
  console.log("login");
}

function register() {
  console.log("register");
}

const emit = defineEmits(['changeWall']);

function emitChangeWall(num: number) {
  EventBus.emit('changeWall', num);
}
</script>

<style lang="">

</style>