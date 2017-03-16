/**
 * Created by zhaoyan on 2017/3/2.
 */
import { connect } from 'react-redux';
import { getHyperVideos, updateHyperVideos, getVideoList, createSignVideo, getTasks, getChapters, updateTasks, createTasks } from '../../actions/chapterList';
import ShowView from './taskView';

const mapStateToProps = (state) => ({
  hyperVideos: state.hyperVideos,
  videoList: state.videoList,
  signVideo: state.signVideo,
  chapters: state.chapters,
  tasks: state.tasks
});

const mapDispatchToProps = (dispatch) => ({
  getHyperVideos: (param, tag) => dispatch(getHyperVideos(param, tag)),
  updateHyperVideos: (param, hyperVideoId) => dispatch(updateHyperVideos(param, hyperVideoId)),
  getVideoList: (param) => dispatch(getVideoList(param)),
  createSignVideo: (param) => dispatch(createSignVideo(param)),
  getChapters: (param, chapterId) => dispatch(getChapters(param, chapterId)),
  getTasks: (param, chapterId) => dispatch(getTasks(param, chapterId)),
  updateTasks: (param, taskId) => dispatch(updateTasks(param, taskId)),
  createTasks: (param, taskId) => dispatch(createTasks(param, taskId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowView);
