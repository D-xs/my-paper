<template>
  <view class="home pageBg">
    <custom-nav-bar></custom-nav-bar>
    <view class="banner">
      <swiper class="swiper" indicator-dots indicator-active-color="#fff" indicator-color="rgba(255,255,255,.5)"
        autoplay circular>
        <swiper-item v-for="item in bannerList " :key="item._id">
          <image :src="item.picurl" mode="aspectFill"></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="notice">
      <view class="left">
        <uni-icons type="sound-filled" size="20"></uni-icons>
        <text>公告</text>
      </view>
      <view class="center">
        <swiper vertical autoplay circular>
          <swiper-item @click="goDetail" v-for="item in noticeList" :key="item._id">
            <view>{{ item.title }}</view>
          </swiper-item>
        </swiper>
      </view>
      <view class="right">
        <uni-icons type="right" size="16"></uni-icons>
      </view>
    </view>

    <view class="select">
      <common-title>
        <template #name> 每日推荐 </template>
        <template #right>
          <view class="date">
            <uni-icons type="calendar-filled" size="26"></uni-icons>
            <view>
              <uni-dateformat :date="Date.now()" format="dd日"></uni-dateformat>
            </view>
          </view>
        </template>
      </common-title>
      <view class="content">
        <scroll-view scroll-x>
          <view v-for="item in dayRodomPics" :key="item._id" @click="goPreview(item)">
            <image class="pic" :src="item.smallPicurl" mode="aspectFill"></image>
          </view>
        </scroll-view>
      </view>

      <common-title>
        <template #name>专题精选</template>
        <template #right>
          <view>
            <navigator class="nav"> More+ </navigator>
          </view>
        </template>
      </common-title>

      <view class="paper-list">
        <theme-item v-for="item in classifyList" :key="item._id" :info="item"></theme-item>
        <theme-item isMore></theme-item>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from "vue"

import { getBannerList, getRandomNinePic, getWallNewsList, getClassify } from '../../api/base'

const bannerList = ref([])
const dayRodomPics = ref([])
const noticeList = ref([])
const classifyList = ref([])

const goPreview = (item) => {
  uni.navigateTo({
    url: '/pages/preview/preview?id=' + item._id
  })
}

const goDetail = () => {
  uni.navigateTo({
    url: '/pages/notice/detail'
  })
}

onMounted(async () => {
  const bannerResult = await getBannerList()
  bannerList.value = bannerResult.data

  const dayRodomPicResult = await getRandomNinePic()
  dayRodomPics.value = dayRodomPicResult.data

  const noticeResult = await getWallNewsList({
    pageNum: 1,
    pageSize: 4
  })
  noticeList.value = noticeResult.data

  const classifyListRes = await getClassify()
  classifyList.value = classifyListRes.data


})
</script>

<style lang="scss" scoped>
.home {
  color: $text-font-color-1;
}

.banner {
  width: 750rpx;
  padding: 30rpx 0;

  .swiper {
    width: 100%;
    height: 340rpx;

    swiper-item {
      width: 100%;
      height: 100%;
      padding: 0 30rpx;

      image {
        width: 100%;
        height: 100%;
        border-radius: 10rpx;
      }
    }
  }
}

.notice {
  margin: 30rpx;
  height: 80rpx;
  background-color: #f9f9f9;
  display: flex;
  align-items: center;
  border-radius: 40rpx;

  :deep() {
    .uni-icons {
      color: $brand-theme-color !important;
    }
  }

  .left {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10rpx;
    width: 140rpx;
    color: $brand-theme-color;
    font-weight: bold;
    font-size: 30rpx;
  }

  .center {
    flex: 1;
    height: 80rpx;
    line-height: 80rpx;
    color: #666;
    font-size: 28rpx;
    font-weight: bold;

    swiper {
      height: 100%;

      swiper-item {
        view {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }

  .right {
    width: 40rpx;
  }
}

.select {
  margin: 30rpx;

  .date {
    display: flex;
    justify-content: center;
    align-items: center;
    color: $brand-theme-color;

    :deep() {
      .uni-icons {
        color: $brand-theme-color !important;
      }
    }
  }

  .nav {
    color: #ccc;
  }

  .content {
    margin-top: 30rpx;
    margin-bottom: 30rpx;

    scroll-view {
      display: flex;
      height: 373rpx;
      flex-wrap: nowrap;
      white-space: nowrap;

      view {
        display: inline-block;
        width: 210rpx;
        height: 373rpx;
        margin-right: 15rpx;

        .pic {
          width: 100%;
          height: 100%;
          border-radius: 10rpx;
        }
      }
    }
  }

  .paper-list {
    margin: 30rpx 0;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 15rpx;
    padding-bottom: 50rpx;
  }
}
</style>
