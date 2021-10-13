class Game {
  constructor(picker, ...buttons) {
    this.buttons = buttons.map((button) => button.setGame(this));
    this.picker = picker;
  }

  start() {
    this.sequence = [];
    this.level = 0;
    this.nextLevel();
  }

  setRender(render) {
    this.render = render;
  }

  nextLevel() {
    this.level++;
    this.userSequence = [];
    this.nextId();
    if (this.render) this.render();
  }

  nextId() {
    return this.sequence.push(this.picker(this.buttons));
  }

  _click(buttonId) {
    if (this.isRightButton(buttonId)) return this.start();

    this.userSequence.push(buttonId);

    if (this.isNextLevel) this.nextLevel();
  }

  get isNextLevel() {
    return this.userSequence.length === this.sequence.length;
  }

  isRightButton(buttonId) {
    return this.sequence[this.userSequence.length] !== buttonId;
  }
}
