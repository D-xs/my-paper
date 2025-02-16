<template>
  <view class=" pageBg">
    <custom-nav-bar title="推荐"></custom-nav-bar>
    <view class="classify">
      <theme-item v-for="item in classifyList" :key="item._id" :info="item"></theme-item>
    </view>
  </view>
</template>

<script setup>
import { getClassify } from "@/api/base.js"
const classifyList = ref([])
onMounted(async () => {
  const classifyListRes = await getClassify({
    pageSize: 15
  })
  classifyList.value = classifyListRes.data
})
</script>

<style lang="scss" scoped>
.classify {
  display: grid;
  gap: 10rpx;
  padding: 30rpx;
  grid-template-columns: repeat(3, 1fr);
}
</style>
