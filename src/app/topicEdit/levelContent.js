/**
 * Created by zhaoyan on 17/2/16.
 */
import React from 'react';
import { Select, Form, Input } from 'antd';
import Exercises from './Exercises';

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
    const { onChange } = props;
    const fields = {};
    for (const [key, data] of Object.entries(changedFields)) {
      switch (key) {
        case 'score':
          fields[key] = Number(data.value);
          break;
        case 'flag':
          fields[key] = {
            special: {
              flag: data.value
            }
          };
          break;
        case 'skills':
          fields[key] = data.value.map((numberString) => Number(numberString));
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
  // console.log('form', props);
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 }
  };
  return (
    <Form horizontal>
      <FormItem
        label="分数"
        {...formItemLayout}
      >
        {getFieldDecorator('score')(
          <Input
            style={{ width: 200 }}
          />
        )}
      </FormItem>
      <FormItem
        label="类型"
        {...formItemLayout}
      >
        {getFieldDecorator('flag')(
          <Select
            style={{ width: 120 }}
          >
            <Option value="normal">普通</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        label="池子"
        {...formItemLayout}
      >
        {getFieldDecorator('pool')(
          <Select
            style={{ width: 120 }}
          >
            <Option value="step">step</Option>
            <Option value="target">target</Option>
            <Option value="extend">extend</Option>
            <Option value="hanger">hanger</Option>
            <Option value="exam">exam</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        label="标签"
        {...formItemLayout}
      >
        {getFieldDecorator('tags')(
          <Select
            multiple
          >
            <Option value="continuity">continuity</Option>
            <Option value="noncontinuity">noncontinuity</Option>
            <Option value="optional">optional</Option>
            <Option value="variant">variant</Option>
            <Option value="hard">hard</Option>
            <Option value="hard_variant">hard_variant</Option>
            <Option value="internal_migration">internal_migration</Option>
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
    </Form>
  );
});

class LevelContent extends React.Component {
  static propTypes = {
    levels: React.PropTypes.array,
    levelIndex: React.PropTypes.number,
    onChange: React.PropTypes.func,
    chapterTopics: React.PropTypes.array,
    updateProblems: React.PropTypes.func,
    chapterSave: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      fields: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    const { levels = [], levelIndex } = nextProps;
    if (levels[levelIndex]) {
      const fields = {};
      for (const [key, value] of Object.entries(levels[levelIndex])) {
        if (key === 'special') {
          fields.flag = { value: value.flag };
        } else if (key === 'skills') {
          fields[key] = { value: value.map((number) => number.toString()) };
        } else {
          fields[key] = { value };
        }
      }
      // console.log('setActiveLevel', fields);
      this.setState({ fields });
    }
  }

  handleFormChange = (value) => {
    console.log('onChange', value);
    const { onChange } = this.props;
    const { levels = [], levelIndex = 0 } = this.props;
    levels[levelIndex] = {
      ...levels[levelIndex],
      ...value
    }
    if (onChange) {
      onChange({
        key: 'levels',
        value: levels
      });
    }
  }

  handleExercisesChange = (newProblems) => {
    const { onChange } = this.props;
    const { activeIndex } = this.state;
    // console.log('handleExercisesChange', newProblems);
    if (onChange) {
      onChange({
        index: activeIndex,
        key: 'problems',
        value: newProblems
      });
    }
  }

  render() {
    const { levels = [], levelIndex = 0, chapterTopics, updateProblems, chapterSave } = this.props;
    const { fields } = this.state;
    // console.log('fields', fields);
    return (
      <div className="tab-content">
        <h3>层</h3>
        <CustomizedForm
          {...fields}
          level={levels[levelIndex]}
          onChange={this.handleFormChange}
        />
        <h3>
          练习题
        </h3>
        <Exercises
          problems={levels[levelIndex] && levels[levelIndex].problems}
          chapterTopics={chapterTopics}
          onChange={this.handleExercisesChange}
          updateProblems={updateProblems}
          chapterSave={chapterSave}
        />
      </div>
    );
  }
}

export default LevelContent;

//   'continuity', // 程序性
//   'noncontinuity', // 非程序性
//   'optional', // 选做
//   'variant', // 变体
//   'hard', // 加难
//   'hard_variant', // 加难变体
//   'internal_migration' // 内迁移
