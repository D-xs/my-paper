<template>
	<view class="class-list-container">
		<view class="content">
			<navigator url="/pages/preview/preview" class="item" v-for="item in 9">
				<image src="../../common/images/preview2.jpg" mode="aspectFill" class="pic"></image>
			</navigator url="/pages/preview/preview" class="item" v-for="item in 9">
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss" scoped>
	.class-list-container {
		padding: 5rpx;
		
		.content {
			display: grid;
			grid-template-columns: repeat(3,1fr);
			gap: 5rpx;
			
			
			.item {
				width: 100%;
				height: 545rpx;
				
				.pic {
					
					width: 100%;
					height: 100%;
				}
			}
			
		}
	}
</style>
