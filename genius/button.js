class Button {
  constructor(id) {
    this.id = id;
  }

  click() {
    throw new Error("Not implemented");
  }

  setGame(game) {
    this.game = game;
    return this;
  }

  emit() {
    this.game._click(this.id);
  }
}

class HtmlButton extends Button {
  constructor(id) {
    super(id);
    this.btn = document.getElementById(id);
    this.btn.onclick = () => this.click();
  }

  click() {
    this.emit();
    this.btn.classList.add("selected");

    setTimeout(() => {
      this.btn.classList.remove("selected");
    }, 500);
  }
}
