/**
 * Created by zhaoyan on 2017/3/2.
 */
import { connect } from 'react-redux';
import { getHyperVideos, updateHyperVideos, getVideoList, createSignVideo } from '../../actions/chapterList';
import ShowView from './showView';

const mapStateToProps = (state) => ({
  hyperVideos: state.hyperVideos,
  videoList: state.videoList,
  signVideo: state.signVideo
});

const mapDispatchToProps = (dispatch) => ({
  getHyperVideos: (param, tag) => dispatch(getHyperVideos(param, tag)),
  updateHyperVideos: (param, hyperVideoId) => dispatch(updateHyperVideos(param, hyperVideoId)),
  getVideoList: (param) => dispatch(getVideoList(param)),
  createSignVideo: (param) => dispatch(createSignVideo(param))
});

export default connect(mapStateToProps, mapDispatchToProps)(ShowView);
