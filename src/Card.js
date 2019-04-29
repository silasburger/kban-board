import React from 'react';

class Card extends React.Component {

  handleMoveUp = (e) => {
    this.props.moveCard(this.props.cName, 'up', this.props.task, this.props.id);
  }

  handleMoveDown = (e) => {
    this.props.moveCard(this.props.cName, 'down', this.props.task, this.props.id);
  }


  render() {
    return (
      <div className="Card">
        {this.props.first ? null : <button onClick={this.handleMoveDown}>≤</button>}
        {this.props.task}
        {this.props.last ? null : <button onClick={this.handleMoveUp}>></button>}
      </div>
    );
  }
}

export default Card;
