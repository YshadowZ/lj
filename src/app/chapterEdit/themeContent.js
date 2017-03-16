/**
 * Created by zhaoyan on 17/2/9.
 */
import React from 'react';
import { Switch, Select, Form, Input } from 'antd';
import PicturesWall from '../components/picturesWall';
import EditableTagGroup from '../components/EditableTagGroup';

const FormItem = Form.Item;
const Option = Select.Option;
const CustomizedForm = Form.create({
  onFieldsChange(props, changedFields) {
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    return {
      themeName: { ...props.themeName },
      stageType: { ...props.stageType },
      descText: { ...props.descText },
      descImage: { ...props.descImage },
      painPoint: { ...props.painPoint },
      paidContent: { ...props.paidContent },
      backgroundColor: { ...props.backgroundColor },
      unfinishedPng: { ...props.unfinishedPng },
      unfinishedSvg: { ...props.unfinishedSvg },
      finishedPng: { ...props.finishedPng },
      finishedSvg: { ...props.finishedSvg },
      goldenImage: { ...props.goldenImage },
      level: { ...props.level },
      relevancy: { ...props.relevancy },
      simpleUnlock: { ...props.simpleUnlock },
      difficultUnlock: { ...props.difficultUnlock },
      topicList: { ...props.topicList },
      topics: { ...props.topics },
      selectedTopic: { ...props.selectedTopic },
      selectedTopicSimple: { ...props.selectedTopicSimple },
      selectedTopicDifficult: { ...props.selectedTopicDifficult },
      chapterTopics: { ...props.chapterTopics },
      themes: { ...props.themes }
    };
  },
  onValuesChange(_, values) {
    console.log(values);
  }
})((props) => {
  // console.log('themeContent', props);
  const { getFieldDecorator } = props.form;
  const formItemLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 14 }
  };
  return (
    <Form horizontal>
      <FormItem
        label="主题名称"
        {...formItemLayout}
      >
        {getFieldDecorator('themeName')(
          <Input
            style={{ width: 200 }}
          />
        )}
      </FormItem>
      <FormItem
        label="主题类型"
        {...formItemLayout}
      >
        {getFieldDecorator('stageType')(
          <Select
            style={{ width: 120 }}
          >
            <Option value="normal">普通</Option>
            <Option value="exam">章节检测</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        label="主题描述(文字)"
        {...formItemLayout}
      >
        {getFieldDecorator('descText')(
          <Input
            style={{ width: 200 }}
            type="textarea"
            autosize={{ minRows: 2, maxRows: 6 }}
          />
        )}
      </FormItem>
      <FormItem
        label="主题描述(图片)"
        {...formItemLayout}
        style={{ borderBottom: '1px solid #ccc' }}
      >
        {getFieldDecorator('descImage')(
          <PicturesWall
            style={{ width: 300, height: 100 }}
            fileList={props.descImage.value ? [{
              uid: -1,
              url: props.descImage.value
            }] : []}
          />
        )}
      </FormItem>
      <FormItem
        label="是否有痛点"
        {...formItemLayout}
      >
        {getFieldDecorator('painPoint', {
          valuePropName: 'checked'
        })(
          <Switch checkedChildren={'是'} unCheckedChildren={'否'} />
        )}
      </FormItem>
      <FormItem
        label="是否含有收费内容"
        {...formItemLayout}
      >
        {getFieldDecorator('paidContent', {
          valuePropName: 'checked'
        })(
          <Switch checkedChildren={'是'} unCheckedChildren={'否'} />
        )}
      </FormItem>
      <FormItem
        label="图标背景色值"
        {...formItemLayout}
      >
        {getFieldDecorator('backgroundColor')(
          <Select
            style={{ width: 120, color: props.backgroundColor.value }}
          >
            <Option value="#1696EA" style={{ color: '#1696EA' }}>█ #1696EA</Option>
            <Option value="#E14116" style={{ color: '#E14116' }}>█ #E14116</Option>
            <Option value="#6EB805" style={{ color: '#6EB805' }}>█ #6EB805</Option>
            <Option value="#AE57C0" style={{ color: '#AE57C0' }}>█ #AE57C0</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        label="未完成图标(png)"
        {...formItemLayout}
      >
        {getFieldDecorator('unfinishedPng')(
          <PicturesWall
            style={{ width: 300, height: 100 }}
            fileList={props.unfinishedPng.value ? [{
              uid: -1,
              url: props.unfinishedPng.value
            }] : []}
          />
        )}
      </FormItem>
      <FormItem
        label="未完成图标(svg)"
        {...formItemLayout}
      >
        {getFieldDecorator('unfinishedSvg')(
          <PicturesWall
            style={{ width: 300, height: 100 }}
            fileList={props.unfinishedSvg.value ? [{
              uid: -1,
              url: props.unfinishedSvg.value
            }] : []}
          />
        )}
      </FormItem>
      <FormItem
        label="完成图标(png)"
        {...formItemLayout}
      >
        {getFieldDecorator('finishedPng')(
          <PicturesWall
            style={{ width: 300, height: 100 }}
            fileList={props.finishedPng.value ? [{
              uid: -1,
              url: props.finishedPng.value
            }] : []}
          />
        )}
      </FormItem>
      <FormItem
        label="完成图标(svg)"
        {...formItemLayout}
      >
        {getFieldDecorator('finishedSvg')(
          <PicturesWall
            style={{ width: 300, height: 100 }}
            fileList={props.finishedSvg.value ? [{
              uid: -1,
              url: props.finishedSvg.value
            }] : []}
          />
        )}
      </FormItem>
      <FormItem
        label="变金背景图片"
        {...formItemLayout}
        style={{ borderBottom: '1px solid #ccc' }}
      >
        {getFieldDecorator('goldenImage')(
          <PicturesWall
            style={{ width: 300, height: 100 }}
            fileList={props.goldenImage.value ? [{
              uid: -1,
              url: props.goldenImage.value
            }] : []}
          />
        )}
      </FormItem>
      <FormItem
        label="难易程度(章节检测专用)"
        {...formItemLayout}
      >
        {getFieldDecorator('level')(
          <Select style={{ width: 120 }}>
            <Option value="simple">简单</Option>
            <Option value="difficult">困难</Option>
          </Select>
        )}
      </FormItem>
      <FormItem
        label="关联主题"
        {...formItemLayout}
        style={{ borderBottom: '1px solid #ccc' }}
      >
        {getFieldDecorator('relevancy')(
          <Select
            style={{ width: 120 }}
            placeholder="允许删除"
            allowClear
          >
            {
              props.themes.value.map((theme, index) => (
                <Option key={`${theme._id}`}>{theme.name}</Option>
              ))
            }
          </Select>
        )}
      </FormItem>
      <FormItem
        label="解锁章节检测需要完成的知识点(简单)"
        {...formItemLayout}
      >
        {getFieldDecorator('selectedTopicSimple')(
          <Select
            showSearch
            style={{ width: 120 }}
            placeholder="选中添加"
          >
            {
              props.chapterTopics.value.map((topic, index) => (
                <Option key={`${topic.name}|${index}`}>{topic.name}</Option>
              ))
            }
          </Select>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('simpleUnlock')(
          <EditableTagGroup topicList={props.simpleUnlock.value} />
        )}
      </FormItem>
      <FormItem
        label="解锁章节检测需要完成的知识点(困难)"
        {...formItemLayout}
      >
        {getFieldDecorator('selectedTopicDifficult')(
          <Select
            showSearch
            style={{ width: 120 }}
            placeholder="选中添加"
          >
            {
              props.chapterTopics.value.map((topic, index) => (
                <Option key={`${topic.name}|${index}`}>{topic.name}</Option>
              ))
            }
          </Select>
        )}
      </FormItem>
      <FormItem style={{ borderBottom: '1px solid #ccc' }}>
        {getFieldDecorator('difficultUnlock')(
          <EditableTagGroup topicList={props.difficultUnlock.value} />
        )}
      </FormItem>
      <FormItem
        label="添加主题知识点"
        {...formItemLayout}
      >
        {getFieldDecorator('selectedTopic')(
          <Select
            showSearch
            style={{ width: 120 }}
            placeholder="选中添加"
          >
            {
              props.topics.value.map((topic, index) => (
                <Option key={`${topic.name}|${index}`}>{topic.name}</Option>
              ))
            }
          </Select>
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('topicList')(
          <EditableTagGroup topicList={props.topicList.value} />
        )}
      </FormItem>
    </Form>
  );
});

class ThemeContent extends React.Component {
  static propTypes = {
    fields: React.PropTypes.object,
    onChange: React.PropTypes.func
  }

  render() {
    const { fields, onChange } = this.props;
    // console.log(this.props.fields);
    return (
      <div className="tab-content">
        <div>
          复制主题:
          <Select
            style={{ width: 120 }}
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="disabled" disabled>Disabled</Option>
            <Option value="Yiminghe">yiminghe</Option>
          </Select>
        </div>
        <CustomizedForm
          {...fields}
          onChange={onChange}
        />
      </div>
    );
  }
}

export default ThemeContent;
