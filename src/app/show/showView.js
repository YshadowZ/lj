/**
 * Created by zhaoyan on 2017/3/2.
 */
import React from 'react';
import SortableList from '../components/sortableList/container';
import VideoPart from '../topicEdit/VideoPart';
// import PracticePart from './PracticePart';

class Show extends React.Component {
  static propTypes = {
    chapters: React.PropTypes.object,
    hyperVideos: React.PropTypes.object,
    topicInfo: React.PropTypes.object,
    params: React.PropTypes.object,
    videoList: React.PropTypes.object,
    signVideo: React.PropTypes.object,
    getChapters: React.PropTypes.func,
    getTopicInfo: React.PropTypes.func,
    getVideoList: React.PropTypes.func,
    updateTopicInfo: React.PropTypes.func,
    updateProblems: React.PropTypes.func,
    getHyperVideos: React.PropTypes.func,
    updateHyperVideos: React.PropTypes.func,
    createSignVideo: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      hyperVideos: []
    };
  }

  componentWillMount() {
    const { getHyperVideos, getVideoList, params: { chapterId, topicId } } = this.props;
    getHyperVideos('?tag=show').then(() => {
      this.setState({
        hyperVideos: this.props.hyperVideos.data
      });
    });
    getVideoList().then(() => {
      // this.setState({
      //   videoList: this.props.videoList.data
      // });
    });
  }

  handleChapterSaveClick = () => {
    const { params: { topicId } } = this.props;
    const { topicInfo: { data } } = this.state;
  }

  handleHyperVideoChange = (changeField) => {
    console.log(changeField);
    const newHyperVideos = [...this.state.hyperVideos];
    const { activeIndex } = this.state;
    newHyperVideos[activeIndex] = changeField;
    // console.log('handleHyperVideoChange', newHyperVideos);
    this.setState({ hyperVideos: newHyperVideos });
  }

  handleTabClick = (index) => {
    this.setState({ activeIndex: index });
  }

  render() {
    const { videoList, createSignVideo, signVideo, updateHyperVideos } = this.props;
    const { hyperVideos, activeIndex } = this.state;
    return (
      <div className="show-list clearfix">
        <SortableList
          className="tab-bar"
          showField="name"
          list={hyperVideos}
          activeIndex={activeIndex}
          onClick={this.handleTabClick}
        />
        <VideoPart
          className="tab-content"
          hyperVideo={hyperVideos[activeIndex]}
          videoList={videoList.data}
          signVideo={signVideo}
          onSave={this.handleChapterSaveClick}
          onChange={this.handleHyperVideoChange}
          updateHyperVideos={updateHyperVideos}
          createSignVideo={createSignVideo}
        />
      </div>
    );
  }
}

export default Show;
