/**
 * Created by zhaoyan on 2017/3/2.
 */
import React from 'react';
import { Button, Select } from 'antd';
import SortableList from '../components/sortableList/container';
import VideoPart from '../topicEdit/VideoPart';

const Option = Select.Option;

class Task extends React.Component {
  static propTypes = {
    tasks: React.PropTypes.object,
    hyperVideos: React.PropTypes.object,
    topicInfo: React.PropTypes.object,
    params: React.PropTypes.object,
    videoList: React.PropTypes.object,
    signVideo: React.PropTypes.object,
    getTasks: React.PropTypes.func,
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
      tasks: [],
      videoList: [],
      chapterTopics: [],
      chapterExams: []
    };
  }

  componentWillMount() {
    const { getChapters, getTasks, getVideoList, params: { chapterId } } = this.props;
    getChapters({ _id: chapterId }).then(() => {
      const chapter = this.props.chapters.data[0];
      let chapterTopics = [];
      let chapterExams = [];
      chapter.themes.forEach((item) => {
        const topics = item.topics ? item.topics : [];
        chapterTopics = chapterTopics.concat(topics);
        if (item.type === 'exam') {
          chapterExams.push(item);
        }
      });
      this.setState({ chapterTopics, chapterExams }, () => {
        // console.log('will', this.state);
      });
    });
    getTasks(chapterId).then(() => {
      const { tasks: { data = [] } } = this.props;
      const tasks = data;
      if (!tasks.length) {
        for (let i = 0; i < 5; i++) {
          tasks.push({
            chapterId,
            name: '',
            no: i + 1,
            type: i===4 ? 'exam' : 'common',
            simpleTopics: [],
            difficultTopics: []
          })
        }
      }
      this.setState({ tasks });
    });
    getVideoList().then(() => {
      this.setState({
        videoList: this.props.videoList.data
      });
    });
  }

  handleSelectChange = (key, value) => {
    const { tasks, activeIndex, chapterTopics, chapterExams } = this.state;
    const newTasks = [...tasks];
    if (key === 'exams') {
      newTasks[activeIndex][key] = value.map((item) => {
        const exams = chapterExams.filter((topic) => topic._id === item);
        return exams[0];
      });
    } else {
      newTasks[activeIndex][key] = value.map((item) => {
        const topics = chapterTopics.filter((topic) => topic._id === item);
        return topics[0];
      });
    }
    this.setState({ tasks: newTasks }, () => {
      console.log(this.state.tasks);
    });
  }

  handleHyperVideoChange = (changeField) => {
    const { tasks, activeIndex } = this.state;
    const newTask = [...tasks];
    console.log(tasks[activeIndex].guideVideo, changeField);
    newTask[activeIndex].guideVideo = changeField;
    this.setState({ tasks: newTask });
  }

  handleTabClick = (index) => {
    this.setState({ activeIndex: index });
  }

  handleSaveClick = () => {
    const { updateTasks, createTasks } = this.props;
    const { tasks } = this.state;
    tasks.forEach((task) => {
      if (task._id) {
        updateTasks(task, task._id);
      } else {
        createTasks(task);
      }
    });
  }

  render() {
    const { videoList, createSignVideo, signVideo, updateHyperVideos } = this.props;
    const { tasks, hyperVideos, activeIndex, chapterTopics, chapterExams } = this.state;
    const task = tasks[activeIndex] || {};
    const simpleTopics = task.simpleTopics && task.simpleTopics.length ? task.simpleTopics.map((topic) => topic._id) : [];
    const difficultTopics = task.difficultTopics && task.difficultTopics.length ? task.difficultTopics.map((topic) => topic._id) : [];
    const exams = task.exams && task.exams.length ? task.exams.map((exam) => exam._id) : [];
    return (
      <div className="show-list clearfix">
        <div>
          <Button onClick={this.handleSaveClick}>保存任务</Button>
        </div>
        <SortableList
          className="tab-bar"
          showField="no"
          list={tasks}
          activeIndex={activeIndex}
          onClick={this.handleTabClick}
        />
        <div className="tab-content">
          <VideoPart
            hyperVideo={task.guideVideo}
            videoList={videoList.data}
            signVideo={signVideo}
            onSave={this.handleChapterSaveClick}
            onChange={this.handleHyperVideoChange}
            updateHyperVideos={updateHyperVideos}
            createSignVideo={createSignVideo}
          />
          <div>
            简单知识点:
            <Select
              style={{ width: '50%' }}
              value={simpleTopics}
              onChange={this.handleSelectChange.bind(this, 'simpleTopics')}
              multiple
            >
              {
                chapterTopics.map((topic, index) => (
                  <Option key={`${topic._id}${index}`} value={topic._id}>{topic.name}</Option>
                ))
              }
            </Select>
          </div>
          <div>
            复杂知识点:
            <Select
              style={{ width: '50%' }}
              value={difficultTopics}
              onChange={this.handleSelectChange.bind(this, 'difficultTopics')}
              multiple
            >
              {
                chapterTopics.map((topic, index) => (
                  <Option key={`${topic._id}${index}`} value={topic._id}>{topic.name}</Option>
                ))
              }
            </Select>
          </div>
          <div>
            章节检测:
            <Select
              style={{ width: '50%' }}
              value={exams}
              onChange={this.handleSelectChange.bind(this, 'exams')}
              multiple
            >
              {
                chapterExams.map((topic, index) => (
                  <Option key={`${topic._id}${index}`} value={topic._id}>{topic.name}</Option>
                ))
              }
            </Select>
          </div>
        </div>
      </div>
    );
  }
}

export default Task;
