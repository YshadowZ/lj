import React from 'react';
import R from 'ramda';
import { Input, Icon, Row, Col, Tag, Button, Modal, Upload, notification } from 'antd';
import logoSvg from '../../assets/logo.svg';
import iconSearch from '../../assets/icon-search.svg';
import iconUpload from '../../assets/icon-upload.svg';
import iconDelete from '../../assets/icon-delete.svg';
import iconCreateColor from '../../assets/icon-create-color.svg';
import aliImg from '../../assets/zhifubao.png';
import weixinImg from '../../assets/weichat.png';
import '../styles/test.scss';


class App extends React.Component {
  // static propTypes = {
  //   children: React.PropTypes.oneOfType([ // null or []
  //     React.PropTypes.arrayOf(React.PropTypes.node),
  //     React.PropTypes.node
  //   ])
  // }

  constructor(props) {
    super(props);
    this.resources = [
      { type: 'color', name: 'onion-blue', value: '#FFDE59', tags: ['first', 'second'] },
      { type: 'color', name: 'onion-yellow', value: '#BD72CC', tags: ['first', 'second'] },
      { type: 'img', name: 'zhifubao', value: aliImg, tags: ['first', 'second'] },
      { type: 'img', name: 'weichat', value: weixinImg, tags: ['first', 'second'] }
    ];
    this.state = {
      currentItem: {},
      deleteVisiable: false,
      createColorVisiable: false,
      color: '',
      backgroundColor: '',
      colorWrong: false,
      tagInputVisible: false,
      tagInputValue: ''
    };
    this.handleIndexClick = this.handleIndexClick.bind(this);
    this.onChangeColor = this.onChangeColor.bind(this);
    this.handleHoverItem = this.handleHoverItem.bind(this);
    this.cancelHoverItem = this.cancelHoverItem.bind(this);
    this.beforeDelete = this.beforeDelete.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.createColor = this.createColor.bind(this);
    this.handleShowClick = this.handleShowClick.bind(this);
    this.addColor = this.addColor.bind(this);
    this.cancelAddColor = this.cancelAddColor.bind(this);
    this.handleTagInputChange = this.handleTagInputChange.bind(this);
    this.handleTagInputConfirm = this.handleTagInputConfirm.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
    this.showInput = this.showInput.bind(this);
  }

  onChangeColor(e) {
    // console.log(value)
    this.setState({ color: e.target.value });
    if ((e.target.value + '').length === 6) {
      if (e.target.value.match(/^[0-9a-fA-F]{6}$/)) {
        this.setState({ backgroundColor: e.target.value, colorWrong: false });
      } else {
        this.setState({ colorWrong: true });
      }
    }
    if ((e.target.value + '').length < 6) {
      this.setState({ colorWrong: false });
    }
  }

  handleHoverItem(resource) {
    this.setState({ currentItem: resource });
  }

  cancelHoverItem() {
    // this.setState({ currentItem: {} });
  }

  beforeDelete() {
    this.setState({ deleteVisiable: true });
  }

  handleDelete() {
    this.resources = R.filter(item => item.name !== this.state.currentItem.name, this.resources);
    this.setState({ currentItem: {}, deleteVisiable: false });
  }

  handleCancelDelete() {
    this.setState({ deleteVisiable: false });
  }

  createColor() {
    this.setState({ createColorVisiable: true })
  }

  handleShowClick() {
    hashHistory.push('/show');
  }

  handleIndexClick() {
    hashHistory.push('/');
  }

  addColor() {
    this.resources.push({ type: 'color', value: '#' + this.state.color, name: 'yello', tags: ['first', 'second'] });
    this.setState({ createColorVisiable: false, color: '', backgroundColor: '' });
  }

  cancelAddColor() {
    this.setState({ createColorVisiable: false });
  }

  handleTagInputChange(e) {
    this.setState({ tagInputValue: e.target.value });
  }

  handleTagInputConfirm() {
    const currentItem = R.find(item => item.name === this.state.currentItem.name, this.resources);
    currentItem.tags.push(this.state.tagInputValue);
    this.setState({ currentItem, tagInputVisible: false, tagInputValue: '' });
  }

  uploadFile() {
    // console.log(info)
    // notification.open({
    //   duration: 1,
    //   message: '正在上传过程中',
    //   description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
    // });
  }

  showInput() {
    this.setState({ tagInputVisible: true });
  }

