import React from 'react'
import PropTypes from 'prop-types'
import { Model } from 'antd'

class CreateColorModel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      colorWrong: false
    }
    this.onChange = this.onChange.bind(this)
    this.onOk = this.onOk.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }
  onOk() {
    this.props.addColor()
  }
  onCancel() {
    this.props.onCancel()
  }
  onChange() {
    this.props.onChangeColor()
  }
  render() {
    return (
      <Modal
        title="添加颜色" visible={this.props.createColorVisiable}
        onOk={this.onOk} onCancel={this.onCancel}
        okText="确定" cancelText="取消"
      >
        <p>当前仅支持16进制值</p>
        <Input
          placeholder="输入色值"
          prefix={<span>#</span>}
          value={this.props.color}
          onChange={this.onChange}
          style={{ width: '80px' }}
          maxLength={6}
        />
        <span className="test-color" style={{ background: '#' + (this.props.backgroundColor || 'ffffff') }} />
        {
          this.state.colorWrong ? (
            <p style={{ color: '#E24217', marginTop: '10px' }}>请输入正确的16进制</p>
          ) : null
        }
      </Modal>
    )
  }
}

CreateColorModel.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
  backgroundColor: PropTypes.string
}

export default CreateColorModel
