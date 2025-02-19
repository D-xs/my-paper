<template>
  <view class="noticeLayout" v-if="noticeDetail">
    <view class="title">
      <view class="tag" v-if="true">
        <uni-tag inverted text="置顶" type="error" />
      </view>
      <view class="font">{{ noticeDetail.title }}</view>
    </view>

    <view class="info">
      <view class="item">{{ noticeDetail.author }}</view>
      <view class="item">
        <uni-dateformat
          :date="noticeDetail.publish_date"
          format="yyyy-MM-dd hh:mm:ss"
        ></uni-dateformat>
      </view>
    </view>

    <view class="content">
      <mp-html :content="noticeDetail.content" />
      <!-- <rich-text :nodes="detail.content"></rich-text> -->
    </view>

    <view class="count"> 阅读 {{ noticeDetail.view_count }} </view>
  </view>
</template>

<script setup>
import { getWallNewsDetail } from "@/api/base";
import { goHomePage } from "../../utils/common";
const noticeDetail = ref(null);
// import {apiNoticeDetail} from "@/api/apis.js"
// import { ref } from "vue";
// import {onLoad} from "@dcloudio/uni-app"

// const detail = ref({})
// let noticeId
// onLoad((e)=>{
// 	noticeId = e.id
// 	getNoticeDetail();
// })

// const getNoticeDetail = ()=>{
// 	apiNoticeDetail({id:noticeId}).then(res=>{
// 		detail.value = res.data
// 		console.log(res);
// 	})
// }
onLoad(async ({ id }) => {
  if (id) {
    const res = await getWallNewsDetail({
      id,
    });
    noticeDetail.value = res.data;
  } else {
    goHomePage();
  }
});
</script>

<style lang="scss" scoped>
.noticeLayout {
  padding: 30rpx;
  .title {
    font-size: 40rpx;
    color: #111;
    line-height: 1.6em;
    padding-bottom: 30rpx;
    display: flex;
    .tag {
      transform: scale(0.8);
      transform-origin: left center;
      flex-shrink: 0;
    }
    .font {
      padding-left: 6rpx;
    }
  }
  .info {
    display: flex;
    align-items: center;
    color: #999;
    font-size: 28rpx;
    .item {
      padding-right: 20rpx;
    }
  }
  .content {
    padding: 50rpx 0;
  }
  .count {
    color: #999;
    font-size: 28rpx;
  }
}
</style>
