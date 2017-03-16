/**
 * Created by zhaoyan on 17/2/16.
 */
import React from 'react';
import { Input, Button, Form, Cascader, Switch, Select, Modal, message } from 'antd';
import PicturesWall from '../components/picturesWall';
import VideoInteractions from './VideoInteractions';

const FormItem = Form.Item;
const Option = Select.Option;
const videoConfig = {
  mobileHls: 'https://o558dvxry.qnssl.com/',
  mp4Host: 'http://private.media.yangcong345.com/',
  pcHls: 'http://hls.media.yangcong345.com/'
};
let signVideoFlag = false;

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
  // console.log('form', props.video);
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 }
  };
  return (
    <Form horizontal>
      <FormItem
        label="名称"
        {...formItemLayout}
      >
        {getFieldDecorator('name')(
          <Input />
        )}
      </FormItem>
      <FormItem
        label="简介"
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
      <FormItem
        label="截图"
        {...formItemLayout}
      >
        {getFieldDecorator('thumbnail')(
          <PicturesWall
            style={{ width: 300, height: 100 }}
            fileList={(props.thumbnail && props.thumbnail.value) ? [{
              uid: -1,
              url: props.thumbnail.value
            }] : []}
          />
        )}
      </FormItem>
      <FormItem
        label="类型"
        {...formItemLayout}
      >
        {getFieldDecorator('tag')(
          <Select
            style={{ width: 120 }}
          >
            <Option value="course">课程</Option>
            <Option value="show">真人秀</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        label='显示"新"'
        {...formItemLayout}
      >
        {getFieldDecorator('new', {
          valuePropName: 'checked'
        })(
          <Switch
            checkedChildren={'是'}
            unCheckedChildren={'否'}
          />
        )}
      </FormItem>
      <FormItem
        label="选择视频"
        {...formItemLayout}
      >
        {props.videoList.length ? getFieldDecorator('video')(
          <Select showSearch>
            {
              props.videoList.map((video, index) => (
                <Option key={`${video._id}${index}`} value={`${video._id}`}>{video.name}</Option>
              ))
            }
          </Select>
        ) : null}
      </FormItem>
      <FormItem>
        <video
          style={{
            width: 500,
            height: 300
          }}
          src={props.videoUrl}
          controls
        />
      </FormItem>
    </Form>
  );
});

class VideoPart extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    hyperVideo: React.PropTypes.object,
    videoList: React.PropTypes.array,
    signVideo: React.PropTypes.object,
    onChange: React.PropTypes.func,
    onSave: React.PropTypes.func,
    updateHyperVideos: React.PropTypes.func,
    createSignVideo: React.PropTypes.func
  }

  constructor(props) {
    super(props);
    this.state = {
      fields: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    // debugger;
    // console.log('QQQQQQQ', nextProps);
    const  url = this.props.hyperVideo && this.props.hyperVideo.url;
    const { hyperVideo = {}, createSignVideo, videoList = [] } = nextProps;
    const fields = {};
    let videoInfo = [];
    for (const [key, value] of Object.entries(hyperVideo)) {
      fields[key] = { value };
    }
    // videoInfo = videoList.data && videoList.data.length && videoList.data.filter((video) => video._id === hyperVideo._id);
    // fields.videoName = videoInfo[0];
    // console.log('video', fields);
    this.setState({ fields });
    if (hyperVideo.url !== url) {
      this.signVideo(nextProps);
    }
  }

  signVideo = (nextProps) => {
    const data = nextProps ? nextProps : this.props;
    const { hyperVideo = {}, createSignVideo } = data;
    if (!signVideoFlag && hyperVideo.url && createSignVideo) {
      signVideoFlag = true;
      createSignVideo({ url: hyperVideo.url.pc.mp4_middle }).then(() => {
        this.setState({
          fields: {
            ...this.state.fields,
            videoUrl: this.props.signVideo.data.url
          }
        });
        signVideoFlag = false;
      });
    }
  }

  handleFormChange = (changedFields) => {
    const { hyperVideo = {}, onChange, videoList = [] } = this.props;
    let newHyperVideo = {};
    if (changedFields.video) {
      const model = videoList.filter((video) => video._id === changedFields.video)[0];
      hyperVideo.video = model._id;
      hyperVideo.titleTime = (model.op && model.op.duration) ? model.op.duration / 1000 : 0;
      hyperVideo.finishTime = (model.ed && model.ed.duration) ? (model.duration - model.ed.duration) / 1000 : model.duration / 1000;
      hyperVideo.duration = model.duration / 1000;
      hyperVideo.url = {
        pc: {
          hls_high: videoConfig.pcHls + 'high/high_' + model.uuid + '.m3u8',
          hls_low: videoConfig.pcHls + 'pcL/pcL_' + model.uuid + '.m3u8',
          hls_middle: videoConfig.pcHls + 'pcM/pcM_' + model.uuid + '.m3u8',
          mp4_middle: videoConfig.mp4Host + 'pcM/pcM_' + model.uuid + '.mp4',
          mp4_high: videoConfig.mp4Host + 'high/high_' + model.uuid + '.mp4',
        },
        mobile: {
          mp4_middle: videoConfig.mp4Host + 'mobileM/mobileM_' + model.uuid + '.mp4',
          hls_low: videoConfig.mobileHls + 'mobileL/mobileL_' + model.uuid + '.m3u8',
          hls_middle: videoConfig.mobileHls + 'mobileM/mobileM_' + model.uuid + '.m3u8',
          mp4_middle_md5: model.mobileM_md5
        }
      };
      newHyperVideo = {
        ...hyperVideo
      };
      this.signVideo();
    } else {
      newHyperVideo = {
        ...hyperVideo,
        ...changedFields
      };
    }
    console.log('videoChange', newHyperVideo);
    if (onChange) {
      onChange(newHyperVideo);
    }
  }

  handleSaveClick = () => {
    const { hyperVideo = {}, updateHyperVideos, onSave } = this.props;
    updateHyperVideos(hyperVideo, `${hyperVideo._id}?upsert=true`);
    onSave();
  }

  render() {
    const { videoList = [], hyperVideo = {}, className } = this.props;
    const { fields } = this.state;
    return (
      <div className={className}>
        <div>
          <Button
            type="primary"
            onClick={this.handleSaveClick}
          >
            保存视频
          </Button>
          <Button onClick={this.chapterDeleteConfirm}>删除视频</Button>
        </div>
        <CustomizedForm
          {...fields}
          videoList={videoList}
          onChange={this.handleFormChange}
        />
        <h3>交互点</h3>
        <VideoInteractions
          interactions={hyperVideo.interactions}
          onChange={this.handleFormChange}
        />
      </div>
    );
  }
}

export default VideoPart;
