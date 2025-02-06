import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw} from 'vue-router'
// : 声明一个类型 RouteRecordRaw 一个route 类型 RouteRecordRaw[] route数组
const routes :RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Home',
        meta:{
            title: '首页',
            cache:true
        },
        component: () => import('../views/Home.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})


export default router