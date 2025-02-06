<template>
  <div>
    <div v-if="selectType === 1">
      <p>{{wallType[0].name}}</p>
      <p>{{wallType[0].slogan}}</p>
          <div>
      <el-button v-for="label in labels" :key="label.index" @click="setIndex(label.index)">
        {{ label.name }}
      </el-button>
    </div>
      <WallCard/>
    </div>

    <div v-if="selectType === 2">
      <p>{{wallType[1].name}}</p>
      <p>{{wallType[1].slogan}}</p>
    </div>
    
    <!-- 使用V-for渲染label -->


    
  </div>
</template>
<script lang="ts" setup>
import { wallType, labels } from '../utils/data';
import EventBus from '../lib/event-bus';
import { ref } from 'vue';
import WallCard from './WallCard.vue';

// 接受兄弟emit过来的数据
const selectType = ref(1);
EventBus.on('changeWall',(value: any)=> {
  console.log(value);
  selectType.value = value;
})

const setIndex = (index: number) => {
  console.log(index);
  EventBus.emit('changeIndex', index);
}
</script>
<style lang="">

</style>