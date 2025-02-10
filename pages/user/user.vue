<template>
  <view class="user-container pageBg">
    <view class="info">
      <view class="head">
        <image class="pic" src="/static/images/xxmLogo.png" mode="aspectFill" />
      </view>
      <view class="ip">192.168.0.1</view>
      <view class="area">来自：四川</view>
    </view>

    <view class="select">
      <view class="row" @click="downLoadClick">
        <view class="left">
          <uni-icons
            type="download-filled"
            size="20"
            color="#209771"
          ></uni-icons>
          <view>我的下载</view>
        </view>
        <view class="right">
          <view class="number">0</view>
          <uni-icons type="right" size="20" color="#ccc"></uni-icons>
        </view>
      </view>
      <view  class="row" @click="scoreClick">
        <view class="left">
          <uni-icons type="star-filled" size="20" color="#209771"></uni-icons>
          <view>我的评分</view>
        </view>
        <view class="right">
          <view class="number">0</view>
          <uni-icons type="right" size="20" color="#ccc"></uni-icons>
        </view>
      </view>
      <view class="row">
        <view class="left">
          <uni-icons
            type="chatboxes-filled"
            size="20"
            color="#209771"
          ></uni-icons>
          <view>联系客服</view>
        </view>
        <view class="right">
          <view class="number">0</view>
          <uni-icons type="right" size="20" color="#ccc"></uni-icons>
        </view>
        <!-- #ifdef MP -->
        <button open-type="contact" class="contact">联系客服</button>
        <!-- #endif -->
        <!-- #ifndef MP -->
        <button open-type="contact" class="contact" @click="callPhone">
          拨打电话
        </button>
        <!-- #endif -->
      </view>
    </view>
    <view class="other">
      <view class="row">
        <view class="left">
          <uni-icons
            type="notification-filled"
            size="20"
            color="#209771"
          ></uni-icons>
          <view>订阅更新</view>
        </view>
        <view class="right">
          <view class="number">0</view>
          <uni-icons type="right" size="20" color="#ccc"></uni-icons>
        </view>
      </view>
      <view class="row">
        <view class="left">
          <uni-icons type="flag-filled" size="20" color="#209771"></uni-icons>
          <view>常见问题</view>
        </view>
        <view class="right">
          <view class="number">0</view>
          <uni-icons type="right" size="20" color="#ccc"></uni-icons>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
const callPhone = () => {
  uni.makePhoneCall({
    phoneNumber: "111111111111", //仅为示例
  });
};

const downLoadClick = () => {
	uni.navigateTo({
		url: '/pages/classlist/classlist'
	})
}

const scoreClick = () => {
	uni.navigateTo({
		url: '/pages/classlist/classlist'
	})
}
</script>

<style lang="scss" scoped>
.info {
  display: flex;
  flex-direction: column;
  gap: 15rpx;
  justify-content: center;
  align-items: center;
  .head {
    width: 160rpx;
    height: 160rpx;

    .pic {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }

  .ip {
    font-size: 50rpx;
  }

  .area {
    color: #ccc;
  }
}

.select,
.other {
  margin: 30rpx 15rpx;
  border-radius: 10rpx;
  overflow: hidden;
  border: 1rpx solid #eee;
  box-shadow: 0 0 30rpx rgba(0, 0, 0, 0.05);

  :deep() {
    .uni-icons {
      color: $brand-theme-color !important;
    }
  }
}
.row {
  display: flex;
  position: relative;
  height: 100rpx;
  align-items: center;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;

  &:last-child {
    border-bottom: none;
  }
  justify-content: space-between;
  .left,
  .right {
    display: flex;
    gap: 10rpx;
    color: #707070;
  }

  .contact {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
  }
}


</style>
