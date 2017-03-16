/**
 * Created by zhaoyan on 17/1/18.
 *
 * 命名需加前缀: get / post / put / delete
 * ajax组件根据前缀自动判断请求类型
 */

export default {
  getVersions: '/cvs',
  getChapters: '/chapters',
  postChapter: '/chapters',
  putChapter: '/chapters',
  deleteChapter: '/chapters',
  getTopics: '/topicList',  // 获取所有知识点
  getTopicInfo: '/topics',  // 获取单个知识点
  putTopicInfo: '/topics',
  putProblems: '/problems',
  getHyperVideos: '/hyperVideos',
  putHyperVideos: '/hyperVideos',
  getVideoList: '/videoList',
  postSignVideo: '/signVideo',
  getTasks: '/tasks',
  putTasks: '/tasks',
  postTasks: '/tasks',
};
