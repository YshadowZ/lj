/**
 * Created by zhaoyan on 2017/3/1.
 */
import React from 'react';
import { Button, Form, Select } from 'antd';
import objectId from '../../utils/objectId';
import SortableList from '../components/sortableList/container';
import InteractionContent from './InteractionContent';

class VideoInteractions extends React.Component {
  static propTypes = {
    interactions: React.PropTypes.array,
    onChange: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      activeIndex: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    // const { hyperVideo = {}, createSignVideo, videoList = {} } = nextProps;
    // const fields = {};
    // let videoInfo = [];
    // for (const [key, value] of Object.entries(hyperVideo)) {
    //   fields[key] = { value };
    // }
    // // videoInfo = videoList.data && videoList.data.length && videoList.data.filter((video) => video._id === hyperVideo._id);
    // // fields.videoName = videoInfo[0];
    // console.log('video', fields);
    // this.setState({ fields });
    // if (!signVideoFlag && hyperVideo.url && createSignVideo) {
    //   signVideoFlag = true;
    //   createSignVideo({ url: hyperVideo.url.pc.mp4_middle }).then(() => {
    //     fields.videoUrl = this.props.signVideo.data.url;
    //     this.setState({ fields });
    //   });
    // }
  }

  handleFormChange = (changedFields) => {
    const { interactions = [], onChange } = this.props;
    const { activeIndex } = this.state;
    const newInteractions = [...interactions];
    newInteractions[activeIndex] = changedFields;
    if (onChange) {
      onChange({ interactions: newInteractions });
    }
  }

  handleTabClick = (index) => {
    this.setState({ activeIndex: index });
  }

  handleAddClick = () => {
    const { interactions = [], onChange } = this.props;
    const newInteractions = [
      ...interactions,
      {
        _id: objectId(),
        time: 0,
        jump: 0,
        choices: [
          { body: 'A', correct: true },
          { body: 'B', correct: false },
          { body: 'C', correct: false },
          { body: 'D', correct: false }
        ]
      }
    ];
    if (onChange) {
      onChange({ interactions: newInteractions });
      this.setState({ activeIndex: newInteractions.length - 1 });
    }
  }

  handleDeleteClick = () => {
    const { interactions = [], onChange } = this.props;
    const { activeIndex } = this.state;
    const newInteractions = interactions.filter((interaction, index) => index !== activeIndex);
    if (onChange) {
      onChange({ interactions: newInteractions });
      this.setState({ activeIndex: activeIndex - 1 < 0 ? 0 : activeIndex - 1 });
    }
  }

  render() {
    const { interactions = [] } = this.props;
    const { activeIndex } = this.state;
    return (
      <div className="topic-list-interactions clearfix">
        <div>
          <Button onClick={this.handleAddClick}>添加交互点</Button>
          <Button onClick={this.handleDeleteClick}>删除交互点</Button>
        </div>
        <SortableList
          className="tab-bar"
          showField="time"
          list={interactions}
          activeIndex={activeIndex}
          onClick={this.handleTabClick}
        />
        <InteractionContent
          className="tab-content"
          interaction={interactions[activeIndex]}
          onChange={this.handleFormChange}
        />
      </div>
    );
  }
}

export default VideoInteractions;
