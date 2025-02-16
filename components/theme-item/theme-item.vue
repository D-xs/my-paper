<template>
	<view class="theme-item">
		<navigator class="nav" :url="'/pages/classlist/classlist?id=' + info._id + '&name=' + info.name" v-if="!isMore">
			<image class="pic" :src="info.picurl" mode="widthFix" />
			<view class="top">{{ timeAgo(info.updateTime) }}前更新</view>
			<view class="classify">
				{{ info.name }}
			</view>
		</navigator>

		<navigator class="nav more" url="/pages/classify/classify" open-type="reLaunch" v-else>
			<image class="pic" src="/common/images/more.jpg" mode="widthFix" />
			<view class="mask">
				<uni-icons type="more-filled" size="28" color="#fff"></uni-icons>
				<text>更多</text>
			</view>
		</navigator>
	</view>
</template>

<script setup>
import { timeAgo } from '@/utils/common';
defineProps({
	isMore: {
		type: Boolean,
		default: false
	},
	info: {
		type: Object,
		default: () => ({})
	}
})
</script>

<style lang="scss" scoped>
.theme-item {
	overflow: hidden;
	width: 220rpx;
	border-radius: 10rpx;

	.nav {
		width: 100%;
		position: relative;


		.pic {
			width: 100%;
		}

		.top {
			position: absolute;
			top: 0;
			left: 0;
			padding: 6rpx 12rpx;
			font-size: 24rpx;
			color: #fff;
			background-color: rgba(215, 99, 54, 1);
			border-bottom-right-radius: 15rpx;
		}

		.classify {
			display: flex;
			justify-content: center;
			align-items: center;
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			height: 70rpx;
			color: #fff;
			font-size: 30rpx;
			background-color: rgba(0, 0, 0, .2);
			backdrop-filter: blur(20rpx);
		}
	}

	.nav.more {


		.mask {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: rgba(0, 0, 0, .2);
			color: #fff;
			backdrop-filter: blur(20rpx);
		}
	}


}
</style>