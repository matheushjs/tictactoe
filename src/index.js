import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props){
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return(
      <Square
      value = {this.props.squares[i]}
      onClick = {() => this.props.onClick(i)}
      />
    );
  }

  render() {

    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(){
    super();
    this.state = {
      history: [{
          squares: Array(9).fill(null),
          xIsNext: true
      }],
    };
  }

  handleClick(i){
    const hist = this.state.history;
    const last = hist[hist.length - 1];
    var curSquares = last.squares;
    
    if(curSquares[i] != null || calculateWinner(curSquares) != null)
      return;
    
    var squares = curSquares.slice();
    squares[i] = last.xIsNext ? "X" : "O";
    this.setState({history: this.state.history.concat({squares: squares, xIsNext: !last.xIsNext})});
  }

  jumpTo(move){
    while( (this.state.history.length - 1) !== move)
      this.state.history.pop();
    this.setState({history: this.state.history});
  }

  render() {
    var history = this.state.history;
    var winner = calculateWinner(history[history.length - 1].squares);
    var status = "";
    
    const moves = history.map((step, move) => {
      const desc = move ? "Move #" + move : "Game Start";
      return(
        <li key={move}>
          <a href='#' onClick={() => this.jumpTo(move)}>{desc}</a>
        </li>
      );
    })

    if(winner != null){
      status = "Winner is: " + winner + ".";
    } else {
      status = 'Next player: ' + (history[history.length - 1].xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
          xIsNext={history[history.length - 1].xIsNext}
          onClick={(i) => this.handleClick(i)}
          squares={this.state.history[this.state.history.length - 1].squares}
          />
        </div>
        <div className="game-info">
          <div>{"Current Move: #" + history.length}</div>
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

