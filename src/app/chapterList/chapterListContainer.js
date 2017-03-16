import { connect } from 'react-redux';
import { getVersions, getChapters, createChapter } from '../../actions/chapterList';
import ChapterList from './chapterListView';

const mapStateToProps = (state) => ({
  versions: state.versions,
  chapters: state.chapters
});

const mapDispatchToProps = (dispatch) => ({
  getVersions: () => dispatch(getVersions()),
  getChapters: (param) => dispatch(getChapters(param)),
  createChapter: (param) => dispatch(createChapter(param))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChapterList);
