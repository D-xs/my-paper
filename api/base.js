import request from "@/utils/request";

// 首页海报
export const getBannerList = () => request("/homeBanner");

// 壁纸大分类
export const getClassify = (data) => request("/classify", data);

// 分类中壁纸列表
export const getWallList = (data) => request("/wallList", data);

// 壁纸评分
export const setScore = (data) => request("/setupScore", data);

// 随机九张壁纸
export const getRandomNinePic = () => request("/randomWall");

// 单个壁纸详情
export const getSinglePicDetail = (data) => request("/detailWall", data);

// 下载壁纸
export const getDownloadWall = (data) => request("/downloadWall", data);

// 我的评分/下载列表
export const getUserWallList = (data) => request("/userWallList", data);

// 用户个人信息
export const getUserInfo = () => request("/userInfo");

// 壁纸资讯公告列表
export const getWallNewsList = (data) => request("/wallNewsList", data);

// 资讯公告详情
export const getWallNewsDetail = (data) => request("/wallNewsDetail", data);

// 搜索壁纸
export const getSearchWall = (data) => request("/searchWall", data);
