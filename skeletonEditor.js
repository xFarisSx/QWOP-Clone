class SkeletonEditor{
    constructor(canvas){
        this.canvas = canvas
        this.ctx=canvas.getContext("2d")
        this.particles = []
        this.segments = []

        this.selectedParticle = null
        this.draggingStart = false
        this.clickDistanceThreshold = 20
        
        this.#addEventListeners()
    }
    
    #addEventListeners(){
        this.canvas.addEventListener("mousedown", (e)=>{
            if (e.button == 0) {
                if(this.particles.length < 0) return
                let mousePos = {x:e.offsetX, y:e.offsetY}

                const nearest = this.#getNearestParticle(this.particles, mousePos)
                if(nearest && distance(nearest.loc, mousePos) < this.clickDistanceThreshold){

                    this.selectedParticle = nearest
                    this.draggingStart = true
                }
            }

        })
        this.canvas.addEventListener("mousemove", (e)=>{
            if (e.button == 0 && this.selectedParticle && this.draggingStart) {
                let mousePos = {x:e.offsetX, y:e.offsetY}
                this.selectedParticle.loc = mousePos
                this.selectedParticle.oldLoc = mousePos
                this.segments.filter((s) => {
                    return s.pA == this.selectedParticle || s.pB == this.selectedParticle
                }).forEach((s)=>{
                    s.length = distance(s.pA.loc, s.pB.loc)
                })
            }

        })
        this.canvas.addEventListener("mouseup", (e)=>{
            if (e.button == 0) {
                if(!this.draggingStart){
                    let mousePos = {x:e.offsetX, y:e.offsetY}
                    const newParticle = new Particle(mousePos, 0)
                    this.particles.push(newParticle)
                    this.selectedParticle = newParticle
                    
                } else {
                    
                }
                
                this.draggingStart = false
            }

        })

        this.canvas.addEventListener("contextmenu", (e)=>{
            e.preventDefault()
            let mousePos = {x:e.offsetX, y:e.offsetY}

            const nearest = this.#getNearestParticle(this.particles, mousePos)
            if(nearest && distance(nearest.loc, mousePos) < this.clickDistanceThreshold){

                if(this.selectedParticle == nearest){
                    for(let  i = 0; i < this.segments.length;i++){
                        if(this.segments[i].contains(this.selectedParticle)){
                            this.segments.splice(i, 1)
                        }
                    }
                    for(let  i = 0; i < this.particles.length;i++){
                        if(this.particles[i].equals(this.selectedParticle)){
                            this.particles.splice(i, 1)
                        }
                    }
                    this.selectedParticle = null

                } else if(this.selectedParticle == null){
                    this.selectedParticle = nearest
                } else {
                    let newSegment = new Segment(nearest, this.selectedParticle)
    
                    let exists = this.segments.find((s)=> {
                        return (newSegment.pA == s.pA && newSegment.pB == s.pB) || (newSegment.pA == s.pB && newSegment.pB == s.pA)
                    })
                    if(!exists){
                        this.segments.push(newSegment)
                        
                    } else {
                        console.log(this.segments.indexOf(exists))
                    }
                    this.selectedParticle = nearest
                }

            }
        })
    }

    reset(){
        this.particles = []
        this.segments = []
        this.selectedParticle = null
        this.draggingStart = false
    }

    #getNearestParticle(particles, loc){
        let nearest = particles[0]
        for(const p of particles){
            let pLoc = p.loc
            const dist = distance(loc, pLoc)
            if(dist< distance(loc, nearest.loc)){
                nearest = p
            }
        }
        return nearest
    }

    save(){
        const connections = this.segments.map((s) => {
            return {
                partAIndex: this.particles.indexOf(s.pA),
                partBIndex: this.particles.indexOf(s.pB),
            }
        })
        const particleLocations = this.particles.map(p=>p.loc)

        const toSave= {
            connections,
            particleLocations
        }
        localStorage.setItem("skeleton", JSON.stringify(toSave))
    }

    load(){
        this.reset()
        const {connections, particleLocations} = JSON.parse(localStorage.getItem("skeleton"))

        for(const pLoc of particleLocations){
            this.particles.push(new Particle(pLoc, 0))
        }
        for( const c of connections){
            this.segments.push( new Segment(this.particles[c.partAIndex], 
                this.particles[c.partBIndex]))
        }
    }

    draw(){
        for (const p of this.particles){
            p.draw(this.ctx)
        }
        for (const s of this.segments){
            s.draw(this.ctx)
        }

        if(this.selectedParticle){
            this.selectedParticle.emphasize(this.ctx)
        }
    }
}