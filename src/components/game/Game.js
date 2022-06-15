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

// import axios from "axios";
// import { useEffect, useState } from "react";
// import "./App.css"

// function Game() {
//   const [error, setError] = useState(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const [items, setItems] = useState([]);
//   const [initialList, setInitialList] = useState([]);
//   const [search, setSearch] = useState("");

//   const handleSearch = ({ target }) => {
//     setSearch(target.value);
//     if (!target.value) {
//       setItems(initialList);
//       return;
//     }
//     const lowerSeach = target.value.toLowerCase();
//     const filter = items.filter(({ lastName }) =>
//       lastName.toLowerCase().includes(lowerSeach)
//     );
//     setItems(filter);
//   };

//   async function load() {
//     fetch("http://localhost:3001/user"
//     )
//       .then((res) => res.json())
//       .then(
//         (result) => {
//           setIsLoaded(true);
//           setItems(result);
//           setInitialList(result);
//         },
//         (error) => {
//           setIsLoaded(false);
//           setError(error);
//         }
//       );
  
//   }

//   useEffect(() => {
//     load();
//   }, []);

// const styles = {

//   search:{
//     marginTop:300,
//   },
//   text:{
//     color:'black',
//   }
// }

//   return (
//     <>
//       {error && <div>Error: {error.message}</div>}
//       {!isLoaded && <div>Loading...</div>}
//       {items.length > 0 && (
//         <div className="wrapper">
//           <div className={styles.search}>
//             <input
//               className="search-t"
//               type="text"
//               name="search"
//               value={search}
//               onChange={handleSearch}
//               placeholder="Faça a sua pesquisa"
//             />
//           </div>
//           <ul className="card-grid">
//             {items.map((item) => (
//               <li className ={styles.text} key={item.lastName}>
//                 <article className="card">
//                   {/* <div className="card-image">
//                     <img src={item.flags.png} alt={item.name.common} />
//                   </div> */}
//                   <div className="card-content">
//                     <h2 className ="text">{item.lastName}</h2>
//                     <ol className="card-list">
//                       <li >
//                         population: <span className ="text">{item.email}</span>
//                       </li>
//                       <li >
//                         Region: <span className ="text">{item.firstName}</span>
//                       </li>
//                       <li className ={styles.text}>
//                         Capital: <span className ="text"  >{item.address}</span>
//                       </li>
//                     </ol>
//                   </div>
//                 </article>
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </>
//   );
// }

// export default Game;