/**
 * Created by zhaoyan on 17/2/7.
 */
import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import Card from './card';
import BoxWithHandle from './boxWithHandle';

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  static propTypes = {
    className: React.PropTypes.string,
    style: React.PropTypes.object,
    onClick: React.PropTypes.func,
    activeIndex: React.PropTypes.number
  }

  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
    this.state = {
      cards: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.list.length) {
      this.setState({
        cards: nextProps.list.map((item) => ({
          id: item._id,
          text: item.name || item[nextProps.showField]
        }))
      });
    } else {
      this.setState({
        cards: []
      });
    }
  }

  moveCard(dragIndex, hoverIndex) {
    console.log(dragIndex, hoverIndex);
    const { cards } = this.state;
    const dragCard = cards[dragIndex];

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard]
        ]
      }
    }));
  }

  render() {
    const { className, style, onClick, activeIndex } = this.props;
    const { cards } = this.state;

    return (
      <div
        className={className}
        style={style}
      >
        {cards.map((card, i) => (
          <BoxWithHandle
            key={`${card.id}${i}`}
            index={i}
            id={card.id}
            text={`${card.text}`}
            moveCard={this.moveCard}
            onClick={onClick.bind(this, i)}
            active={activeIndex === i}
          />
        ))}
      </div>
    );
  }
}
