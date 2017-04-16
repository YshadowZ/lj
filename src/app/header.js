import React from 'react'
import { Upload } from 'antd'
import  PropTypes from 'prop-types'
import logoSvg from '../../assets/logo.svg'
import iconSearch from '../../assets/icon-search.svg'
import iconCreateColor from '../../assets/icon-create-color.svg'
import iconUpload from '../../assets/icon-upload.svg'

class Header extends React.Component {
  render() {
    return (
      <header className="lj-header">
        <img src={logoSvg} alt="" className="logo" />
        <img src={iconSearch} alt="" className="search-icon" />
        <input type="text" className="search-input" placeholder="请输入搜索内容" />
        <button className="half-left"><img src={iconUpload} alt="" className="icon" />
          <Upload onChange={this.uploadFile} style={{ fontSize: '14px' }}>上传文件</Upload>
        </button>
        <button className="half-right" onClick={this.createColor}><img src={iconCreateColor} alt="" className="icon" />创建颜色</button>
      </header>
    )
  }
}

Header.propTypes = {
  createColor: PropTypes.func,
  uploadFile: PropTypes.func
}

export default Header
