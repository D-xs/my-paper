<template>
  <view class="classify pageBg">
    <theme-item v-for="item in 9"></theme-item>
  </view>
</template>

<script setup></script>

<style lang="scss" scoped>
.classify {
  display: grid;
  gap: 10rpx;
  padding: 30rpx;
  grid-template-columns: repeat(3, 1fr);
}
</style>
