import React from 'react';
import classNames from 'classnames/bind';
import { hashHistory, Link } from 'react-router';
import { Row, Col, Button, Icon } from 'antd';

class ChapterList extends React.Component {
  static propTypes = {
    versions: React.PropTypes.object,
    chapters: React.PropTypes.object,
    getVersions: React.PropTypes.func,
    getChapters: React.PropTypes.func,
    createChapter: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      subject: 'math',
      semester: '七年级上',
      publisher: '人教版',
      chapterIndex: '-1',
      themeIndex: '-1'
    };
  }

  componentWillMount() {
    const { getVersions, getChapters } = this.props;
    const { subject, semester, publisher } = this.state;
    getVersions().then(() => {
      getChapters({ subject, semester, publisher });
    });
  }

  handleColClick = (param, event) => {
    event.preventDefault();
    const { subject, semester, publisher } = this.state;
    this.setState(param, () => {
      const sub = this.state.subject;
      const sem = this.state.semester;
      const pub = this.state.publisher;
      if (subject !== sub || semester !== sem || publisher !== pub) {
        this.setState({
          chapterIndex: '-1',
          themeIndex: '-1'
        });
        this.props.getChapters({
          subject: sub,
          semester: sem,
          publisher: pub
        });
      }
    });
  }

  handleCreateChapterClick = () => {
    const { subject, semester, publisher } = this.state;
    const order = this.props.chapters.data.length;
    this.props.createChapter({
      publisher,
      semester,
      subject,
      name: '新章节',
      status: 'unpublished',
      order: order + 1,
      includeCharges: false
    }).then(() => {
      hashHistory.push(`/chapter/${this.props.chapters.data[0][order]._id}`);
    });
  }

  render() {
    const { versions, chapters } = this.props;
    const { chapterIndex, themeIndex } = this.state;
    if (versions.loading || !versions.success || chapters.loading || !chapters.success) {
      return null;
    }
    return (
      <div>
        <Row>
          <Col span={4}>
            <div className="chapter-list-header">学科</div>
            {versions.data.subjects.map((subject, index) =>
              <div
                className={classNames('chapter-list-item', { active: subject === this.state.subject })}
                key={index}
                onClick={this.handleColClick.bind(this, { subject })}
              >
                {subject}
              </div>
            )}
          </Col>
          <Col span={4}>
            <div className="chapter-list-header">教材</div>
            {versions.data.cvs.map((publisher, index) =>
              <div
                className={classNames('chapter-list-item', { active: publisher === this.state.publisher })}
                key={index}
                onClick={this.handleColClick.bind(this, { publisher })}
              >
                {publisher}
              </div>
            )}
          </Col>
          <Col span={4}>
            <div className="chapter-list-header">年级</div>
            {versions.data.semesters.map((semester, index) =>
              <div
                className={classNames('chapter-list-item', { active: semester === this.state.semester })}
                key={index}
                onClick={this.handleColClick.bind(this, { semester })}
              >
                {semester}
              </div>
            )}
          </Col>
          <Col span={4}>
            <div className="chapter-list-header">
              章节
              <Button
                type="primary"
                onClick={this.handleCreateChapterClick}
              >
                创建章节
              </Button>
            </div>
            {chapters.data.map((chapter, index) =>
              <div
                className={classNames('chapter-list-item', { active: index === this.state.chapterIndex })}
                key={index}
                onClick={this.handleColClick.bind(this, { chapterIndex: index })}
              >
                {chapter.name}
                <Link to={`/chapter/${chapter._id}`} title="编辑"><Icon type="edit" /></Link>
              </div>
            )}
          </Col>
          <Col span={4}>
            <div className="chapter-list-header">主题</div>
            {chapterIndex !== '-1' && chapters.data[chapterIndex].themes.map((theme, index) =>
              <div
                className={classNames('chapter-list-item', { active: index === this.state.themeIndex })}
                key={index}
                onClick={this.handleColClick.bind(this, { themeIndex: index })}
              >
                {theme.name}
              </div>
            )}
          </Col>
          <Col span={4}>
            <div className="chapter-list-header">知识点</div>
            {themeIndex !== '-1' && chapters.data[0].themes[themeIndex].topics.map((topic, index) =>
              <div
                className="chapter-list-item"
                key={index}
              >
                {topic.name}
                <Link to={`/chapter/${chapters.data[chapterIndex]._id}/topic/${topic._id}`} title="编辑"><Icon type="edit" /></Link>
              </div>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

export default ChapterList;