  render() {
    return (
      <div>
        <header className="lj-header">
          <img src={logoSvg} alt="" className="logo" />
          <img src={iconSearch} alt="" className="search-icon" />
          <input type="text" className="search-input" placeholder="请输入搜索内容" />
          <button className="half-left"><img src={iconUpload} alt="" className="icon" />
            <Upload onChange={this.uploadFile} style={{ fontSize: '14px' }}>上传文件</Upload>
          </button>
          <button className="half-right" onClick={this.createColor}><img src={iconCreateColor} alt="" className="icon" />创建颜色</button>
        </header>
        <div className="lj-container">
          <div className="content">
            {
              this.resources.map(resource => (
                <div
                  className="card"
                  key={resource.name}
                  onMouseEnter={() => this.handleHoverItem(resource)}
                  onMouseLeave={this.cancelHoverItem}
                >
                  {
                    this.state.currentItem.name === resource.name ? (
                      <img
                        src={iconDelete}
                        alt=""
                        className="card-delete"
                        onClick={() => this.beforeDelete(resource)}
                      />
                    ) : null
                  }
                  {
                    resource.type === 'color' ? (
                      <div className="card-display-color" style={{ background: resource.value }} />
                    ) : (
                      <img src={resource.value} className="card-display-img" alt="" />
                    )
                  }
                  {
                    this.state.currentItem.name === resource.name ? (
                      <p className="card-name">{resource.name}</p>
                    ) : null
                  }
                </div>
              ))
            }
          </div>
          <div className="slide">
          {
            (() => {
              if (this.state.currentItem.type === 'color') {
                return (
                  <div>
                    <div className="slide-color-board" style={{ background: this.state.currentItem.value }} />
                    <p className="slide-color-name">{this.state.currentItem.name}</p>
                    <div className="slide-color-detail">
                      <p className="slide-color-detail-item">
                        <span className="title">HEX:</span>
                        <span className="value">{'#efefef'.toLocaleUpperCase()}</span>
                      </p>
                      <p className="slide-color-detail-item">
                        <span className="title">RGB:</span>
                        <span style={{ display: 'inline-block', 'margin-left': '15px', color: '#3b3b3b3', width: '40px', 'border-right': 'solid 1px #6a6a6a' }}>114</span>
                        <span style={{ display: 'inline-block', color: '#3b3b3b3', width: '55px', 'border-right': 'solid 1px #6a6a6a', 'text-align': 'center' }}>114</span>
                        <span style={{ display: 'inline-block', color: '#3b3b3b3', width: '55px', 'text-align': 'center' }}>114</span>
                      </p>
                      <p className="slide-color-detail-item">
                        <span className="title">CMYK:</span>
                        <span style={{ display: 'inline-block', 'margin-left': '15px', color: '#3b3b3b3', width: '40px', 'border-right': 'solid 1px #6a6a6a' }}>20%</span>
                        <span style={{ display: 'inline-block', color: '#3b3b3b3', width: '55px', 'border-right': 'solid 1px #6a6a6a', 'text-align': 'center' }}>40%</span>
                        <span style={{ display: 'inline-block', color: '#3b3b3b3', width: '55px', 'border-right': 'solid 1px #6a6a6a', 'text-align': 'center' }}>40%</span>
                        <span style={{ display: 'inline-block', color: '#3b3b3b3', width: '55px', 'text-align': 'center' }}>40%</span>
                      </p>
                    </div>
                    <div className="slide-block">
                      <p className="slide-title">标签</p>
                      <div style={{ 'margin-top': '10px' }}>
                        {
                          this.state.currentItem.tags.map((tag, index) => <Tag style={{ marginRight: '5px', marginBottom: '5px' }} key={tag + index} closable>{tag}</Tag>)
                        }
                        {
                          this.state.tagInputVisible ? (
                            <Input
                              type="text" size="small"
                              style={{ width: 78 }}
                              value={this.state.tagInputValue}
                              onChange={this.handleTagInputChange}
                              onBlur={this.handleTagInputConfirm}
                            />
                          ) : (
                            <Button size="small" type="dashed" onClick={this.showInput}>+ New Tag</Button>
                          )
                        }
                      </div>
                    </div>
                    <div className="slide-block">
                      <p className="slide-title">描述</p>
                      <p className="content">这里是视觉库的描述，容受江万理部验约，我立道响完教小</p>
                    </div>
                    <div className="slide-block">
                      <p className="slide-title">详细内容</p>
                      <p style={{ 'font-size': '14px', color: '#a2a2a2', margin: '10px 0px' }}>
                        <span style={{ display: 'inline-block', width: '62px', color: '#a2a2a2' }}>文件类型:</span>
                        <span style={{ display: 'inline-block', color: '#3b3b3b3', 'text-align': 'left', 'margin-left': '20px' }}>{this.state.currentItem.type}</span>
                      </p>
                      <p style={{ 'font-size': '14px', color: '#a2a2a2', margin: '10px 0px' }}>
                        <span style={{ display: 'inline-block', width: '62px', color: '#a2a2a2' }}>创建时间:</span>
                        <span style={{ display: 'inline-block', color: '#3b3b3b3', 'text-align': 'left', 'margin-left': '20px' }}>{new Date().getUTCDate()}</span>
                      </p>
                    </div>
                  </div>
                );
              }
              if (this.state.currentItem.type === 'img') {
                return (
                  <div>
                    <div className="slide-image-board">
                      <img src={this.state.currentItem.value} alt="" />
                    </div>
                    <p className="slide-color-name">{this.state.currentItem.name}</p>
                    <div className="slide-image-download">
                      <Button style={{ margin: '0px 5px', fontSize: '14px', padding: '5px 18px' }} type="primary" icon="download" size={'small'}>SVG</Button>
                      <Button style={{ margin: '0px 5px', fontSize: '14px', padding: '5px 18px' }} type="primary" icon="download" size={'small'}>PNG</Button>
                      <Button style={{ margin: '0px 5px', fontSize: '14px', padding: '5px 18px' }} type="primary" icon="download" size={'small'}>JPG</Button>
                    </div>
                    <div className="slide-block">
                      <p className="slide-title">标签</p>
                      <div style={{ 'margin-top': '10px' }}>
                        {
                          this.state.currentItem.tags.map((tag, index) => <Tag style={{ marginRight: '5px', marginBottom: '5px' }} key={tag + index} closable>{tag}</Tag>)
                        }
                        {
                          this.state.tagInputVisible ? (
                            <Input
                              type="text" size="small"
                              style={{ width: 78 }}
                              value={this.state.tagInputValue}
                              onChange={this.handleTagInputChange}
                              onBlur={this.handleTagInputConfirm}
                            />
                          ) : (
                            <Button size="small" type="dashed" onClick={this.showInput}>+ New Tag</Button>
                          )
                        }
                      </div>
                    </div>
                    <div className="slide-block">
                      <p className="slide-title">描述</p>
                      <p className="content">这里是视觉库的描述，容受江万理部验约，我立道响完教小</p>
                    </div>
                    <div className="slide-block">
                      <p className="slide-title">详细内容</p>
                      <p style={{ 'font-size': '14px', color: '#a2a2a2', margin: '10px 0px' }}>
                        <span style={{ display: 'inline-block', width: '62px', color: '#a2a2a2' }}>文件类型:</span>
                        <span style={{ display: 'inline-block', color: '#3b3b3b3', 'text-align': 'left', 'margin-left': '20px' }}>{this.state.currentItem.type}</span>
                      </p>
                      <p style={{ 'font-size': '14px', color: '#a2a2a2', margin: '10px 0px' }}>
                        <span style={{ display: 'inline-block', width: '62px', color: '#a2a2a2' }}>创建时间:</span>
                        <span style={{ display: 'inline-block', color: '#3b3b3b3', 'text-align': 'left', 'margin-left': '20px' }}>{new Date().getUTCDate()}</span>
                      </p>
                    </div>
                  </div>
                );
              }
              return (
                <div>
                  <p className="slide-header">欢迎使用灵件</p>
                  <p className="slide-sub-header">用更简单的方式管理你的视觉素材吧！</p>
                  <p className="slide-intro">
                    1.云端同步设计素材。轻松上传你的设计素材，抛开传统的管理方式，无论在哪，你都能轻松查看和下载素材。
                  </p>
                  <p className="slide-intro">
                    2.云端同步色彩。轻松创建你的专属色彩，无论在哪，都可以随时读取和分享这些颜色。
                  </p>
                </div>
              );
            })()
          }
          </div>
        </div>
        <Modal
          title="删除文件/颜色" visible={this.state.deleteVisiable}
          onOk={this.handleDelete} onCancel={this.handleCancelDelete}
          okText="确定" cancelText="取消"
        >
          <p>您当前的操作需要删除“{this.state.currentItem.name}”，是否确定删除？</p>
        </Modal>
        <Modal
          title="添加颜色" visible={this.state.createColorVisiable}
          onOk={this.addColor} onCancel={this.cancelAddColor}
          okText="确定" cancelText="取消"
        >
          <p>当前仅支持16进制值</p>
          <Input
            placeholder="输入色值"
            prefix={<span>#</span>}
            value={this.state.color}
            onChange={this.onChangeColor}
            style={{ width: '80px' }}
            maxLength={6}
          />
          <span className="test-color" style={{ background: '#' + (this.state.backgroundColor || 'ffffff') }} />
          {
            this.state.colorWrong ? (
              <p style={{ color: '#E24217', marginTop: '10px' }}>请输入正确的16进制</p>
            ) : null
          }
        </Modal>
      </div>
    );
  }
}

export default App;
