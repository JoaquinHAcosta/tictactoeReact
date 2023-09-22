import { useState } from "react"
import confetti, { reset } from 'canvas-confetti'

import Square from "./components/Square"
import { TURNS } from "./constants"
import { checkWinnerFrom } from "./logic/board"
import { WinnerModal } from "./components/WinnerModal"

function App() {

const [ board, setBoard] = useState(Array(9).fill(null))

const [ turn, setTurn ] = useState(TURNS.X)
const [ winner, setWinner ] = useState(null)


  
const updateBoard = (index) => {
  //si el spot esta ocupado no se actualiza
  //si hay ganador ya no se actualiza
  if(board[index] || winner) return

  //spread operator de lo que tiene el tablero
  //para que al actualizarlo no se pise la info
  const newBoard = [...board]
  newBoard[index] = turn
  setBoard(newBoard)

  //se cambia de turno
  const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
  setTurn(newTurn)

  // se revisa si hay un ganador
  const newWinner = checkWinnerFrom(newBoard)
  if(newWinner) { 
    confetti()
    setWinner(newWinner)
  } else if(checkEndGame(newBoard)) {
    setWinner(false) // empate
  }
}

const resetGame = () => {
  setBoard(Array(9).fill(null))
  setTurn(TURNS.X)
  setWinner(null)
}

  return ( 
    <main className='board'> 
      <h1>Tic Tac Toe</h1>
      <button onClick={resetGame}>Reset Board</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return (
            <Square
              key={index}
              index={index}
              updateBoard={updateBoard}
            >
              {board[index]}
            </Square>
          )})
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      
      <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
}

export default App
