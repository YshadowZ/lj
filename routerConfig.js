import App from './src/app/entry';
// import ChapterList from './src/app/chapterList/chapterListContainer';
// import ChapterEdit from './src/app/chapterEdit/chapterEditContainer';
// import TopicEdit from './src/app/topicEdit/topicEditContainer';
// import Show from './src/app/show/showContainer';
// import Task from './src/app/task/taskContainer';

export default [
  {
    path: '/',
    component: App
    // indexRoute: { component: ChapterList }
    // childRoutes: [
    //   { path: 'chapter/:chapterId', component: ChapterEdit },
    //   { path: 'chapter/:chapterId/topic/:topicId', component: TopicEdit },
    //   { path: 'show', component: Show },
    //   { path: 'task/:chapterId', component: Task }
    // ]
  }
];
