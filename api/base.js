import request from "@/utils/request";

// 首页海报
export const getBannerList = () =>
  request("https://tea.qingnian8.com/api/bizhi/homeBanner");

// 壁纸大分类
export const getClassify = (data) =>
  request("https://tea.qingnian8.com/api/bizhi/classify", data);

// 分类中壁纸列表
export const getWallList = (data) =>
  request("https://tea.qingnian8.com/api/bizhi/wallList", data);

// 壁纸评分
export const setScore = (data) =>
  request("https://tea.qingnian8.com/api/bizhi/setupScore", data);

// 随机九张壁纸
export const getRandomNinePic = () =>
  request("https://tea.qingnian8.com/api/bizhi/randomWall");

// 单个壁纸详情
export const getSinglePicDetail = (data) =>
  request("https://tea.qingnian8.com/api/bizhi/detailWall", data);

// 下载壁纸
export const getDownloadWall = (data) =>
  request("https://tea.qingnian8.com/api/bizhi/downloadWall", data);

// 我的评分/下载列表
export const getUserWallList = (data) =>
  request("https://tea.qingnian8.com/api/bizhi/userWallList", data);

// 用户个人信息
export const getUserInfo = () =>
  request("https://tea.qingnian8.com/api/bizhi/userInfo");

// 壁纸资讯公告列表
export const getWallNewsList = (data) =>
  request("https://tea.qingnian8.com/api/bizhi/wallNewsList", data);

// 资讯公告详情
export const getWallNewsDetail = (data) =>
  request("https://tea.qingnian8.com/api/bizhi/wallNewsDetail", data);

// 搜索壁纸
export const getSearchWall = (data) =>
  request("https://tea.qingnian8.com/api/bizhi/searchWall", data);
