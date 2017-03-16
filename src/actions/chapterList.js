/**
 * Created by zhaoyan on 17/1/19.
 */
import namespace from '../utils/namespace';
import actionCreator from '../utils/actionCreator';
import ajax from '../utils/ajax';

const actionTypes = namespace({
  FETCH_CVS_START: 'FETCH_CVS_START',
  FETCH_CVS_SUCCESS: 'FETCH_CVS_SUCCESS',
  FETCH_CVS_FAIL: 'FETCH_CVS_FAIL',
  FETCH_CHAPTERS_START: 'FETCH_CHAPTERS_START',
  FETCH_CHAPTERS_SUCCESS: 'FETCH_CHAPTERS_SUCCESS',
  FETCH_CHAPTERS_FAIL: 'FETCH_CHAPTERS_FAIL',
  CREATE_CHAPTER_START: 'CREATE_CHAPTER_START',
  CREATE_CHAPTER_SUCCESS: 'CREATE_CHAPTER_SUCCESS',
  CREATE_CHAPTER_FAIL: 'CREATE_CHAPTER_FAIL',
  UPDATE_CHAPTER_START: 'UPDATE_CHAPTER_START',
  UPDATE_CHAPTER_SUCCESS: 'UPDATE_CHAPTER_SUCCESS',
  UPDATE_CHAPTER_FAIL: 'UPDATE_CHAPTER_FAIL',
  DELETE_CHAPTER_START: 'DELETE_CHAPTER_START',
  DELETE_CHAPTER_SUCCESS: 'DELETE_CHAPTER_SUCCESS',
  DELETE_CHAPTER_FAIL: 'DELETE_CHAPTER_FAIL',
  FETCH_TOPICS_START: 'FETCH_TOPICS_START',
  FETCH_TOPICS_SUCCESS: 'FETCH_TOPICS_SUCCESS',
  FETCH_TOPICS_FAIL: 'FETCH_TOPICS_FAIL',
  FETCH_TOPICINFO_START: 'FETCH_TOPICINFO_START',
  FETCH_TOPICINFO_SUCCESS: 'FETCH_TOPICINFO_SUCCESS',
  FETCH_TOPICINFO_FAIL: 'FETCH_TOPICINFO_FAIL',
  UPDATE_TOPICINFO_START: 'UPDATE_TOPICINFO_START',
  UPDATE_TOPICINFO_SUCCESS: 'UPDATE_TOPICINFO_SUCCESS',
  UPDATE_TOPICINFO_FAIL: 'UPDATE_TOPICINFO_FAIL',
  UPDATE_PROBLEMS_START: 'UPDATE_PROBLEMS_START',
  UPDATE_PROBLEMS_SUCCESS: 'UPDATE_PROBLEMS_SUCCESS',
  UPDATE_PROBLEMS_FAIL: 'UPDATE_PROBLEMS_FAIL',
  FETCH_HYPERVIDEOS_START: 'FETCH_HYPERVIDEOS_START',
  FETCH_HYPERVIDEOS_SUCCESS: 'FETCH_HYPERVIDEOS_SUCCESS',
  FETCH_HYPERVIDEOS_FAIL: 'FETCH_HYPERVIDEOS_FAIL',
  UPDATE_HYPERVIDEOS_START: 'UPDATE_HYPERVIDEOS_START',
  UPDATE_HYPERVIDEOS_SUCCESS: 'UPDATE_HYPERVIDEOS_SUCCESS',
  UPDATE_HYPERVIDEOS_FAIL: 'UPDATE_HYPERVIDEOS_FAIL',
  FETCH_VIDEOLIST_START: 'FETCH_CVS_START',
  FETCH_VIDEOLIST_SUCCESS: 'FETCH_CVS_SUCCESS',
  FETCH_VIDEOLIST_FAIL: 'FETCH_CVS_FAIL',
  CREATE_SIGNVIDEO_START: 'CREATE_SIGNVIDEO_START',
  CREATE_SIGNVIDEO_SUCCESS: 'CREATE_SIGNVIDEO_SUCCESS',
  CREATE_SIGNVIDEO_FAIL: 'CREATE_SIGNVIDEO_FAIL',
  UPDATE_TASKS_START: 'UPDATE_TASKS_START',
  UPDATE_TASKS_SUCCESS: 'UPDATE_TASKS_SUCCESS',
  UPDATE_TASKS_FAIL: 'UPDATE_TASKS_FAIL',
  FETCH_TASKS_START: 'FETCH_TASKS_START',
  FETCH_TASKS_SUCCESS: 'FETCH_TASKS_SUCCESS',
  FETCH_TASKS_FAIL: 'FETCH_TASKS_FAIL',
  CREATE_TASKS_START: 'CREATE_TASKS_START',
  CREATE_TASKS_SUCCESS: 'CREATE_TASKS_SUCCESS',
  CREATE_TASKS_FAIL: 'CREATE_TASKS_FAIL'
}, 'CHAPTERLIST');

