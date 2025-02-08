<template>
  <div>
    <el-upload action="#" :on-change="handleFileChange" :auto-upload="false" :show-file-list="false">
      <el-button type="primary">选择视频文件</el-button>
    </el-upload>
    <el-progress :percentage="uploadPercentage"></el-progress>
    <video v-if="videoUrl" :src="`${publicPath}${videoUrl}`" controls></video>
  </div>
</template>

<script setup>
import axios from 'axios';
import { progress } from 'motion-v';
import SparkMD5 from 'spark-md5';
import { ref } from 'vue';

const currentFile = ref(null);
const uploadPercentage = ref(0);
const videoUrl = ref('');
const publicPath = 'http://localhost:4000'

const handleFileChange = async (file) => {
  currentFile.value = file.raw;
  await uploadFile();
}

const uploadFile = async () => {
  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB
  const file = currentFile.value;
  if (!file) return;
  console.log("file", file);
  const chunkCount = Math.ceil(file.size / CHUNK_SIZE);
  console.log("chunkCount", chunkCount);
  const spark = new SparkMD5.ArrayBuffer();
  const fileReader = new FileReader();

  // 计算MD5
  const hash = await new Promise((resolve, reject) => {
    fileReader.onload = (e) => {
      if (!e.target) return;
      spark.append(e.target.result);
      console.log("spark", spark.end());
      resolve(spark.end());
    };
    fileReader.readAsArrayBuffer(file);
    fileReader.onerror = (e) => {
      if (!e.target) return;
      reject(e.target.error);
    }
  })


  // formData.append('text',"hello world");
  // await axios.post('http://localhost:4000/upload/chunk', formData)

  // 循环上传每个分片
  for (let i = 0; i < chunkCount; i++) { 
    const formData = new FormData(); 
    const start = i * CHUNK_SIZE; 
    const end = Math.min(start  + CHUNK_SIZE, file.size);  
    const chunk = file.slice(start,  end); 
 
    // 将分片数据、索引、总分片数和哈希值添加到 FormData 中 
    formData.append('file',  chunk); 
    formData.append('index',  i); 
    formData.append('total',  chunkCount); 
    formData.append('hash',  hash); 
 
    await axios.post('http://localhost:4000/upload/chunk',  formData, { 
        headers: { 
            'Content-Type': 'multipart/form-data' 
        } 
    }); 
} 


  // 分片上传完成，发送合并请求
  try {
    const res = await axios.post('http://localhost:4000/upload/merge', {
      filename: file.name,
      total: chunkCount,
      hash: hash,
    });
    console.log(res.data);
    videoUrl.value = res.data.url;
    uploadPercentage.value = 100;
  } catch (error) {
    console.error(error);
  }
}

</script>