/**
 * Created by zhaoyan on 2017/3/1.
 */
import React from 'react';
import { TimePicker, Button, Form } from 'antd';
import moment from 'moment';
import OptionsEditor from '../components/OptionsEditor';

const FormItem = Form.Item;
const format = 'mm:ss';

const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    const { onChange } = props;
    let timeArray = [];
    for (const [key, data] of Object.entries(changedFields)) {
      switch (key) {
        case 'time':
        case 'jump':
          timeArray = data.value.toArray();
          changedFields[key] = (timeArray[4] * 60) + timeArray[5]; // 秒数 = 分 + 秒
          break;
        default:
          changedFields[key] = data.value;
      }
    }
    if (onChange) {
      onChange(changedFields);
    }
  },
  mapPropsToFields(props) {
    return props;
  },
  onValuesChange(_, values) {
    console.log(values);
  }
})((props) => {
  // console.log('AAAAAAA', props);
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 }
  };
  return (
    <Form horizontal>
      <FormItem
        label="出现时刻"
        {...formItemLayout}
      >
        {getFieldDecorator('time')(
          <TimePicker format={format} />
        )}
      </FormItem>
      <FormItem
        label="跳转到时间"
        {...formItemLayout}
      >
        {getFieldDecorator('jump')(
          <TimePicker format={format} />
        )}
      </FormItem>
      <FormItem
        label="选项"
        {...formItemLayout}
      >
        {getFieldDecorator('choices')(
          <OptionsEditor
            options={props.choices && props.choices.value}
            radioGroup
          />
        )}
      </FormItem>
    </Form>
  );
});

class InteractionContent extends React.Component {
  static propTypes = {
    interaction: React.PropTypes.object,
    className: React.PropTypes.string,
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
    const { interaction = {} } = nextProps;
    const fields = {};
    let minute = 0;
    let second = 0;
    for (const [key, value] of Object.entries(interaction)) {
      switch (key) {
        case 'time':
        case 'jump':
          minute = Math.floor(value / 60);
          second = (value % 60).toFixed(0);
          fields[key] = { value: moment(`${minute}:${second}`, format) };
          break;
        default:
          fields[key] = { value };
      }
    }
    this.setState({ fields });
  }

  handleFormChange = (changedFields) => {
    const { interaction = {}, onChange } = this.props;
    const newInteraction = {
      ...interaction,
      ...changedFields
    }
    // console.log('InteractionContentChange', newInteraction);
    if (onChange) {
      onChange(newInteraction);
    }
  }

  render() {
    const { className } = this.props;
    const { fields } = this.state;
    return (
      <div className={className}>
        <CustomizedForm
          {...fields}
          onChange={this.handleFormChange}
        />
      </div>
    );
  }
}

export default InteractionContent;