// 获取版本信息
const getVersionsStart = actionCreator(actionTypes.FETCH_CVS_START);
const getVersionsSuccess = actionCreator(actionTypes.FETCH_CVS_SUCCESS, 'data');
const getVersionsFail = actionCreator(actionTypes.FETCH_CVS_FAIL);
const getVersions = () => (dispatch) => {
  dispatch(getVersionsStart());
  return ajax('getVersions').done((data) => {
    dispatch(getVersionsSuccess(data));
  }).fail((err) => {
    console.log('error', err);
    dispatch(getVersionsFail());
  });
}

// 获取章节信息
const getChaptersStart = actionCreator(actionTypes.FETCH_CHAPTERS_START);
const getChaptersSuccess = actionCreator(actionTypes.FETCH_CHAPTERS_SUCCESS, 'data');
const getChaptersFail = actionCreator(actionTypes.FETCH_CHAPTERS_FAIL);
const getChapters = (param) => (dispatch) => {
  dispatch(getChaptersStart());
  return ajax('getChapters', param).done((data) => {
    dispatch(getChaptersSuccess(data));
  }).fail((err) => {
    console.log('error', err);
    dispatch(getChaptersFail());
  });
}

// 添加新章节
const createChapterStart = actionCreator(actionTypes.CREATE_CHAPTER_START);
const createChapterSuccess = actionCreator(actionTypes.CREATE_CHAPTER_SUCCESS, 'data');
const createChapterFail = actionCreator(actionTypes.CREATE_CHAPTER_FAIL);
const createChapter = (param) => (dispatch, getState) => {
  dispatch(createChapterStart());
  return ajax('postChapter', param).done((data) => {
    const chapters = getState().chapters.data;
    console.log('chapters', chapters);
    dispatch(createChapterSuccess([...chapters, data]));
  }).fail((err) => {
    console.log('error', err);
    dispatch(createChapterFail());
  });
}

// 保存章节
const updateChapterStart = actionCreator(actionTypes.UPDATE_CHAPTER_START);
const updateChapterSuccess = actionCreator(actionTypes.UPDATE_CHAPTER_SUCCESS, 'data');
const updateChapterFail = actionCreator(actionTypes.UPDATE_CHAPTER_FAIL);
const updateChapter = (param, chapterId) => (dispatch) => {
  dispatch(updateChapterStart());
  return ajax('putChapter', param, chapterId).done((data) => {
    dispatch(updateChapterSuccess(data));
  }).fail((err) => {
    console.log('error', err);
    dispatch(updateChapterFail());
  });
}

// 删除章节
const deleteChapterStart = actionCreator(actionTypes.DELETE_CHAPTER_START);
const deleteChapterSuccess = actionCreator(actionTypes.DELETE_CHAPTER_SUCCESS, 'data');
const deleteChapterFail = actionCreator(actionTypes.DELETE_CHAPTER_FAIL);
const deleteChapter = (param, chapterId) => (dispatch) => {
  dispatch(deleteChapterStart());
  return ajax('deleteChapter', param, chapterId).done((data) => {
    dispatch(deleteChapterSuccess(data));
  }).fail((err) => {
    console.log('error', err);
    dispatch(deleteChapterFail());
  });
}

