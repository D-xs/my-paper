export function timeAgo(timestamp) {
  const now = Date.now();
  const diff = now - timestamp;

  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const months = Math.floor(diff / (1000 * 60 * 60 * 24 * 30));

  if (minutes < 1) {
    return "1分钟内";
  } else if (minutes < 60) {
    return `${minutes}分钟内`;
  } else if (hours < 24) {
    return `${hours}小时内`;
  } else if (days < 30) {
    return `${days}天内`;
  } else {
    return `${months}个月内`;
  }
}

export function goHomePage() {
  uni.showModal({
    title: "提示",
    content: "页面参数有问题，返回首页",
    showCancel: false,
    success: ({ confirm, cancel }) => {
      if (confirm) {
        uni.reLaunch({ url: "/pages/index/index" });
      }
    },
  });
}
