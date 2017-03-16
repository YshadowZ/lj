/**
 * Created by zhaoyan on 17/2/16.
 */
import React from 'react';
import { Button, Radio, Input } from 'antd';

const RadioGroup = Radio.Group;

class OptionsEditor extends React.Component {
  static propTypes = {
    options: React.PropTypes.array,
    onChange: React.PropTypes.func,
    radioGroup: React.PropTypes.bool
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      options: []   // { body: String, correct: Boolean } or String
    };
  }

  componentWillReceiveProps(nextProps) {
    const fields = {};
    if (this.props.radioGroup && nextProps.options) {
      nextProps.options.forEach((option, index) => {
        if (option.correct === true) {
          fields.value = index;
        }
      });
    }
    this.setState({
      options: nextProps.value,
      ...fields
    });
  }

  handleRadioChange = (e) => {
    const { onChange } = this.props;
    const index = e.target.value;
    const newOptions = this.state.options.map((option, i) => {
      if (i === index) {
        option.correct = true;
      }
      if (i === this.state.value) {
        option.correct = false;
      }
      return option;
    });
    this.setState({
      value: index,
      options: newOptions
    });
    if (onChange) {
      onChange(newOptions);
    }
  }

  handleInputChange = (index, e) => {
    const { onChange } = this.props;
    const value = e.target.value;
    const newOptions = this.state.options.map((option, i) => {
      if (i === index) {
        if (this.props.radioGroup) {
          option.body = value;
        } else {
          option = value;
        }
      }
      return option;
    });
    if (onChange) {
      onChange(newOptions);
    }
  }

  handleAddClick = () => {
    const { onChange } = this.props;
    const newOptions = [...this.state.options];
    if (this.props.radioGroup) {
      newOptions.push({
        body: '',
        correct: false
      });
    } else {
      newOptions.push('');
    }
    if (onChange) {
      onChange(newOptions);
    }
  }

  handleDeleteClick = (index) => {
    const { onChange } = this.props;
    const newOptions = this.state.options.filter((option, i) => i !== index);
    if (index === this.state.value) {
      this.setState({
        value: undefined
      });
    }
    if (onChange) {
      onChange(newOptions);
    }
  }

  render() {
    const { options = [] } = this.state;
    const { radioGroup = false } = this.props;
    const radioStyle = {
      display: 'block',
      backgroundColor: '#ccc',
      padding: 5,
      marginBottom: 10
    };
    return (
      <div>
        { radioGroup &&
          <RadioGroup onChange={this.handleRadioChange} value={this.state.value}>
            {
              options.map((option, index) => (
                <Radio
                  key={index}
                  style={radioStyle}
                  value={index}
                >
                  <Input
                    style={{ width: 200 }}
                    type="textarea"
                    autosize={{ minRows: 1, maxRows: 6 }}
                    value={option.body}
                    onChange={this.handleInputChange.bind(this, index)}
                  />
                  <Button
                    shape="circle"
                    icon="close-circle"
                    onClick={this.handleDeleteClick.bind(this, index)}
                  />
                </Radio>
              ))
            }
          </RadioGroup>
        }
        { !radioGroup &&
          <ol>
            {
              options.map((option, index) => (
                <li
                  key={index}
                  style={radioStyle}
                  value={index}
                >
                  <Input
                    style={{ width: 200 }}
                    type="textarea"
                    autosize={{ minRows: 2, maxRows: 6 }}
                    value={option}
                    onChange={this.handleInputChange.bind(this, index)}
                  />
                  <Button
                    shape="circle"
                    icon="close-circle"
                    onClick={this.handleDeleteClick.bind(this, index)}
                  />
                </li>
              ))
            }
          </ol>
        }
        <Button
          icon="plus"
          onClick={this.handleAddClick}
        >
          选项
        </Button>
      </div>
    );
  }
}

export default OptionsEditor;
