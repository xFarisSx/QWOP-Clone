class Controls {
  constructor() {
    this.qD = false;
    this.wD = false;
    this.oD = false;
    this.pD = false;

    this.#addEventListeners();
  }
  #addEventListeners() {
    window.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "q":
          this.qD = true;
          break;
        case "w":
          this.wD = true;
          break;
        case "o":
          this.oD = true;
          break;
        case "p":
          this.pD = true;
          break;
        default:
          break;
      }
    });
    window.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "q":
          this.qD = false;
          break;
        case "w":
          this.wD = false;
          break;
        case "o":
          this.oD = false;
          break;
        case "p":
          this.pD = false;
          break;
        default:
          break;
      }
    });
  }
}
