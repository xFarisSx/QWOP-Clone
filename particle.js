class Particle {
  constructor(loc, deltaX) {
    this.loc = loc;
    this.oldLoc = { x: loc.x + deltaX, y: loc.y+deltaX };
  }

  emphasize(ctx){
    ctx.beginPath()
    ctx.arc(this.loc.x, this.loc.y, 5, 0, Math.PI* 2)
    ctx.fill()
  }

  equals(p){
    return (p.loc == this.loc)
  }

  update() {
    const vel = subtract(this.loc, this.oldLoc);
    let newLoc = add(this.loc, vel);
    newLoc = add(newLoc, Physics.G);
    this.oldLoc = this.loc;
    this.loc = newLoc;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.loc.x, this.loc.y, 5, 0, Math.PI * 2);
    ctx.stroke();
  }
}
