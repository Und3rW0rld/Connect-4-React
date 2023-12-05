import './App.css'
import { useState } from 'react';
import { Circle } from './components/circle';
import { WinnerModal } from './components/WinnerModal';

function App() {
  const [wins, setWins] = useState({ R: 0, B: 0 });
  const TURNS = {
    R: 'R',
    B: 'B',
  }
  const [winner, setWinner] = useState(null);
  const resetGame = () => {
    setBoard(Array(42).fill(null));
    setTurn(TURNS.R);
    setWinner(null);
  }
  const checkEndGame = (board) => {
    return board.every((circle) => circle != null);
  }
  const checkWinnerFrom = (board) => {
    //horizontal
    for(let i = 0; i < 42; i+=7){
      for(let j = 0; j < 4; j++){
        if(board[i+j] && board[i+j] == board[i+j+1] && board[i+j] == board[i+j+2] && board[i+j] == board[i+j+3]){
          return board[i+j];
        }
      }
    }
    //vertical
    for(let i = 0; i < 7; i++){
      for(let j = 0; j < 21; j+=7){
        if(board[i+j] && board[i+j] == board[i+j+7] && board[i+j] == board[i+j+14] && board[i+j] == board[i+j+21]){
          return board[i+j];
        }
      }
    }
    //diagonal
    for(let i = 0; i < 21; i+=7){
      for(let j = 0; j < 4; j++){
        if(board[i+j] && board[i+j] == board[i+j+8] && board[i+j] == board[i+j+16] && board[i+j] == board[i+j+24]){
          return board[i+j];
        }
      }
    }
    for(let i = 0; i < 21; i+=7){
      for(let j = 3; j < 7; j++){
        if(board[i+j] && board[i+j] == board[i+j+6] && board[i+j] == board[i+j+12] && board[i+j] == board[i+j+18]){
          return board[i+j];
        }
      }
    }
    return null;
  }
  const updateBoard = (index) => {
    /* # # # # # # #
       # # # # # # #
       # # # # # # #
       # # # # # # #
       # # # # # # #
       # # # # # # #
    */ 
    if(board[index] || winner) return;
    const newBoard = [...board];
    if (index < 35){
      let new_index = index%7 + 35;
      while(newBoard[new_index] != null){
        new_index -= 7
      }
      newBoard[new_index] = turn;
      console.log(newBoard[new_index], new_index)
    }else{
      let new_index = index;
      newBoard[new_index] = turn;
      console.log(newBoard[new_index], index)
    }
    setTurn(turn == TURNS.R ? TURNS.B : TURNS.R);
    setBoard(newBoard);
    const newWinner = checkWinnerFrom(newBoard);
    if(newWinner){
      //La actualización de los estados es asíncrona
      setWinner(newWinner);
      setWins((prevWins) => ({
        ...prevWins,
        [newWinner]: prevWins[newWinner] + 1,
      }));    
    }else if(checkEndGame(newBoard)){
      setWinner(false);
    }
  }
  const [turn, setTurn] = useState(TURNS.R);
  const [board, setBoard] = useState(Array(42).fill(null));
  return (
    <>
    <section className="info-section">
      <h2>Turn</h2>
      <div className='turn'>
        <Circle turn={turn} />
        {turn == TURNS.R && <h2>Red</h2>}
        {turn == TURNS.B && <h2>Blue</h2>}
      </div>
      <div className='win-info'>
        <h2>Wins</h2>
        <h3>Red: {wins.R}</h3>
        <h3>Blue: {wins.B}</h3>
        <button onClick={resetGame}>Reset</button>
      </div>
    </section>
    <section className="game">
    <header className="game-header">
      <h1 className="game-title">Connect 4</h1>
    </header>
    <div className="game-board">
      {board.map((_, index) => (
        <Circle key={index} index={index} updateBoard={updateBoard}turn ={board[index]}/>
      ))}
    </div>
    <WinnerModal winner={winner} resetGame={resetGame}/>
  </section>    
  </>
  )
}

export default App