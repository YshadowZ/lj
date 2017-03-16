/**
 * Created by zhaoyan on 17/2/16.
 */
import React from 'react';
import { Button } from 'antd';
// import LevelList from './levelList';
import SortableList from '../components/sortableList/container';
import LevelContent from './levelContent';

class PracticePart extends React.Component {
  static propTypes = {
    levels: React.PropTypes.array,
    onClick: React.PropTypes.func,
    onChange: React.PropTypes.func,
    chapterTopics: React.PropTypes.array,
    updateProblems: React.PropTypes.func,
    chapterSave: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const { levels = [] } = nextProps;
    const { activeIndex } = this.state;
    if (levels[activeIndex]) {
      this.setActiveLevel(levels[activeIndex]);
    }
  }

  setActiveLevel = (level) => {
    const fields = {};
    for (const [key, value] of Object.entries(level)) {
      fields[key] = { value };
    }
    // console.log('setActiveLevel', fields);
    this.setState({ fields });
  }

  handleTabClick = (index) => {
    this.setState({ activeIndex: index });
  }

  handleSaveClick = () => {
    this.props.chapterSave();
  }

  render() {
    const { levels = [], chapterTopics = [], updateProblems = () => {}, onChange = () => {}, chapterSave = () => {} } = this.props;
    const { activeIndex } = this.state;
    return (
      <div className="topic-list-practice clearfix">
        <div>
          <Button
            type="primary"
            onClick={this.handleSaveClick}
          >
            保存层
          </Button>
          <Button>删除层</Button>
          <Button>添加层</Button>
        </div>
        <SortableList
          className="tab-bar"
          showField="pool"
          list={levels}
          activeIndex={activeIndex}
          onClick={this.handleTabClick}
        />
        <LevelContent
          levels={levels}
          levelIndex={activeIndex}
          chapterTopics={chapterTopics}
          updateProblems={updateProblems}
          chapterSave={chapterSave}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default PracticePart;
