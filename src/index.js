import './stylesheet.css';
import { Player } from './scripts/player';
import { Ship } from './scripts/ship';
import { StartScreen } from './displayLogic/renderStart';
import { setError } from './displayLogic/formHandling';
import { GameUI } from './displayLogic/renderGame';

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
    name.value = '';

    // Initialize players
    const player1 = new Player(playerName);
    const player2 = new Player('computer');

    // Place ships on the boards
    const carrier = new Ship('Carrier', 5);
    const battleship = new Ship('Battleship', 4);
    const cruiser = new Ship('Cruise', 4);
    const submarine = new Ship('Submarine', 3);
    const destroyer = new Ship('destroyer', 3);

    // Place ships on the board
    player1.gameboard.placeShip(carrier, 0, 0, 'vertical');
    player1.gameboard.placeShip(battleship, 2, 5, 'horizontal');
    player1.gameboard.placeShip(cruiser, 6, 2, 'vertical');
    player1.gameboard.placeShip(submarine, 4, 7, 'horizontal');
    player1.gameboard.placeShip(destroyer, 8, 5, 'horizontal');

    player2.gameboard.placeShip(carrier, 0, 0, 'vertical');
    player2.gameboard.placeShip(battleship, 2, 5, 'horizontal');
    player2.gameboard.placeShip(cruiser, 6, 2, 'vertical');
    player2.gameboard.placeShip(submarine, 4, 7, 'horizontal');
    player2.gameboard.placeShip(destroyer, 8, 5, 'horizontal');

    const render = new GameUI('main', player1, player2);
    render.initGame();
  });
});

startScreen.render();
