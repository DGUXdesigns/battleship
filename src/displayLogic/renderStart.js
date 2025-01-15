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
    const div = document.createElement('div');
    const label = document.createElement('label');
    label.htmlFor = 'name';
    label.innerText = 'Enter player name:';

    const input = document.createElement('input');
    input.id = 'name';
    input.type = 'text';
    input.name = 'name';
    input.placeholder = 'Captain';
    input.required = true;

    const button = document.createElement('button');
    button.type = 'submit';
    button.innerText = 'Start Game';

    div.append(label, input);
    form.append(div, button);

    return form;
  }
}
