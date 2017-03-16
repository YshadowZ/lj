/**
 * Created by zhaoyan on 17/2/6.
 */
import { connect } from 'react-redux';
import { getVersions, getChapters, updateChapter, deleteChapter, getTopics } from '../../actions/chapterList';
import ChapterEdit from './chapterEditView';

const mapStateToProps = (state) => ({
  versions: state.versions,
  chapters: state.chapters,
  topics: state.topics
});

const mapDispatchToProps = (dispatch) => ({
  getVersions: () => dispatch(getVersions()),
  getChapters: (param) => dispatch(getChapters(param)),
  updateChapter: (param, chapterId) => dispatch(updateChapter(param, chapterId)),
  deleteChapter: (param, chapterId) => dispatch(deleteChapter(param, chapterId)),
  getTopics: (param) => dispatch(getTopics(param))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChapterEdit);
