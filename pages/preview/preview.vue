<template>
  <view class="preview-container">
    <view class="content">
      <swiper circular>
        <swiper-item v-for="item in 9">
          <image
            class="pic"
            src="/common/images/preview1.jpg"
            mode="aspectFill"
            @click="toggleMaskShow"
          ></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="mask" v-show="showMask">
      <view class="back" @click="goBack">
        <uni-icons type="back" size="28"></uni-icons>
      </view>
      <view class="count">1 / 12</view>
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
          <view class="text">评分</view>
        </view>
        <view class="footer-item">
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
              <view class="value">xxxxxxxxxxxxx</view>
            </view>
            <view class="content-item">
              <view class="label">发布者：</view>
              <view class="value">小咪想吃鱼</view>
            </view>
            <view class="content-item">
              <view class="label">评分：</view>
              <view class="value score">
                <uni-rate value="4" readonly />
                <view>5分</view>
              </view>
            </view>
            <view class="content-item">
              <view class="label">摘要：</view>
              <view class="value">
                <view>ssssssssssss</view>
              </view>
            </view>
            <view class="content-item">
              <view class="label">标签：</view>
              <view class="value">
                <uni-tag inverted circle text="标签" type="primary" />
              </view>
            </view>
          </view>

          <view class="my-footer">
            <view class="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus
              nisi iste maiores dolorum, quisquam minus? Delectus mollitia
              quaerat voluptatum et, autem dignissimos suscipit nemo magni!
              Repellat totam at eligendi, eum sint deserunt itaque earum
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
          <view class="title"> 壁纸信息 </view>
          <view class="close" @click="closeScoreClick">
            <uni-icons type="closeempty" size="18"></uni-icons>
          </view>
        </view>
        <view class="content">
          <uni-rate v-model="scoreState" />
          <view class="score">{{ scoreState }}分</view>
        </view>
        <view class="footer">
          <button
            type="default"
            size="mini"
            plain="true"
            :disabled="!scoreState"
            @click="confirmScore"
          >
            确认评分
          </button>
        </view>
      </view>
    </uni-popup>
  </view>
</template>

<script setup>
import { ref } from "vue";
const showMask = ref(true);
const showInfo = ref(false);
const popup = ref(null);
const scorePopup = ref(null);
const scoreState = ref(0);

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
  scoreState.value = 0;
  scorePopup.value.open("center");
};
// 关闭info点击
const closeInfoClick = () => {
  popup.value.close();
};

// 关闭评分点击
const closeScoreClick = () => {
  console.log("closeScoreClick");
  scorePopup.value.close();
};

// 确认评分
const confirmScore = () => {
  console.log("confirmScore", scoreState.value);
};

// 返回页面
const goBack = () => {
	uni.navigateBack()
}
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

    & > view {
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
      color: $text-font-color-3;
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
      color: $text-font-color-3;
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
          width: 120rpx;
          color: $text-font-color-3;
        }

        .score {
          display: flex;
          align-items: center;
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
