<template>
	<view class="preview-container" v-if="currentInfo">
		<view class="content">
			<swiper circular @change="swiperChange" :current="currentPage">
				<swiper-item v-for="(item, index) in picDetails" :key="item._id">
					<image v-if="shouldPreloadImage(index)" class="pic" :src="item.picUrl" mode="aspectFill"
						@click="toggleMaskShow"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="mask" v-show="showMask">
			<view class="back" @click="goBack">
				<uni-icons type="back" size="28"></uni-icons>
			</view>
			<view class="count">{{ currentPage + 1 }} / {{ picDetails.length }}</view>
			<view class="time">
				<uni-dateformat :date="Date.now()" format="hh:mm"></uni-dateformat>
			</view>
			<view class="date">
				<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
			</view>
			<view class="footer">
				<view class="footer-item" @click="infoClick">
					<view class="icons">
						<uni-icons type="info" size="20"></uni-icons>
					</view>
					<view class="text">信息</view>
				</view>
				<view class="footer-item" @click="scoreClick">
					<view class="icons">
						<uni-icons type="star" size="20"></uni-icons>
					</view>
					<view class="text">{{ currentInfo.score }}分</view>
				</view>
				<view class="footer-item" @click="downloadPic">
					<view class="icons">
						<uni-icons type="download" size="20"></uni-icons>
					</view>
					<view class="text">下载</view>
				</view>
			</view>
		</view>
		<!-- 底部弹窗 -->
		<uni-popup ref="popup" type="bottom" is-mask-click>
			<view class="popupContainer">
				<scroll-view scroll-y style="height: 50vh">
					<view class="header">
						<view></view>
						<view class="title"> 壁纸信息 </view>
						<view class="close" @click="closeInfoClick">
							<uni-icons type="closeempty" size="18"></uni-icons>
						</view>
					</view>
					<view class="content">
						<view class="content-item">
							<view class="label">壁纸id：</view>
							<view class="value">{{ currentInfo._id }}</view>
						</view>
						<view class="content-item">
							<view class="label">发布者：</view>
							<view class="value">{{ currentInfo.nickname }}</view>
						</view>
						<view class="content-item">
							<view class="label">评分：</view>
							<view class="value score">
								<uni-rate :value="currentInfo.score" readonly />
								<view>{{ currentInfo.score }}分</view>
							</view>
						</view>
						<view class="content-item">
							<view class="label">摘要：</view>
							<view class="value">
								<view>{{ currentInfo.description }}</view>
							</view>
						</view>
						<view class="content-item">
							<view class="label">标签：</view>
							<view class="value">
								<uni-tag v-for="item in currentInfo.tabs" :key="item" inverted circle :text="item" type="primary" />
							</view>
						</view>
					</view>

					<view class="my-footer">
						<view class="desc">
							所有图片均来自网络，该项目仅供学习使用，不可商用，如有侵权，请联系作者删掉
						</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<!-- 评分弹窗 -->
		<uni-popup ref="scorePopup" is-mask-click>
			<view class="scorePupupContainer">
				<view class="header">
					<view></view>
					<view class="title">
						{{ isScored ? "评分过了~" : "壁纸评分" }}
					</view>
					<view class="close" @click="closeScoreClick">
						<uni-icons type="closeempty" size="18"></uni-icons>
					</view>
				</view>
				<view class="content">
					<uni-rate v-model="scoreState" allowHalf :disabled="isScored" disabled-color="#ffca3e" />
					<view class="score">{{ scoreState }}分</view>
				</view>
				<view class="footer">
					<button type="default" size="mini" plain="true" :disabled="!scoreState || isScored" @click="confirmScore">
						确认评分
					</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		getDownloadWall,
		setScore
	} from "@/api/base.js";
	const showMask = ref(true);
	const popup = ref(null);
	const scorePopup = ref(null);
	const scoreState = ref(0);
	const picDetails = ref([]);
	const currentPage = ref(0);
	const currentInfo = ref(null);
	const classifyId = ref("");
	const isScored = ref(false);

	// 显示隐藏遮罩
	const toggleMaskShow = () => {
		showMask.value = !showMask.value;
	};

	// info点击
	const infoClick = () => {
		popup.value.open();
	};

	// 评分点击
	const scoreClick = () => {
		if (currentInfo.value.userScore) {
			isScored.value = true;
			scoreState.value = currentInfo.value.userScore;
		}
		scorePopup.value.open("center");
	};
	// 关闭info点击
	const closeInfoClick = () => {
		popup.value.close();
	};

	// 关闭评分点击
	const closeScoreClick = () => {
		scorePopup.value.close();
		isScored.value = false;
	};

	// 确认评分
	const confirmScore = async () => {
		// console.log("confirmScore", scoreState.value);
		uni.showLoading({
			title: "加载中...",
		});
		const res = await setScore({
			classid: classifyId.value,
			wallId: currentInfo.value._id,
			userScore: scoreState.value,
		});
		uni.hideLoading();
		if (res.errCode === 0) {
			uni.showToast({
				title: "评分成功",
				icon: "none",
			});
			isScored.value = true;
			picDetails.value[currentPage.value].userScore = scoreState.value;
			uni.setStorageSync("storageClassList", picDetails.value);
		}
		// getDetail();
		closeScoreClick();
	};

	// 返回页面
	const goBack = () => {
		uni.navigateBack();
	};

	const swiperChange = (e) => {
		currentPage.value = e.detail.current;
		currentInfo.value = picDetails.value[currentPage.value];
	};

	const shouldPreloadImage = (index) => {
		const totalImages = picDetails.value.length;

		// 使用模运算来处理循环边界，确保前一张和后一张的索引不会越界
		const prevIndex = (currentPage.value - 1 + totalImages) % totalImages;
		const nextIndex = (currentPage.value + 1) % totalImages;

		// 当前图片、前一张和后一张图片
		return (
			index === currentPage.value || index === prevIndex || index === nextIndex
		);
	};

	// 下载图片
	const downloadPic = async () => {
		console.log('下载图片');
		// #ifdef H5
		uni.showModal({
			content: '请长按图片进行保存',
			showCancel: false
		})
		// #endif

		// #ifndef H5

		try {
			const result = await getDownloadWall({
				classid: currentInfo.value.classid,
				wallId: currentInfo.value._id
			})
			
			if(result.errCode !== 0) {
				throw result
			}
			uni.getImageInfo({
				src: currentInfo.value.picUrl,
				success: (res) => {
					uni.showLoading({
						title: '正在下载中...',
						mask: true
					})
					uni.saveImageToPhotosAlbum({
						filePath: res.path,
						success() {
							uni.showToast({
								title: '保存成功, 请到相册查看',
								icon: 'none'
							})
						},
						fail(err) {
							if (err.errMsg === 'saveImageToPhotosAlbum:fail cancel') {
								uni.showToast({
									title: '下载失败，请点击下载按钮重新下载',
									icon: 'none'
								})
								return
							}
							uni.showModal({
								title: '提示',
								content: '需要获取授权将图片保存到相册',
								success({
									confirm
								}) {
									if (confirm) {
										uni.openSetting({
											success(e) {
												if (e.authSetting['scope.writePhotosAlbum']) {
													uni.showToast({
														title: '获取授权成功',
														icon: 'none'
													})
													// 如果授权了,则下载
												} else {
													uni.showToast({
														title: '获取授权失败',
														icon: 'none'
													})
												}
											}
										})
									}
								}
							})
						},
						complete() {
							uni.hideLoading();
						}
					})
				}
			})
		} catch (error) {
			console.log('catch', error);
			//TODO handle the exception
		}

		// #endif
	}



	onLoad(async ({
		id
	}) => {
		classifyId.value = id;

		const storageClassList = uni.getStorageSync("storageClassList") || [];
		picDetails.value = storageClassList.map((item) => {
			item.picUrl = item.smallPicurl.replace("_small.webp", ".jpg");
			return item;
		});
		const currentIndex = storageClassList.findIndex((item) => item._id === id);
		currentPage.value = currentIndex;
		currentInfo.value = picDetails.value[currentPage.value];
	});

	onUnmounted(() => {
		// uni.removeStorageSync("storageClassList");
	});
