/**
 * Created by zhaoyan on 17/1/19.
 */
import { actionTypes } from '../actions/chapterList';

function versions(
  state = {
    loading: false,
    success: false,
    data: {}
  }, action) {
  switch (action.type) {
    case actionTypes.FETCH_CVS_START:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actionTypes.FETCH_CVS_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.data
      };
    case actionTypes.FETCH_CVS_FAIL:
      return {
        ...state,
        loading: false,
        success: false
      };
    default:
      return state;
  }
}

function chapters(
  state = {
    loading: false,
    success: false,
    adding: false,
    addSuccess: false,
    editing: false,
    editSuccess: false,
    deleting: false,
    deleteSuccess: false,
    data: []
  }, action) {
  switch (action.type) {
    case actionTypes.FETCH_CHAPTERS_START:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actionTypes.FETCH_CHAPTERS_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.data
      };
    case actionTypes.FETCH_CHAPTERS_FAIL:
      return {
        ...state,
        loading: false,
        success: false
      };
    case actionTypes.CREATE_CHAPTER_START:
      return {
        ...state,
        adding: true,
        addSuccess: false
      };
    case actionTypes.CREATE_CHAPTER_SUCCESS:
      return {
        adding: false,
        addSuccess: true,
        data: [action.data]
      };
    case actionTypes.CREATE_CHAPTER_FAIL:
      return {
        ...state,
        adding: false,
        addSuccess: false
      };
    case actionTypes.UPDATE_CHAPTER_START:
      return {
        ...state,
        editing: true,
        editSuccess: false
      };
    case actionTypes.UPDATE_CHAPTER_SUCCESS:
      return {
        editing: false,
        editSuccess: true,
        data: [action.data]
      };
    case actionTypes.UPDATE_CHAPTER_FAIL:
      return {
        ...state,
        editing: false,
        editSuccess: false
      };
    case actionTypes.DELETE_CHAPTER_START:
      return {
        ...state,
        deleting: true,
        deleteSuccess: false
      };
    case actionTypes.DELETE_CHAPTER_SUCCESS:
      return {
        deleting: false,
        deleteSuccess: true,
        data: [action.data]
      };
    case actionTypes.DELETE_CHAPTER_FAIL:
      return {
        ...state,
        deleting: false,
        deleteSuccess: false
      };
    default:
      return state;
  }
}

function topics(
  state = {
    loading: false,
    success: false,
    data: []
  }, action) {
  switch (action.type) {
    case actionTypes.FETCH_TOPICS_START:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actionTypes.FETCH_TOPICS_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.data
      };
    case actionTypes.FETCH_TOPICS_FAIL:
      return {
        ...state,
        loading: false,
        success: false
      };
    default:
      return state;
  }
}

function topicInfo(
  state = {
    loading: false,
    success: false,
    data: {}
  }, action) {
  switch (action.type) {
    case actionTypes.FETCH_TOPICINFO_START:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actionTypes.FETCH_TOPICINFO_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.data[0]
      };
    case actionTypes.FETCH_TOPICINFO_FAIL:
      return {
        ...state,
        loading: false,
        success: false
      };
    case actionTypes.UPDATE_TOPICINFO_START:
      return {
        ...state,
        editing: true,
        editSuccess: false
      };
    case actionTypes.UPDATE_TOPICINFO_SUCCESS:
      return {
        editing: false,
        editSuccess: true,
        data: [action.data]
      };
    case actionTypes.UPDATE_TOPICINFO_FAIL:
      return {
        ...state,
        editing: false,
        editSuccess: false
      };
    default:
      return state;
  }
}

function problems(
  state = {
    loading: false,
    success: false,
    data: []
  }, action) {
  switch (action.type) {
    case actionTypes.UPDATE_PROBLEMS_START:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actionTypes.UPDATE_PROBLEMS_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.data
      };
    case actionTypes.UPDATE_PROBLEMS_FAIL:
      return {
        ...state,
        loading: false,
        success: false
      };
    default:
      return state;
  }
}

function hyperVideos(
  state = {
    loading: false,
    success: false,
    editing: false,
    editSuccess: false,
    data: []
  }, action) {
  switch (action.type) {
    case actionTypes.FETCH_HYPERVIDEOS_START:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actionTypes.FETCH_HYPERVIDEOS_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.data
      };
    case actionTypes.FETCH_HYPERVIDEOS_FAIL:
      return {
        ...state,
        loading: false,
        success: false
      };
    case actionTypes.UPDATE_HYPERVIDEOS_START:
      return {
        ...state,
        editing: true,
        editSuccess: false
      };
    case actionTypes.UPDATE_HYPERVIDEOS_SUCCESS:
      return {
        editing: false,
        editSuccess: true,
        data: action.data
      };
    case actionTypes.UPDATE_HYPERVIDEOS_FAIL:
      return {
        ...state,
        editing: false,
        editSuccess: false
      };
    default:
      return state;
  }
}

function videoList(
  state = {
    loading: false,
    success: false,
    data: []
  }, action) {
  switch (action.type) {
    case actionTypes.FETCH_VIDEOLIST_START:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actionTypes.FETCH_VIDEOLIST_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.data
      };
    case actionTypes.FETCH_VIDEOLIST_FAIL:
      return {
        ...state,
        loading: false,
        success: false
      };
    default:
      return state;
  }
}


function signVideo(
  state = {
    loading: false,
    success: false,
    data: {}
  }, action) {
  switch (action.type) {
    case actionTypes.CREATE_SIGNVIDEO_START:
      return {
        ...state,
        loading: true,
        success: false
      };
    case actionTypes.CREATE_SIGNVIDEO_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.data
      };
    case actionTypes.CREATE_SIGNVIDEO_FAIL:
      return {
        ...state,
        loading: false,
        success: false
      };
    default:
      return state;
  }
}

function tasks(
  state = {
    loading: false,
    success: false,
    adding: false,
    addSuccess: false,
    editing: false,
    editSuccess: false,
    data: []
  }, action) {
  switch (action.type) {
    case actionTypes.FETCH_TASKS_START:
    return {
      ...state,
      loading: true,
      success: false
    };
    case actionTypes.FETCH_TASKS_SUCCESS:
      return {
        loading: false,
        success: true,
        data: action.data
      };
    case actionTypes.FETCH_TASKS_FAIL:
      return {
        ...state,
        loading: false,
        success: false
      };
    case actionTypes.CREATE_TASKS_START:
      return {
        ...state,
        adding: true,
        addSuccess: false
      };
    case actionTypes.CREATE_TASKS_SUCCESS:
      return {
        adding: false,
        addSuccess: true,
        data: action.data
      };
    case actionTypes.CREATE_TASKS_FAIL:
      return {
        ...state,
        adding: false,
        addSuccess: false
      };
    case actionTypes.UPDATE_TASKS_START:
      return {
        ...state,
        editing: true,
        editSuccess: false
      };
    case actionTypes.UPDATE_TASKS_SUCCESS:
      return {
        editing: false,
        editSuccess: true,
        data: action.data
      };
    case actionTypes.UPDATE_TASKS_FAIL:
      return {
        ...state,
        editing: false,
        editSuccess: false
      };
    default:
      return state;
  }
}

export default {
  versions,
  chapters,
  topics,
  topicInfo,
  problems,
  hyperVideos,
  videoList,
  signVideo,
  tasks
};
