/**
 * Created by zhaoyan on 17/2/16.
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
    const { levels = [], onClick = () => {}, activeIndex = 0 } = this.props;
    return (
      <SortableList
        className="tab-bar"
        list={levels}
        activeIndex={activeIndex}
        onClick={onClick}
      />
    );
  }
}

export default ThemeList;
