import { useState } from "react";
import "./App.css";

type Player = "X" | "O" | null;

const winningLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function calculateWinner(squares: Player[]): Player {
  for (const [a, b, c] of winningLines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a];
    }
  }
  return null;
}


function App() {
  // create state for 9 squares, all starting as null
  const [squares, setSquares] = useState<Player[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isBoardFull = squares.every((square) => square !== null);

  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isBoardFull) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  function handleClick(index: number) {
    // If this square is already filled or we already have a winner, ignore the click
    if (squares[index] || winner) return;

    // create a copy so we don't mutate state directly
    const nextSquares = squares.slice();

    // set the current player's symbol in this square
    nextSquares[index] = xIsNext ? "X" : "O";

    // update state with the new board
    setSquares(nextSquares);

    // switch player
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }


  return (
    <div className="app">
      <h1>React Tic Tac Toe</h1>
      <p className="subtitle">A simple game I built while learning React.</p>

      <div className="status">{status}</div>

      <div className="board">
        {squares.map((value, index) => (
          <button
            key={index}
            className="square"
            onClick={() => handleClick(index)}
          >
            {value}
          </button>
        ))}
      </div>
      <button className="reset" onClick={handleReset}>
        Reset Game
      </button>
    </div>
  );
}

export default App;
