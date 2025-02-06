<template>
  <CardContainer>
      <CardBody class="group/card relative size-auto rounded-xl border border-black/[0.1] bg-gray-50 p-6 sm:w-[30rem] dark:border-white/[0.2] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1]">
        <CardItem  :translate-z="50" class="text-xl font-bold text-neutral-600 dark:text-white">
          Hello, I'm a wall message!
          Hello, I'm a wall message!
          Hello, I'm a wall message!
          Hello, I'm a wall message!
          Hello, I'm a wall message!
          Hello, I'm a wall message!
        </CardItem>
        <div class="mt-20 flex items-center justify-between">
          <CardItem
            :translate-z="20"
            as="a"
            href="https://rahulv.dev"
            target="__blank"
            class="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
          >
            鼓励一下 →
          </CardItem>
          <CardItem
            :translate-z="20"
            as="button"
            class="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
          >
            留言
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
</template>

<script lang="ts" setup>
import CardBody from './ui/CardBody.vue';
import CardContainer from './ui/CardContainer.vue';
import CardItem from './ui/CardItem.vue';



</script>
<style lang="">

</style>