/**
 * Created by zhaoyan on 17/2/7.
 */
import React from 'react';
import SortableList from '../components/sortableList/container';

class ThemeList extends React.Component {
  static propTypes = {
    themes: React.PropTypes.array,
    onClick: React.PropTypes.func,
    activeIndex: React.PropTypes.number
  }

  render() {
    const { themes = [], onClick = () => {}, activeIndex = 0 } = this.props;
    return (
      <SortableList
        className="tab-bar"
        list={themes}
        activeIndex={activeIndex}
        onClick={onClick}
      />
    );
  }
}

export default ThemeList;
