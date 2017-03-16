import React from 'react';
import { Input, Button, Form, Cascader, Switch, Select, Modal, message } from 'antd';
import { hashHistory } from 'react-router';
import ThemeList from './themeList';
import ThemeContent from './ThemeContent';
import objectId from '../../utils/objectId';

const FormItem = Form.Item;
const Option = Select.Option;
const confirm = Modal.confirm;

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="添加主题"
        okText="添加"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form vertical>
          <FormItem label="Title">
            {getFieldDecorator('title', {
              rules: [{ required: true, message: 'Please input the title of collection!' }]
            })(
              <Input placeholder="保存章节后才会添加成功" />
            )}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

class ChapterEdit extends React.Component {
  static propTypes = {
    params: React.PropTypes.object,
    chapters: React.PropTypes.object,
    versions: React.PropTypes.object,
    topics: React.PropTypes.object,
    getChapters: React.PropTypes.func,
    getVersions: React.PropTypes.func,
    updateChapter: React.PropTypes.func,
    deleteChapter: React.PropTypes.func,
    getTopics: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      cvsOptions: [],
      chapter: {},
      activeThemeIndex: 0,
      themeAddModalVisible: false,
      fields: {
        themeName: { value: '' },
        stageType: { value: 'normal' },
        descText: { value: '' },
        descImage: { value: '' },
        painPoint: { value: false },
        paidContent: { value: false },
        backgroundColor: { value: '' },
        unfinishedPng: { value: '' },
        unfinishedSvg: { value: '' },
        finishedPng: { value: '' },
        finishedSvg: { value: '' },
        goldenImage: { value: '' },
        level: { value: '' },
        relevancy: { value: '' },
        simpleUnlock: { value: [] },
        difficultUnlock: { value: [] },
        topicList: { value: [] },
        topics: { value: [] },
        selectedTopic: { value: undefined },
        selectedTopicSimple: { value: undefined },
        selectedTopicDifficult: { value: undefined },
        chapterTopics: { value: [] }, // 章节下所有主题添加的知识点
        themes: { value: [] }
      }
    };
  }

  componentWillMount() {
    const { getChapters, getVersions, getTopics, params: { chapterId } } = this.props;
    getChapters({ _id: chapterId }).then(() => {
      const { activeThemeIndex } = this.state;
      const chapter = this.props.chapters.data[0];
      const theme = chapter.themes[activeThemeIndex];
      const newThemes = [];
      let chapterTopics = [];
      chapter.themes.forEach((item) => {
        const topics = item.topics ? item.topics : [];
        chapterTopics = chapterTopics.concat(topics);
        if (!item.icons[0]) {
          item.icons = [{}, {}];
        }
        if (!item.icons[1]) {
          item.icons = [item.icons[0], {}];
        }
        newThemes.push(item);
      });
      // console.log('chapterTopics', chapterTopics);
      this.setState({
        chapter,
        fields: {
          ...this.state.fields,
          chapterTopics: {
            value: chapterTopics
          },
          themes: {
            value: newThemes
          }
        }
      });
      this.setActiveTheme(theme);
    });
    getVersions().then(() => {
      const { versions: { data } } = this.props;
      const subjects = [];
      const cvs = [];

      data.cvs.forEach((cv, index) => {
        cvs.push({
          value: cv,
          label: cv,
          children: []
        });
        data.semesters.forEach((semester) => {
          cvs[index].children.push({
            value: semester,
            label: semester
          });
        });
      });
      data.subjects.forEach((subject) => {
        subjects.push({
          value: subject,
          label: subject,
          children: cvs
        });
      });
      this.setState({
        cvsOptions: subjects
      });
    });
    getTopics().then(() => {
      this.setState({
        fields: {
          ...this.state.fields,
          topics: {
            value: this.props.topics.data
          }
        }
      });
    });
  }

  setActiveTheme = (theme) => {
    console.log('setActiveTheme', theme);
    this.setState({
      fields: {
        ...this.state.fields,
        themeName: { value: theme.name || '' },
        stageType: { value: theme.type || 'normal' },
        descText: { value: theme.desc.text || '' },
        descImage: { value: theme.desc.images[0] || '' },
        painPoint: { value: theme.hasPainPoint || false },
        paidContent: { value: theme.pay || false },
        backgroundColor: { value: (theme.icons[0] && theme.icons[0].background) || '' },
        unfinishedPng: { value: (theme.icons[0] && theme.icons[0].pic) || '' },
        unfinishedSvg: { value: (theme.icons[0] && theme.icons[0].svg) || '' },
        finishedPng: { value: (theme.icons[1] && theme.icons[1].pic) || '' },
        finishedSvg: { value: (theme.icons[1] && theme.icons[1].svg) || '' },
        goldenImage: { value: (theme.icons[1] && theme.icons[1].backgroundImg) || '' },
        level: { value: theme.target || '' },
        relevancy: { value: (theme.related && theme.related.name) || '' },
        simpleUnlock: { value: theme.simpleUnlockConditions || [] },
        difficultUnlock: { value: theme.difficultUnlockConditions || [] },
        topicList: { value: theme.topics || [] }
      }
    });
  }

  handleNameChange = (event) => {
    this.setState({
      chapter: {
        ...this.state.chapter,
        name: event.target.value
      }
    });
  }

  handleCVSChange = (value) => {
    this.setState({
      chapter: {
        ...this.state.chapter,
        subject: value[0],
        publisher: value[1],
        semester: value[2]
      }
    });
  }

  handleChargeChange = (value) => {
    this.setState({
      chapter: {
        ...this.state.chapter,
        includeCharges: value
      }
    });
  }

  showThemeAddModal = () => {
    this.setState({ themeAddModalVisible: true });
  }

  handleCancel = () => {
    this.setState({ themeAddModalVisible: false });
  }

  handleCreate = () => {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({
        themeAddModalVisible: false,
        chapter: {
          ...this.state.chapter,
          themes: [
            ...this.state.chapter.themes,
            {
              _id: objectId(),
              name: values.title,
              stage: '新阶段',
              pay: false,
              type: 'normal',
              topics: [],
              icons: [{}, {}],
              desc: {
                images: [],
                text: ''
              }
            }
          ]
        }
      });
    });
  }

  saveFormRef = (form) => {
    this.form = form;
  }

  chapterDeleteConfirm = () => {
    const { chapter } = this.state;
    confirm({
      title: '删除确认',
      content: `确定删除章节"${chapter.name}"?`,
      maskClosable: true,
      onOk: () => {
        this.handleChapterDelete(chapter._id);
      },
      onCancel() {}
    });
  }

  handleChapterDelete = (chapterId) => {
    this.props.deleteChapter(chapterId).then(() => {
      hashHistory.replace('/');
    });
  }

  themeDeleteConfirm = () => {
    const { chapter: { themes }, activeThemeIndex } = this.state;
    const name = themes[activeThemeIndex].name;
    confirm({
      title: '删除确认',
      content: `确定删除主题"${name}"? (保存章节后生效)`,
      maskClosable: true,
      onOk: () => {
        this.handleThemeDelete(activeThemeIndex);
      },
      onCancel() {}
    });
  }

  handleThemeDelete = (index) => {
    const themes = this.state.chapter.themes.filter((theme, i) => i !== index);
    this.setState({
      chapter: {
        ...this.state.chapter,
        themes
      }
    }, () => {
      console.log('handleThemeDelete', themes, this.state.chapter);
    });
  }

  handleThemeClick = (index) => {
    const theme = this.state.chapter.themes[index];
    this.setState({
      activeThemeIndex: index
    });
    this.setActiveTheme(theme);
    console.log(theme);
  }

  handleFormChange = (changedFields) => {
    console.log('changedFields', changedFields);
    const { fields, topics, chapter: { themes }, activeThemeIndex } = this.state;
    const key = Object.keys(changedFields)[0];
    const value = changedFields[key].value;
    switch (key) {
      case 'themeName':
        themes[activeThemeIndex].name = value;
        break;
      case 'stageType':
        themes[activeThemeIndex].type = value;
        break;
      case 'descText':
        themes[activeThemeIndex].desc.text = value;
        break;
      case 'descImage':
        themes[activeThemeIndex].desc.images[0] = value;
        break;
      case 'painPoint':
        themes[activeThemeIndex].hasPainPoint = value;
        break;
      case 'paidContent':
        themes[activeThemeIndex].pay = value;
        break;
      case 'backgroundColor':
        themes[activeThemeIndex].icons[0].background = value;
        break;
      case 'unfinishedPng':
        themes[activeThemeIndex].icons[0].pic = value;
        break;
      case 'unfinishedSvg':
        themes[activeThemeIndex].icons[0].svg = value;
        break;
      case 'finishedPng':
        themes[activeThemeIndex].icons[1].pic = value;
        break;
      case 'finishedSvg':
        themes[activeThemeIndex].icons[1].svg = value;
        break;
      case 'goldenImage':
        themes[activeThemeIndex].icons[1].backgroundImg = value;
        break;
      case 'level':
        themes[activeThemeIndex].target = value;
        break;
      case 'relevancy':
        const related = themes.find((theme) => theme._id === value)
        themes[activeThemeIndex].related = JSON.parse(JSON.stringify(related));
        // console.log('related', themes[activeThemeIndex].related);
        break;
      case 'simpleUnlock':
        themes[activeThemeIndex].simpleUnlockConditions = value;
        break;
      case 'difficultUnlock':
        themes[activeThemeIndex].difficultUnlockConditions = value;
        break;
      case 'topicList':
        themes[activeThemeIndex].topics = value;
        break;
      case 'selectedTopic':
        // console.log('1111', fields.topics.value[value.split('|')[1]]);
        fields.topicList.value = [
          ...fields.topicList.value,
          fields.topics.value[value.split('|')[1]]
        ];
        fields.chapterTopics.value = [
          ...fields.chapterTopics.value,
          fields.topics.value[value.split('|')[1]]
        ];
        themes[activeThemeIndex].topics = fields.topicList.value;
        break;
      case 'selectedTopicSimple':
        fields.simpleUnlock.value = [
          ...fields.simpleUnlock.value,
          fields.chapterTopics.value[value.split('|')[1]]
        ];
        themes[activeThemeIndex].simpleUnlockConditions = fields.simpleUnlock.value;
        break;
      case 'selectedTopicDifficult':
        fields.difficultUnlock.value = [
          ...fields.difficultUnlock.value,
          fields.chapterTopics.value[value.split('|')[1]]
        ];
        themes[activeThemeIndex].difficultUnlockConditions = fields.difficultUnlock.value;
        break;
      default:
        console.error('handleFormChange: key is not found.');
    }
    this.setState({
      fields: {
        ...fields,
        ...changedFields
      },
      chapter: {
        ...this.state.chapter,
        themes
      }
    }, () => {
      // console.log('newChapter', this.state.chapter);
    });
  }

  handleChapterSaveClick = () => {
    const { params: { chapterId }, updateChapter } = this.props;
    const chapter = this.state.chapter;
    if (chapter.themes && chapter.themes.length) {
      chapter.themes.forEach((theme) => {
        if (theme.icons) {
          if (theme.icons[0] && !theme.icons[0].flag) {
            theme.icons[0].flag = 'normal';
          }
          if (theme.icons[1] && !theme.icons[1].flag) {
            theme.icons[1].flag = 'perfect';
          }
          if (theme.icons[1]) {
            theme.icons[1].background = '#FBCF00';
          }
        }
        if (theme.topics && theme.topics.length) {
          const topicPainPoint = theme.topics.filter(topic => topic.painPoint);
          theme.hasPainPoint = !!topicPainPoint.length;
        }
        if (!theme.related) {
          theme.related = undefined;
        }
      });
    }
    updateChapter(chapter, chapterId).then(() => {
      message.success('章节保存成功');
    });
    console.log('save', chapter);
  }

  handleTaskClick = () => {
    hashHistory.push(`/task/${this.props.params.chapterId}`);
  }

  render() {
    const { chapter, activeThemeIndex, fields, cvsOptions } = this.state;
    return (
      <div>
        <Button onClick={this.handleTaskClick}>编辑任务</Button>
        <div>
          复制人教版章节：
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
            保存章节
          </Button>
          <Button onClick={this.chapterDeleteConfirm}>删除章节</Button>
        </div>
        <Form inline>
          <FormItem label="章节名称">
            <Input
              placeholder="章节名称"
              value={chapter.name}
              onChange={this.handleNameChange}
            />
          </FormItem>
          <FormItem label="教材信息">
            <Cascader
              style={{ width: 270 }}
              placeholder="学科 / 版本 / 年级"
              value={[chapter.subject, chapter.publisher, chapter.semester]}
              options={cvsOptions}
              onChange={this.handleCVSChange}
            />
          </FormItem>
          <FormItem label="是否含有收费内容">
            <Switch
              checkedChildren={'是'}
              unCheckedChildren={'否'}
              checked={chapter.includeCharges}
              onChange={this.handleChargeChange}
            />
          </FormItem>
        </Form>
        <h2>
          主题 {(chapter.themes && chapter.themes.length) ? chapter.themes[activeThemeIndex].name : ''}
          <Button onClick={this.showThemeAddModal}>添加主题</Button>
          <Button onClick={this.themeDeleteConfirm}>删除当前主题</Button>
        </h2>
        <div className="topic-list clearfix">
          <ThemeList
            themes={chapter.themes}
            activeIndex={activeThemeIndex}
            onClick={this.handleThemeClick}
          />
          <ThemeContent
            fields={fields}
            onChange={this.handleFormChange}
          />
        </div>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.themeAddModalVisible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </div>
    );
  }
}

export default ChapterEdit;
