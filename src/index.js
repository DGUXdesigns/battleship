import './stylesheet.css';
import { Ship } from './scripts/ship';
import { Gameboard } from './scripts/gameboard';
import { Player } from './scripts/player';
import { StartScreen } from './displayLogic/renderStart';
import { setError } from './displayLogic/formHandling';

const startScreen = new StartScreen('main');

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('start-form');
  const name = document.getElementById('name');

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (name.value === '') {
      setError('Please enter a name');
    }

    const playerName = name.value.trim();

    const player = new Player(playerName);
    const AI = new Player('computer');

    name.value = '';
  });
});

startScreen.render();
