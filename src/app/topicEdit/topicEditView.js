/**
 * Created by zhaoyan on 17/1/17.
 */
import React from 'react';
import { Input, Button, Form, Cascader, Switch, Select, Modal, message } from 'antd';
import TopicPart from './topicPart';
import VideoPart from './VideoPart';
import PracticePart from './PracticePart';

class TopicEdit extends React.Component {
  static propTypes = {
    chapters: React.PropTypes.object,
    topicInfo: React.PropTypes.object,
    params: React.PropTypes.object,
    videoList: React.PropTypes.object,
    signVideo: React.PropTypes.object,
    getChapters: React.PropTypes.func,
    getTopicInfo: React.PropTypes.func,
    getVideoList: React.PropTypes.func,
    updateTopicInfo: React.PropTypes.func,
    updateProblems: React.PropTypes.func,
    updateHyperVideos: React.PropTypes.func,
    createSignVideo: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      chapterTopics: [],
      topicInfo: {},
      videoList: []
    };
  }

  componentWillMount() {
    const { getChapters, getTopicInfo, getVideoList, params: { chapterId, topicId } } = this.props;
    getChapters({ _id: chapterId }).then(() => {
      const chapter = this.props.chapters.data[0];
      let chapterTopics = [];
      chapter.themes.forEach((item) => {
        const topics = item.topics ? item.topics : [];
        chapterTopics = chapterTopics.concat(topics);
      });
      this.setState({
        chapterTopics
      });
    });
    getTopicInfo({ _id: topicId }).then(() => {
      this.setState({
        topicInfo: this.props.topicInfo
      });
    });
    getVideoList().then(() => {
      this.setState({
        videoList: this.props.videoList.data
      });
    });
  }

  handleChapterSaveClick = () => {
    const { updateTopicInfo, params: { topicId } } = this.props;
    const { topicInfo: { data }, chapterTopics } = this.state;
    if (data.relatedTopic) {
      const topic = chapterTopics.filter((chapterTopic) => (
        chapterTopic._id === data.relatedTopic
      ));
      data.relatedTopic = topic[0];
    }
    updateTopicInfo(data, topicId);
  }

  handleLevelsChange = ({ index, key, value }) => {
    const newTopicInfo = { ...this.state.topicInfo.data };
    if (key === 'problems') {
      newTopicInfo.practice.levels[index].problems = value;
    }
    if (key === 'levels') {
      newTopicInfo.practice.levels = value;
    }
    console.log('handleLevelsChange', newTopicInfo);
    this.setState({
      topicInfo: {
        data: newTopicInfo
      }
    });
  }

  handleHyperVideoChange = (changeField) => {
    const newHyperVideo = {
      ...this.state.topicInfo.data.hyperVideo,
      ...changeField
    };
    console.log('handleHyperVideoChange', newHyperVideo);
    this.setState({
      topicInfo: {
        data: {
          ...this.state.topicInfo.data,
          hyperVideo: newHyperVideo
        }
      }
    });
  }

  handleTopicChange = (changeField) => {
    const newTopic = {
      ...this.state.topicInfo.data,
      ...changeField
    };
    console.log('handleTopicChange', newTopic);
    this.setState({
      topicInfo: {
        data: newTopic
      }
    });
  }

  handlePracticeNameChange = (event) => {
    const { topicInfo: { data } } = this.state;
    data.practice.name = event.target.value;
    this.setState({
      topicInfo: { data }
    });
  }

  render() {
    const { updateProblems, updateHyperVideos, createSignVideo, signVideo } = this.props;
    const { topicInfo: { data = {} }, chapterTopics, videoList } = this.state;
    return (
      <div>
        <div>
          复制知识点:
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={this.handleChange}
            filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
          <Button
            type="primary"
            onClick={this.handleChapterSaveClick}
          >
            保存知识点
          </Button>
          <Button onClick={this.chapterDeleteConfirm}>删除知识点</Button>
        </div>
        <p>(复制的知识点的id不与原知识点相同,关联的知识点会清空,修改已有的题目和视频会同时修改原知识点, 新增题目和视频不会影响原有知识点)</p>
        <TopicPart
          topic={data}
          chapterTopics={chapterTopics}
          onChange={this.handleTopicChange}
        />
        <h2>交互视频</h2>
        <VideoPart
          hyperVideo={data.hyperVideo}
          videoList={videoList}
          signVideo={signVideo}
          onSave={this.handleChapterSaveClick}
          onChange={this.handleHyperVideoChange}
          updateHyperVideos={updateHyperVideos}
          createSignVideo={createSignVideo}
        />
        <h2>练习模块</h2>
        <div>
          练习名称:
          <Input
            value={data.practice && data.practice.name}
            onChange={this.handlePracticeNameChange}
          />
        </div>
        <PracticePart
          levels={data.practice && data.practice.levels}
          chapterTopics={chapterTopics}
          updateProblems={updateProblems}
          chapterSave={this.handleChapterSaveClick}
          onChange={this.handleLevelsChange}
        />
      </div>
    );
  }
}

export default TopicEdit;