</script>

<style lang="scss" scoped>
	.preview-container {
		position: relative;
		width: 100%;
		height: 100vh;

		.content,
		swiper,
		swiper-item {
			width: 100%;
			height: 100%;

			.pic {
				width: 100%;
				height: 100%;
			}
		}

		.mask {
			// position: relative;
			// position: absolute;
			// left: 0;
			// top: 0;
			// width: 100%;
			// height: 100vh;

			&>view {
				position: absolute;
				left: 0;
				margin: auto;
				color: #fff;
				width: fit-content;
			}

			.back {
				display: flex;
				justify-content: center;
				align-items: center;
				border: 1px solid $text-font-color-3;
				background-color: rgba(0, 0, 0, 0.5);
				width: 72rpx;
				height: 72rpx;
				border-radius: 50%;
				top: 80rpx;
				left: 40rpx;

				:deep() {
					.uni-icons {
						color: $text-font-color-3 !important;
					}
				}
			}

			.count {
				top: 10vh;
				left: 0;
				right: 0;
				margin: 10rpx auto;
				width: fit-content;
				// background-color: red;
				border-radius: 12rpx;
				color: $text-font-color-4;
				font-size: 24rpx;
				height: 30rpx;
				line-height: 30rpx;
			}

			.time {
				left: 0;
				right: 0;
				top: calc(10vh + 80rpx);
				display: flex;
				justify-content: center;
				align-items: center;
				color: $text-font-color-4;
				font-size: 100rpx;
			}

			.date {
				right: 0;
				top: calc(10vh + 220rpx);
				margin: 10rpx auto;
				width: fit-content;
				// background-color: red;
				border-radius: 12rpx;
				color: $text-font-color-4;
				font-size: 24rpx;
				height: 30rpx;
				line-height: 30rpx;
			}

			.footer {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 60rpx;
				width: 490rpx;
				height: 120rpx;
				right: 0;
				bottom: 155rpx;
				margin: 0 auto;
				background-color: $text-font-color-2;
				border-radius: 60rpx;

				.footer-item {
					display: flex;
					padding: 2rpx 10rpx;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.text {
						font-size: 24rpx;
						color: $text-font-color-4;
					}

					:deep() {
						.uni-icons {
							color: $text-font-color-4 !important;
						}
					}
				}
			}
		}

		.popupContainer {
			height: 50vh;
			background-color: #fff;
			border-radius: 20rpx;
			border-bottom-left-radius: 0;
			border-bottom-right-radius: 0;

			.header {
				display: flex;
				justify-content: space-between;
				padding: 30rpx;
				font-size: 24rpx;
				color: $text-font-color-3;

				:deep() {
					.uni-icons {
						color: $text-font-color-3 !important;
					}
				}
			}

			.content {
				padding: 0 30rpx;
				font-size: 26rpx;
				height: auto;

				.content-item {
					display: flex;
					align-items: center;
					margin-top: 30rpx;

					.label {
						text-align: right;
						min-width: 120rpx;
						color: $text-font-color-3;
					}

					.score {
						display: flex;
						align-items: center;
					}

					:deep() {
						.uni-tag {
							margin-right: 16rpx;
						}
					}
				}
			}

			.my-footer {
				padding: 10rpx;
				font-size: 26rpx;
				margin: 30rpx;
				background-color: $text-font-color-4;
				color: $text-font-color-2;
				border-radius: 6rpx;
			}
		}

		.scorePupupContainer {
			background-color: #fff;
			width: 60vw;
			padding: 30rpx;
			border-radius: 20rpx;

			.header {
				display: flex;
				justify-content: space-between;

				font-size: 24rpx;
				color: $text-font-color-3;

				:deep() {
					.uni-icons {
						color: $text-font-color-3 !important;
					}
				}
			}

			.content {
				padding: 30rpx;
				display: flex;
				justify-content: center;
				align-items: center;

				.score {
					margin-left: 10rpx;
					font-size: 26rpx;
					color: $text-font-color-3;
				}
			}

			.footer {
				display: flex;
				justify-content: center;
			}
		}
	}
</style>