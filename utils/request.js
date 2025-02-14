export default request = (
  url,
  data = {},
  method = "GET",
  success = () => {},
  fail = () => {},
  fCallBack = () => {}
) => {
  return uni.request({
    url,
    data,
    method,
    headers: {
      "access-key": "songob777",
    },
    success,
    fail,
    fCallBack,
  });
};
