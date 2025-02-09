<template>
	<view class="container">
		<view class="name">
			<slot name="name"></slot>
		</view>
		<view class="right">
			<slot name="right"></slot>
		</view>
	</view>
</template>

<script>

</script>

<style lang="scss" scoped>
.container {
	display: flex;
	justify-content: space-between;

	.name {
		font-size: 38rpx;
	}
}
</style>