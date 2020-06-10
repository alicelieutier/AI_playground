'use strict';
import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js';
import TicTacToe from './components/tic_tac_toe.js';

const App = () => html`
  <div class="app">
      <${TicTacToe} />
      <footer><a href="https://github.com/alicelieutier/AI_playground">Find me on Github</a></footer>
  </div>
  `;

render(html`<${App} />`, document.body);
