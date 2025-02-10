<template>
	<view class="preview-container">
		<view class="content">
			<swiper circular>
				<swiper-item v-for="item in 9">
					<image class="pic" src="/common/images/preview1.jpg" mode="aspectFill"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="mask">
			
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.preview-container {
	width: 100%;
	height: 100vh;
	
	.content, swiper, swiper-item {
		width: 100%;
		height: 100%;
		
		.pic {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