// 获取所有知识点
const getTopicsStart = actionCreator(actionTypes.FETCH_TOPICS_START);
const getTopicsSuccess = actionCreator(actionTypes.FETCH_TOPICS_SUCCESS, 'data');
const getTopicsFail = actionCreator(actionTypes.FETCH_TOPICS_FAIL);
const getTopics = (param) => (dispatch) => {
  dispatch(getTopicsStart());
  return ajax('getTopics', param).done((data) => {
    dispatch(getTopicsSuccess(data));
  }).fail((err) => {
    console.log('error', err);
    dispatch(getTopicsFail());
  });
}

// 获取单个知识点
const getTopicInfoStart = actionCreator(actionTypes.FETCH_TOPICINFO_START);
const getTopicInfoSuccess = actionCreator(actionTypes.FETCH_TOPICINFO_SUCCESS, 'data');
const getTopicInfoFail = actionCreator(actionTypes.FETCH_TOPICINFO_FAIL);
const getTopicInfo = (param) => (dispatch) => {
  dispatch(getTopicInfoStart());
  return ajax('getTopicInfo', param).done((data) => {
    dispatch(getTopicInfoSuccess(data));
  }).fail((err) => {
    console.log('error', err);
    dispatch(getTopicInfoFail());
  });
}

// 保存单个知识点
const updateTopicInfoStart = actionCreator(actionTypes.UPDATE_TOPICINFO_START);
const updateTopicInfoSuccess = actionCreator(actionTypes.UPDATE_TOPICINFO_SUCCESS, 'data');
const updateTopicInfoFail = actionCreator(actionTypes.UPDATE_TOPICINFO_FAIL);
const updateTopicInfo = (param, topicId) => (dispatch) => {
  dispatch(updateTopicInfoStart());
  return ajax('putTopicInfo', param, topicId).done((data) => {
    dispatch(updateTopicInfoSuccess(data));
  }).fail((err) => {
    console.log('error', err);
    dispatch(updateTopicInfoFail());
  });
}

// 保存练习题
const updateProblemsStart = actionCreator(actionTypes.UPDATE_PROBLEMS_START);
const updateProblemsSuccess = actionCreator(actionTypes.UPDATE_PROBLEMS_SUCCESS, 'data');
const updateProblemsFail = actionCreator(actionTypes.UPDATE_PROBLEMS_FAIL);
const updateProblems = (param, problemId) => (dispatch) => {
  dispatch(updateProblemsStart());
  return ajax('putProblems', param, problemId).done((data) => {
    dispatch(updateProblemsSuccess(data));
  }).fail((err) => {
    console.log('error', err);
    dispatch(updateProblemsFail());
  });
}

// 获取交互视频
const getHyperVideosStart = actionCreator(actionTypes.FETCH_HYPERVIDEOS_START);
const getHyperVideosSuccess = actionCreator(actionTypes.FETCH_HYPERVIDEOS_SUCCESS, 'data');
const getHyperVideosFail = actionCreator(actionTypes.FETCH_HYPERVIDEOS_FAIL);
const getHyperVideos = (param, problemId) => (dispatch) => {
  dispatch(getHyperVideosStart());
  return ajax('getHyperVideos', param, problemId).done((data) => {
    dispatch(getHyperVideosSuccess(data));
  }).fail((err) => {
    console.log('error', err);
    dispatch(getHyperVideosFail());
  });
}

