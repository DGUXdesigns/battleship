export class StartScreen {
  constructor(container) {
    this.container = document.querySelector(container);
  }

  render() {
    this.container.innerHTML = '';
    const form = this.createForm();

    this.container.appendChild(form);
  }

  createForm() {
    const form = document.createElement('form');
    form.id = 'start-form';
    form.noValidate = true;

    const div = document.createElement('div');
    const label = document.createElement('label');
    label.htmlFor = 'name';
    label.innerText = 'Enter player name:';

    const input = document.createElement('input');
    input.id = 'name';
    input.type = 'text';
    input.name = 'name';
    input.placeholder = 'Combatant Name';
    input.required = true;

    const error = document.createElement('div');
    error.classList.add('error');

    const button = document.createElement('button');
    button.type = 'submit';
    button.innerText = 'Start Game';

    div.append(label, input, error);
    form.append(div, button);

    return form;
  }
}
