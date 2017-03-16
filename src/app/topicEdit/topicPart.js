/**
 * Created by zhaoyan on 17/2/16.
 */
import React from 'react';
import { Input, Button, Form, Cascader, Switch, Select, Modal, message } from 'antd';
import PicturesWall from '../components/picturesWall';

const FormItem = Form.Item;
const Option = Select.Option;
const skills = [
  // 数学抽象
  { _id: 1, name: '代数表达', related: 1 },
  { _id: 2, name: '几何表达', related: 1 },
  { _id: 3, name: '代数几何转化', related: 1 },
  // 直观想象
  { _id: 4, name: '空间想象', related: 2 },
  { _id: 5, name: '图象阅读', related: 2 },
  { _id: 6, name: '识别基本图形', related: 2 },
  // 数据分析
  { _id: 7, name: '信息处理', related: 3 },
  { _id: 8, name: '分析数据', related: 3 },
  { _id: 9, name: '分析概率', related: 3 },
  // 数学运算
  { _id: 10, name: '运算能力', related: 4 },
  { _id: 11, name: '代数变形', related: 4 },
  { _id: 12, name: '应用性质', related: 4 },
  { _id: 13, name: '寻找最优解法', related: 4 },
  // 逻辑推理
  { _id: 14, name: '识别定义', related: 5 },
  { _id: 15, name: '构造图形', related: 5 },
  { _id: 16, name: '作图能力', related: 5 },
  { _id: 17, name: '计数能力', related: 5 },
  { _id: 18, name: '分类讨论', related: 5 },
  { _id: 19, name: '应用基本图形', related: 5 },
  { _id: 20, name: '因果逻辑判断', related: 5 },
  { _id: 21, name: '几何关系转化', related: 5 },
  // 数学建模
  { _id: 22, name: '识别规律', related: 6 },
  { _id: 23, name: '识别数量关系', related: 6 }
];

const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    const { chapterTopics, onChange } = props;
    const fields = {};
    let relatedTopicObj = [];
    for (const [key, data] of Object.entries(changedFields)) {
      switch (key) {
        case 'status':
          fields[key] = data.value ? 'published' : 'unpublished';
          break;
        case 'skills':
          fields[key] = data.value.map((numberString) => Number(numberString));
          break;
        case 'related':
          relatedTopicObj = chapterTopics.value.filter((topic) => topic._id === data.value);
          fields[key] = relatedTopicObj;
          break;
        default:
          fields[key] = data.value;
      }
    }
    onChange(fields);
  },
  mapPropsToFields(props) {
    return props;
  },
  onValuesChange(_, values) {
    console.log(values);
  }
})((props) => {
  // console.log('form', props.thumbnail);
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 }
  };
  return (
    <Form horizontal>
      <FormItem
        label="知识点名称"
        {...formItemLayout}
      >
        {getFieldDecorator('name')(
          <Input
            placeholder="知识点名称"
          />
        )}
      </FormItem>
      <FormItem
        label="知识点类型"
        {...formItemLayout}
      >
        {getFieldDecorator('type')(
          <Select
            style={{ width: 120 }}
          >
            <Option value="A">A</Option>
            <Option value="B">B</Option>
            <Option value="C">C</Option>
            <Option value="D">D</Option>
            <Option value="E">E</Option>
            <Option value="I">I</Option>
            <Option value="S">S</Option>
            <Option value="jyfs">举一反三</Option>
            <Option value="dtsz">大题实战</Option>
            <Option value="chapter_exam">章节检测</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        label="是否收费"
        {...formItemLayout}
      >
        {getFieldDecorator('pay', {
          valuePropName: 'checked'
        })(
          <Switch
            checkedChildren={'是'}
            unCheckedChildren={'否'}
          />
        )}
      </FormItem>
      <FormItem
        label="是否发布"
        {...formItemLayout}
      >
        {getFieldDecorator('status', {
          valuePropName: 'checked'
        })(
          <Switch
            checkedChildren={'是'}
            unCheckedChildren={'否'}
          />
        )}
      </FormItem>
      <FormItem
        label="是否是核心考点"
        {...formItemLayout}
      >
        {getFieldDecorator('keyPoint', {
          valuePropName: 'checked'
        })(
          <Switch
            checkedChildren={'是'}
            unCheckedChildren={'否'}
          />
        )}
      </FormItem>
      <FormItem
        label="核心考点封面图标(png)"
        {...formItemLayout}
      >
        {getFieldDecorator('coverPic')(
          <PicturesWall
            style={{ width: 300, height: 100 }}
            fileList={(props.coverPic && props.coverPic.value) ? [{
              uid: -1,
              url: props.coverPic.value
            }] : []}
          />
        )}
      </FormItem>
      <FormItem
        label="痛点"
        {...formItemLayout}
      >
        {getFieldDecorator('painPoint')(
          <Select
            style={{ width: 120 }}
            allowClear
          >
            <Option value="big">big</Option>
            <Option value="small">small</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        label="技能点"
        {...formItemLayout}
      >
        {getFieldDecorator('skills')(
          <Select
            multiple
          >
            {
              skills.map((skill, index) => (
                <Option key={`${skill._id}${index}`} value={`${skill._id}`}>{skill.name}</Option>
              ))
            }
          </Select>
        )}
      </FormItem>
      <FormItem
        label="关联知识点"
        {...formItemLayout}
      >
        {getFieldDecorator('related')(
          <Select
            style={{ width: 120 }}
          >
            {
              props.chapterTopics && props.chapterTopics.value.map((topic) => (
                <Option key={`${topic._id}${topic.name}`} value={`${topic._id}`}>{topic.name}</Option>
              ))
            }
          </Select>
        )}
      </FormItem>
      <FormItem
        label="知识点描述"
        {...formItemLayout}
      >
        {getFieldDecorator('desc')(
          <Input
            style={{ width: 200 }}
            type="textarea"
            autosize={{ minRows: 2, maxRows: 6 }}
          />
        )}
      </FormItem>
    </Form>
  );
});

class TopicPart extends React.Component {
  static propTypes = {
    topic: React.PropTypes.object,
    chapterTopics: React.PropTypes.array,
    onChange: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      fields: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const { topic = {}, chapterTopics = [] } = nextProps;
    const fields = {};
    for (const [key, value] of Object.entries(topic)) {
      if (key === 'skills') {
        fields[key] = { value: value.map((number) => number.toString()) };
      } else if (key === 'status') {
        fields[key] = { value: value === 'published' };
      } else if (key === 'related') {
        fields[key] = { value: value.length ? value[0]._id : undefined };
      } else {
        fields[key] = { value };
      }
    }
    fields.chapterTopics = { value: chapterTopics };
    // console.log('topic', fields);
    this.setState({ fields });
  }

  handleFormChange = (changedFields) => {
    const { topic = {}, onChange } = this.props;
    const newTopic = {
      ...topic,
      ...changedFields
    }
    console.log(newTopic);
    if (onChange) {
      onChange(newTopic);
    }
  }

  render() {
    const { fields } = this.state;
    return (
      <CustomizedForm
        {...fields}

        onChange={this.handleFormChange}
      />
    );
  }
}

export default TopicPart;