// 保存交互视频
const updateHyperVideosStart = actionCreator(actionTypes.UPDATE_HYPERVIDEOS_START);
const updateHyperVideosSuccess = actionCreator(actionTypes.UPDATE_HYPERVIDEOS_SUCCESS, 'data');
const updateHyperVideosFail = actionCreator(actionTypes.UPDATE_HYPERVIDEOS_FAIL);
const updateHyperVideos = (param, problemId) => (dispatch) => {
  dispatch(updateHyperVideosStart());
  return ajax('putHyperVideos', param, problemId).done((data) => {
    dispatch(updateHyperVideosSuccess(data));
  }).fail((err) => {
    console.log('error', err);
    dispatch(updateHyperVideosFail());
  });
}

// 获取视频列表
const getVideoListStart = actionCreator(actionTypes.FETCH_VIDEOLIST_START);
const getVideoListSuccess = actionCreator(actionTypes.FETCH_VIDEOLIST_SUCCESS, 'data');
const getVideoListFail = actionCreator(actionTypes.FETCH_VIDEOLIST_FAIL);
const getVideoList = (param) => (dispatch) => {
  dispatch(getVideoListStart());
  return ajax('getVideoList', param).done((data) => {
    dispatch(getVideoListSuccess(data));
  }).fail((err) => {
    console.log('error', err);
    dispatch(getVideoListFail());
  });
}

// 获取视频token
const createSignVideoStart = actionCreator(actionTypes.CREATE_SIGNVIDEO_START);
const createSignVideoSuccess = actionCreator(actionTypes.CREATE_SIGNVIDEO_SUCCESS, 'data');
const createSignVideoFail = actionCreator(actionTypes.CREATE_SIGNVIDEO_FAIL);
const createSignVideo = (param) => (dispatch, getState) => {
  dispatch(createSignVideoStart());
  return ajax('postSignVideo', param).done((data) => {
    dispatch(createSignVideoSuccess(data));
  }).fail((err) => {
    console.log('error', err);
    dispatch(createSignVideoFail());
  });
}

// 获取任务
const getTasksStart = actionCreator(actionTypes.FETCH_TASKS_START);
const getTasksSuccess = actionCreator(actionTypes.FETCH_TASKS_SUCCESS, 'data');
const getTasksFail = actionCreator(actionTypes.FETCH_TASKS_FAIL);
const getTasks = (param) => (dispatch) => {
  dispatch(getTasksStart());
  return ajax('getTasks', param).done((data) => {
    dispatch(getTasksSuccess(data));
  }).fail((err) => {
    console.log('error', err);
    dispatch(getTasksFail());
  });
}

// 更新任务
const updateTasksStart = actionCreator(actionTypes.UPDATE_TASKS_START);
const updateTasksSuccess = actionCreator(actionTypes.UPDATE_TASKS_SUCCESS, 'data');
const updateTasksFail = actionCreator(actionTypes.UPDATE_TASKS_FAIL);
const updateTasks = (param, taskId) => (dispatch) => {
  dispatch(updateTasksStart());
  return ajax('putTasks', param, taskId).done((data) => {
    dispatch(updateTasksSuccess(data));
  }).fail((err) => {
    console.log('error', err);
    dispatch(updateTasksFail());
  });
}

// 保存任务
const createTasksStart = actionCreator(actionTypes.CREATE_TASKS_START);
const createTasksSuccess = actionCreator(actionTypes.CREATE_TASKS_SUCCESS, 'data');
const createTasksFail = actionCreator(actionTypes.CREATE_TASKS_FAIL);
const createTasks = (param, taskId) => (dispatch) => {
  dispatch(createTasksStart());
  return ajax('postTasks', param, taskId).done((data) => {
    dispatch(createTasksSuccess(data));
  }).fail((err) => {
    console.log('error', err);
    dispatch(createTasksFail());
  });
}

export {
  actionTypes,
  getVersions,
  getChapters,
  createChapter,
  updateChapter,
  deleteChapter,
  getTopics,
  getTopicInfo,
  updateTopicInfo,
  updateProblems,
  getHyperVideos,
  updateHyperVideos,
  getVideoList,
  createSignVideo,
  getTasks,
  updateTasks,
  createTasks
};
