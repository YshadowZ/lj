/**
 * Created by zhaoyan on 17/2/17.
 */
import React from 'react';
import { Input, InputNumber, Form, Button, Select } from 'antd';
import OptionsEditor from '../components/OptionsEditor';
import SortableList from '../components/sortableList/container';

const FormItem = Form.Item;
const Option = Select.Option;

const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    const { problems, activeIndex, chapterTopics, onChange } = props;
    let relatedTopicObj = [];
    for (const [key, value] of Object.entries(changedFields)) {
      if (key === 'relatedTopic') {
        relatedTopicObj = chapterTopics.value.filter((topic) => topic._id === value.value);
        problems[activeIndex][key] = relatedTopicObj[0];
      } else {
        problems[activeIndex][key] = value.value;
      }
    }
    // console.log('onFieldsChange', problems);
    onChange(problems);
  },
  mapPropsToFields(props) {
    // console.log('ccc', props);
    return props;
  },
  onValuesChange(_, values) {
    console.log('onValuesChange', values);
  }
})((props) => {
  // console.log('themeContent', props);
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 }
  };
  return (
    <Form
      horizontal
      style={{ float: 'left', width: '70%' }}
    >
      <FormItem
        label="题目类型"
        {...formItemLayout}
      >
        {getFieldDecorator('type')(
          <Select
            style={{ width: 120 }}
          >
            <Option value="blank">填空题</Option>
            <Option value="single">选择题</Option>
            <Option value="exam">大题</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        label="题干"
        {...formItemLayout}
      >
        {getFieldDecorator('body')(
          <Input
            style={{ width: 200 }}
            type="textarea"
            autosize={{ minRows: 2, maxRows: 6 }}
            placeholder="注意如果是填空题,题干里的空一定要保证是四个下划线____"
          />
        )}
      </FormItem>
      <FormItem
        label="选择题选项"
        {...formItemLayout}
      >
        {getFieldDecorator('choices')(
          <OptionsEditor
            radioGroup={true}
            options={props.choices && props.choices.value}
          />
        )}
      </FormItem>
      <FormItem
        label="填空题答案"
        {...formItemLayout}
      >
        {getFieldDecorator('blanks')(
          <OptionsEditor options={props.blanks && props.blanks.value} />
        )}
      </FormItem>
      <FormItem
        label="解析"
        {...formItemLayout}
      >
        {getFieldDecorator('explain')(
          <Input
            style={{ width: 200 }}
            type="textarea"
            autosize={{ minRows: 2, maxRows: 6 }}
          />
        )}
      </FormItem>
      <FormItem
        label="提示"
        {...formItemLayout}
      >
        {getFieldDecorator('prompts')(
          <OptionsEditor options={props.prompts && props.prompts.value} />
        )}
      </FormItem>
      <FormItem
        label="来源(大题专用)"
        {...formItemLayout}
      >
        {getFieldDecorator('source')(
          <Input />
        )}
      </FormItem>
      <FormItem
        label="难度"
        {...formItemLayout}
      >
        {getFieldDecorator('difficulty')(
          <InputNumber />
        )}
      </FormItem>
      <FormItem
        label="关联知识点"
        {...formItemLayout}
      >
        {getFieldDecorator('relatedTopic')(
          <Select
            style={{ width: 120 }}
            placeholder="允许删除"
            allowClear
          >
            {
              props.chapterTopics && props.chapterTopics.value.map((topic) => (
                <Option key={`${topic._id}${topic.name}`} value={`${topic._id}`}>{topic.name}</Option>
              ))
            }
          </Select>
        )}
      </FormItem>
    </Form>
  );
});

class Exercises extends React.Component {
  static propTypes = {
    problems: React.PropTypes.array,
    chapterTopics: React.PropTypes.array,
    onChange: React.PropTypes.func,
    updateProblems: React.PropTypes.func,
    chapterSave: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      fields: {},
      activeIndex: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const { problems = [] } = nextProps;
    const { activeIndex } = this.state;
    if (problems[activeIndex]) {
      this.setActiveProblem(problems[activeIndex]);
    }
  }

  setActiveProblem = (problem) => {
    const { chapterTopics } = this.props;
    const fields = {};
    for (const [key, value] of Object.entries(problem)) {
      if (key === 'relatedTopic') {
        fields[key] = { value: value ? value._id : undefined };
      } else {
        fields[key] = { value };
      }
    }
    fields.chapterTopics = { value: chapterTopics };
    this.setState({ fields });
  }

  handleTabClick = (index) => {
    const { problems = [] } = this.props;
    this.setState({ activeIndex: index });
    this.setActiveProblem(problems[index]);
  }

  handleSaveClick = () => {
    const { problems = [], updateProblems, chapterSave } = this.props;
    const { activeIndex } = this.state;
    const data = problems[activeIndex];
    const id = problems[activeIndex]._id;
    updateProblems(data, id);
    chapterSave();  // 保存练习同时需保存知识点
  }

  render() {
    const { problems = [], onChange } = this.props;
    const { fields, activeIndex } = this.state;
    // const problem = problems[activeIndex];
    // const fields = {};
    // if (problems[activeIndex]) {
    //   for (const [key, value] of Object.entries(problems[activeIndex])) {
    //     fields[key] = { value };
    //   }
    //   this.setState({
    //     ...fields
    //   });
    // }
    // console.log('problems', problem);
    return (
      <div>
        <div>
          <Button
            type="primary"
            onClick={this.handleSaveClick}
          >
            保存当前题目
          </Button>
          <Button>删除题目</Button>
          <Button>添加题目</Button>
        </div>
        <SortableList
          className="tab-bar"
          showField="body"
          list={problems}
          activeIndex={activeIndex}
          onClick={this.handleTabClick}
        />
        <CustomizedForm
          {...fields}
          problems={problems}
          activeIndex={activeIndex}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default Exercises;
