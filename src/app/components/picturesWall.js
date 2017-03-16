/**
 * Created by zhaoyan on 17/2/6.
 */
import React from 'react';
import { Upload, Icon, Modal, message } from 'antd';

const qiniu = {
  bucket: 'yc-course',
  ACCESS_KEY: 'Ap-_6XBBOas4n-w-osaYig82pVft-v63Rdu_2lPV',
  SECRET_KEY: '_GjKAqSVaeTlWv-YF8fu2sbQJUKpApG_tu7WRgS3',
  url: 'http://upload.qiniu.com',
  token: 'Ap-_6XBBOas4n-w-osaYig82pVft-v63Rdu_2lPV:MGKilN8_LMEyt8u0GitgiL6xtac=:eyJzY29wZSI6InljLWNvdXJzZSIsImRlYWRsaW5lIjozMDIzNDE4ODU4fQ==',
  domain: 'http://7sbkoa.com2.z0.glb.qiniucdn.com/'
};

class PicturesWall extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fileList && nextProps.fileList.length) {
      this.setState({
        fileList: nextProps.fileList
      });
    } else {
      this.setState({
        fileList: []
      });
    }
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  }

  handleChange = ({ file, fileList }) => {
    console.log('PicturesWall', file, fileList, event);
    const { onChange } = this.props;
    this.setState({ fileList });
    if (!fileList.length && onChange) {
      onChange('');
      return;
    }
    switch (file.status) {
      case 'done':
        message.success(`${file.name} file uploaded successfully`);
        if (onChange) {
          onChange(`${qiniu.domain}${file.response.key}`);
        }
        break;
      case 'removed':
        break;
      case 'error':
        message.error(`${file.name} file upload failed.`);
        break;
      default:
        console.log('PicturesWall: file.status is not found.');
    }
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix" style={this.props.style}>
        <Upload
          action={qiniu.url}
          data={{
            token: qiniu.token
          }}
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall;
