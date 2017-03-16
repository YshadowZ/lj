/**
 * Created by zhaoyan on 17/2/17.
 */
import { connect } from 'react-redux';
import { getChapters, getTopicInfo, updateTopicInfo, updateProblems, updateHyperVideos, getVideoList, createSignVideo } from '../../actions/chapterList';
import TopicEditView from './topicEditView';

const mapStateToProps = (state) => ({
  chapters: state.chapters,
  topicInfo: state.topicInfo,
  hyperVideos: state.hyperVideos,
  videoList: state.videoList,
  signVideo: state.signVideo
});

const mapDispatchToProps = (dispatch) => ({
  getChapters: (param) => dispatch(getChapters(param)),
  getTopicInfo: (param) => dispatch(getTopicInfo(param)),
  updateTopicInfo: (param, topicId) => dispatch(updateTopicInfo(param, topicId)),
  updateProblems: (param, problemId) => dispatch(updateProblems(param, problemId)),
  updateHyperVideos: (param, hyperVideoId) => dispatch(updateHyperVideos(param, hyperVideoId)),
  getVideoList: (param) => dispatch(getVideoList(param)),
  createSignVideo: (param) => dispatch(createSignVideo(param))
});

export default connect(mapStateToProps, mapDispatchToProps)(TopicEditView);
