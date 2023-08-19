class Skeleton {
  constructor(particles, segments) {
    this.particles = particles;
    this.segments = segments;

    this.frontSpread = 0;
    this.backSpread = 0;

    this.frontTop = physics.segments[45];
    this.frontMid = physics.segments[47];
    this.frontBottom = physics.segments[41];
    this.min = {
      frontTop: 85,
      frontMid: 50,
      frontBottom: 80,
    };
    this.max = {
      frontTop: 104,
      frontMid: 80,
      frontBottom: 90,
    };
  }
}
