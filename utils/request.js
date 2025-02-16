const BASE_URL = "https://tea.qingnian8.com/api/bizhi";

export default (
  url,
  data = {},
  method = "GET",
  header = {},
  success = () => {},
  fail = () => {},
  fCallBack = () => {}
) => {
  header["access-key"] = "songob777";
  return new Promise((resolve, reject) => {
    uni.request({
      url: BASE_URL + url,
      data,
      method,
      header,
      success: (res) => {
        if (res.data.errCode === 0) {
          success();
          resolve(res.data);
        } else if (res.data.errCode === 400) {
          uni.showModal({
            title: "错误提示",
            content: res.data.errMsg,
            showCancel: false,
          });
          reject(res.data);
        } else {
          uni.showToast({
            title: res.data.errMsg,
            icon: "none",
          });
          reject(res.data);
        }
      },
      fail: (error) => {
        fail();
        reject(error);
      },
      fCallBack,
    });
  });
};
