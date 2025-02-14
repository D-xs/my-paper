<template>
  <view class=" pageBg">
		<custom-nav-bar title="推荐"></custom-nav-bar>
    <view class="classify">
			<theme-item v-for="item in 18"></theme-item>
		</view>
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
