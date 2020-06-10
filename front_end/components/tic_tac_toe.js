'use strict';
import { html, Component, render } from 'https://unpkg.com/htm/preact/standalone.module.js';

class TicTacToe extends Component {

  constructor(props) {
    super(props);
    this.state = this.__initialState();
  }

  __nextPlayer() {
    const { currentPlayer } = this.state;
    return currentPlayer == 'X' ? 'O' : 'X'
  }

  __deepCloneArray_DIRTY(array) {
    return JSON.parse(JSON.stringify(array))
  }

  __initialState() {
    return {
      grid: [['','',''],['','',''],['','','']],
      currentPlayer: 'X',
    }
  }

  resetGame() {
    this.setState(this.__initialState());
  }

  __winner() {
    const grid = this.state.grid;
    for (let x = 0; x < 3; x++) {
      if (grid[x][0] != '' && grid[x][0] === grid[x][1] && grid[x][2] === grid[x][0]) {
        return grid[x][0]
      }
    }
    for (let y = 0; y < 3; y++) {
      if (grid[0][y] != '' && grid[0][y] === grid[1][y] && grid[2][y] === grid[0][y]) {
        return grid[0][y]
      }
    }
    if (
      grid[1][1] != '' &&
      ((grid[0][0] === grid[1][1] && grid[2][2] === grid[1][1]) ||
      (grid[0][2] === grid[1][1] && grid[2][0] === grid[0][2]))
    ) {
      return grid[1][1]
    }
    return null
  }

  __gridFull() {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (this.state.grid[x][y] == '') {
          return false;
        }
      }
    }
    return true;
  }

  play(x, y) {
    const { grid, currentPlayer } = this.state;
    let newGrid = this.__deepCloneArray_DIRTY(grid);
    newGrid[x][y] = currentPlayer;
    this.setState({
      grid: newGrid,
      currentPlayer: this.__nextPlayer(),
    });
  }

  requestNextMove() {
    const data = {
      you: this.state.currentPlayer,
      grid: this.state.grid
    }
    // call on API
    fetch('http://127.0.0.1:5000/api/v1/tictactoe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(({play, error}) => {
      if (error != undefined) {
        console.error('Error from API:', error);
      } else {
        this.play(play[0], play[1]);
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }

  render() {
    const winner = this.__winner()
    const gameOver = winner || this.__gridFull()
    return html`
      <div class="tic_tac_toe">
        <button onClick=${() => this.resetGame()}> New Game </button>
        <button onClick=${() => this.requestNextMove()} disabled=${gameOver}> Get next move </button>
        <div id="grid">
          ${ winner ? html`<p>${winner}'s have won!</p>` : null}
          <${Table} grid="${this.state.grid}" playFun=${gameOver ? ()=>{} : (x,y) => this.play(x,y)}/>
        </div>
      </div>
    `;
  }
}

const Table = ({grid, playFun}) => html`
<table>
  ${grid.map((row, index) => html`
    <${Row} row=${row} playFun=${playFun} x=${index}/>
  `)}
</table>
`;

const Row = ({row, playFun, x}) => html`
  <tr>
  ${row.map((cell, index) => html`
    <${Cell} content=${cell} x=${x} y=${index} playFun=${playFun}/>
  `)}
  </tr>
`;

const Cell = ({ content, x, y, playFun }) => html`<td onClick=${() => playFun(x, y)}>${content || ''}</td>`

export { TicTacToe as default};