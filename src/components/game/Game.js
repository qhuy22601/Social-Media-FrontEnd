import React, { Component } from "react";
import Board from "./Board";
import styles from "./styles/static.css";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      xNext: true,
      stepNum: 0,
      history: [{ squares: Array(9).fill(null) }],
    };
  }
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNum + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = isWin(squares);
    if (winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xNext ? "X" : "O";
    this.setState({
      history: history.concat({
        squares: squares,
      }),
      xNext: !this.state.xNext,
      stepNum: history.length,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNum: step,
      isNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNum];
    const winner = isWin(current.squares);
    const moves = history.map((step, move) => {
      const decs = move ? "Undo: " + move : "Reset";
      return (
        <li key={move} className={"item"}>
          <button
            className={"btn"}
            onClick={() => {
              this.jumpTo(move);
            }}
          >
            {decs}
          </button>
        </li>
        //      <button onClick = {() =>{this.jumpTo(move)}}></button>
      );
    });
    let status;
    if (winner) {
      status = winner + " THẮNG";
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            onClick={(i) => this.handleClick(i)}
            squares={current.squares}
          ></Board>
        </div>
        <div className="reset">
          <div>{status}</div>
          <div>{moves}</div>
        </div>
      </div>
    );
  }
}

function isWin(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
