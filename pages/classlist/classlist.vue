<template>
  <view class="class-list-container">
    <view class="content">
      <navigator
        :url="'/pages/preview/preview?id=' + item._id"
        class="item"
        v-for="item in picList"
        :key="item._id"
      >
        <image :src="item.smallPicurl" mode="aspectFill" class="pic"></image>
      </navigator>
    </view>

    <view class="loading safe-bottom-padding">
      <uni-load-more :status="noData ? 'no-more' : 'loading'"></uni-load-more>
    </view>
  </view>
</template>

<script setup>
import { getWallList, getUserWallList } from "@/api/base.js";
import { goHomePage } from "@/utils/common";
const picList = ref([]);
const queryParams = {
  pageNum: 1,
  pageSize: 12,
};
const pageName = ref("");
const noData = ref(false);
onLoad(({ id, name, type }) => {
  if (!id && !type) return goHomePage();
  queryParams.classid = id;
  pageName.value = name;
  queryParams.type = type;
  getList();
  uni.setNavigationBarTitle({
    title: name,
  });
  console.log("list onload");
});

onReachBottom(() => {
  if (noData.value)
    return uni.showToast({
      title: "没有更多数据了~",
      icon: "none",
    });
  queryParams.pageNum++;
  getList();
});

const getList = async () => {
  let res = [];
  if (queryParams.classid) {
    res = await getWallList(queryParams);
  } else {
    res = await getUserWallList(queryParams);
  }
  if (queryParams.pageSize > res.data.length) noData.value = true;
  picList.value = [...picList.value, ...res.data];
  uni.setStorageSync("storageClassList", picList.value);
};

onShareAppMessage(() => {
  return {
    title: `我的壁纸-${pageName.value}`,
    path: `/pages/classlist/classlist?id=${queryParams.classid}&name=${pageName.value}`,
    imageUrl: "/static/images/xxmLogo.png",
  };
});

onShareTimeline(() => {
  return {
    title: "我的壁纸",
    query: `id=${queryParams.classid}&name=${pageName.value}`,
  };
});

onUnload(() => {
  uni.removeStorageSync("storageClassList");
});
</script>

<style lang="scss" scoped>
.class-list-container {
  padding: 5rpx;

  .content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
