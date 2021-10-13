const Button = require("./button");

class FakeButton extends Button {
  constructor(id) {
    super(id);
    this.timesClicked = 0;
  }
  click() {
    this.timesClicked++;
    this.emit();
  }
}

function pickLinearSeq() {
  let i = 0;
  return (arr) => arr[i++].id;
}

describe("test game", () => {
  let btnG, btnR, btnB, btnY, game;

  beforeEach(() => {
    btnG = new FakeButton("G");
    btnR = new FakeButton("R");
    btnB = new FakeButton("B");
    btnY = new FakeButton("Y");
    game = new Game(pickLinearSeq(), btnG, btnR, btnB, btnY);
    game.start();
  });

  it("Should increment the sequence when game is started", () => {
    expect(game.sequence).toHaveLength(1);
    expect(["G", "R", "B", "Y"]).toContain(game.sequence[0]);
  });

  it("Should pass to next level when user choose a rigth sequence", () => {
    btnG.click();
    expect(game.level).toBe(2);
    expect(game.sequence).toHaveLength(2);
    expect(btnG.timesClicked).toBe(1);
  });

  it("Should pass to next level  when user choose a rigth sequence", () => {
    btnG.click();

    btnG.click();
    btnR.click();

    expect(game.level).toBe(3);
    expect(game.sequence).toHaveLength(3);

    expect(btnG.timesClicked).toBe(2);
    expect(btnR.timesClicked).toBe(1);
  });

  it("Should pass to next level  when user choose a rigth sequence", () => {
    btnG.click();

    btnG.click();
    btnR.click();

    btnG.click();
    btnR.click();
    btnB.click();

    expect(game.level).toBe(4);
    expect(game.sequence).toHaveLength(4);

    expect(btnG.timesClicked).toBe(3);
    expect(btnR.timesClicked).toBe(2);
    expect(btnB.timesClicked).toBe(1);
  });

  it("Should reset the game when user choose a wrong sequence", () => {
    btnR.click();
    expect(game.level).toBe(1);
    expect(game.sequence).toHaveLength(1);
  });

  it("Should reset the game when user choose a wrong sequence", () => {
    btnG.click();

    btnG.click();
    btnR.click();

    btnG.click();
    btnR.click();
    btnR.click();

    expect(game.level).toBe(1);
    expect(game.sequence).toHaveLength(1);
  });
});
