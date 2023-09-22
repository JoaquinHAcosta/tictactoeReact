import { useState } from "react"
import confetti from 'canvas-confetti'

const TURNS = {
  X: 'x',
  O: 'o'
}

const Square = ({ isSelected, children, updateBoard, index}) => {
  const className = `square ${isSelected ? 'is-selected' : '' }`

  const handleClick = () => {
    updateBoard(index)
  }
  return (
    <div className={className} onClick={handleClick}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [ 0, 1, 2],
  [ 3, 4, 5],
  [ 6, 7, 8],
  [ 0, 3, 6],
  [ 1, 4, 7],
  [ 2, 5, 8],
  [ 0, 4, 8],
  [ 2, 4, 6]
]

function App() {

const [ board, setBoard] = useState(Array(9).fill(null))

const [ turn, setTurn ] = useState(TURNS.X)
const [ winner, setWinner ] = useState(null)

const checkWinner = (boardToCheck) => {
  //se revisan las combinaciones ganadoras
  // para saber si gano x u o
  for(const combo of WINNER_COMBOS) {
    const [ a, b, c ] = combo
    if (
      boardToCheck[a] && // 0 -> x u o
      boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]
    ) {
      return boardToCheck[a] // x u o
    }
  }
  //si no hay ganador
  return null
}

const checkEndGame = (newBoard) => {
  // revisamos si hay empate
  // si no hay mas espacios vacios en el tablero
  return newBoard.every((square) => square !== null)
}
  
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
  const newWinner = checkWinner(newBoard)
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

      <section>
        {
          winner !== null && (
            <section className='winner'>
              <div className='text'>
                <h2>
                  {
                    winner === false
                      ? 'Empate'
                      : `Ganó:`
                  }
                </h2>

                <header className='win'>
                  { winner && <Square>{winner}</Square>}
                </header>

                <footer>
                  <button onClick={() => {resetGame()}}>Start again</button>
                </footer>
              </div>
            </section>
          )
        }
      </section>
    </main>
  )
}

export default App
