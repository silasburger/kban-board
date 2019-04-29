import React from 'react';
import Card from './Card';

class Column extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    let taskResponse = window.prompt('Add a task');

    this.props.addCard(this.props.name, taskResponse);
  }


  render() {

    const cards = this.props.cards.map((card, index)=>{
      return (
        <Card key={card.id} moveCard={this.props.moveCard} cName={this.props.name} first={this.props.first} last={this.props.last} {...card}></Card>
      )
    })

    return (
      <div className="column-wrapper">

        <div className="Column">
          <div className="Title">{this.props.name}</div>
          {cards}
          <button onClick={this.handleClick}> + Add a card</button>
        </div>
      </div>
    );
  }
}

export default Column;
