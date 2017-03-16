/**
 * Created by zhaoyan on 17/2/10.
 */
import React from 'react';
import { Tag, Input, Tooltip, Button } from 'antd';

class EditableTagGroup extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object,
    onChange: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      tags: [],
      inputVisible: false,
      inputValue: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      tags: nextProps.topicList.length ? nextProps.topicList : []
    });
  }

  handleClose = (removedTag) => {
    const { onChange } = this.props;
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
    if (onChange) {
      onChange(tags);
    }
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = () => {
    const state = this.state;
    const inputValue = state.inputValue;
    let tags = state.tags;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }
    console.log(tags);
    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input

  render() {
    const { tags, inputVisible, inputValue } = this.state;
    return (
      <div>
        {tags.map((tag, index) => {
          const isLongTag = tag.length > 20;
          const tagElem = (
            <Tag key={tag._id} afterClose={() => this.handleClose(tag)} closable>
              {isLongTag ? `${tag.name.slice(0, 20)}...` : tag.name}
            </Tag>
          );
          return isLongTag ? <Tooltip title={tag}>{tagElem}</Tooltip> : tagElem;
        })}
        {inputVisible && (
          <Input
            ref={this.saveInputRef}
            type="text" size="small"
            style={{ width: 78 }}
            value={inputValue}
            onChange={this.handleInputChange}
            onBlur={this.handleInputConfirm}
            onPressEnter={this.handleInputConfirm}
          />
        )}
        {!inputVisible && <Button size="small" type="dashed" onClick={this.showInput}>+ New Tag</Button>}
      </div>
    );
  }
}

export default EditableTagGroup;
