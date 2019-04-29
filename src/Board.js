import React from 'react';
import Column from './Column';
import './App.css';
import uuid from 'uuid';

const COLUMNS = [
  {
    id: uuid(),
    name: 'winnie',
    cards: [
      { task: 'card1', id: uuid() },
      { task: 'card1', id: uuid() },
      { task: 'card1', id: uuid() }
    ]
  },
  {
    id: uuid(),
    name: 'bob',
    cards: [
      { task: 'card1', id: uuid() },
      { task: 'card1', id: uuid() },
      { task: 'card1', id: uuid() }
    ]
  },
  {
    id: uuid(),
    name: 'thomas',
    cards: [
      { task: 'card1', id: uuid() },
      { task: 'card1', id: uuid() },
      { task: 'card1', id: uuid() }
    ]
  },
  {
    id: uuid(),
    name: 'george',
    cards: [
      { task: 'card1', id: uuid() },
      { task: 'card1', id: uuid() },
      { task: 'card1', id: uuid() }
    ]
  }
];

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columns: []
    };
    this.addCard = this.addCard.bind(this);
    this.moveCard = this.moveCard.bind(this);
  }

  componentDidMount() {
    this.setState({ columns: COLUMNS });
  }

  addCard(name, task) {
    let updateColumnIdx = this.state.columns.findIndex((column, index) => {
      return column.name === name;
    });

    const updateCard = { task, id: uuid() };

    let updateColumn = {
      id: this.state.columns[updateColumnIdx].id,
      name: this.state.columns[updateColumnIdx].name,
      cards: [...this.state.columns[updateColumnIdx].cards, updateCard]
    };

    this.setState(st => ({
      columns: [
        ...st.columns.slice(0, updateColumnIdx),
        updateColumn,
        ...st.columns.slice(updateColumnIdx + 1)
      ]
    }));
  }

  moveCard(name, direction, updateTask, cardId) {
    let removeColumnIdx = this.state.columns.findIndex((column, index) => {
      return column.name === name;
    });

    let removeColumn = {
      name: this.state.columns[removeColumnIdx].name,
      id: this.state.columns[removeColumnIdx].id,
      cards: this.state.columns[removeColumnIdx].cards.filter(card => card.id !== cardId)
    };

    let updateColumns = this.state.columns.slice();
    updateColumns[removeColumnIdx] = removeColumn;

    if (direction === 'up') {
      let addColumn = {
        name: this.state.columns[removeColumnIdx + 1].name,
        id: this.state.columns[removeColumnIdx + 1].id,
        cards: [...this.state.columns[removeColumnIdx + 1].cards, {task: updateTask, id: cardId}]
      };
      updateColumns[removeColumnIdx + 1] = addColumn;
    } else {
      let addColumn = {
        name: this.state.columns[removeColumnIdx - 1].name,
        id: this.state.columns[removeColumnIdx - 1].id,
        cards: [...this.state.columns[removeColumnIdx - 1].cards, {task: updateTask, id: cardId}]
      };
      updateColumns[removeColumnIdx - 1] = addColumn;
    }

    this.setState(st=>({ columns: [...updateColumns] }));
  }

  render() {
    const columns = this.state.columns.map((column, index) => {
      return (
        <Column
          key={column.id}
          moveCard={this.moveCard}
          first={!index ? true : false}
          last={index === this.state.columns.length - 1 ? true : false}
          addCard={this.addCard}
          name={column.name}
          cards={column.cards}
        />
      );
    });

    return <div className="Board">{columns}</div>;
  }
}

export default Board;
