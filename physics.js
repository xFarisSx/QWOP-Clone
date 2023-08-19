class Physics{
    static G = {x:0, y: 0.02}
    static rigidity = 5
    constructor(particles, segments, floorY){
        this.particles = particles
        this.segments = segments
        this.floorY = floorY
    }

    update(ctx){
        for (const p of this.particles){
            p.update()
        }
        for(let i = 0; i<Physics.rigidity;i++){
            for (const s of this.segments){
                s.update()
            }

        }

        for (const p of this.particles){
            if(p.loc.y > this.floorY){
                p.loc.y = this.floorY
            }
        }

        for (const p of this.particles){
            p.draw(ctx)
        }
        for (const s of this.segments){
            s.draw(ctx)
        }
    }
}