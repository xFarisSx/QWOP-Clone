class Segment{
    constructor(pA, pB){
        this.pA = pA
        this.pB = pB
        if(pA?.loc && pB?.loc){
            this.length = distance(pA.loc, pB.loc)

        } else {
            this.update = ()=>{
                
            }
            this.draw = ()=>{

            }
            this.contains = ()=>{

            }
            this.pA = null
            this.pB = null
        }
    }

    contains(p){
        return (this.pA.equals(p) || this.pB.equals(p))
    }

    update(){
        const newLength = distance(this.pA.loc, this.pB.loc)
        const lenDiff = newLength-this.length
        const norm = normalize(subtract(this.pA.loc, this.pB.loc))

        this.pA.loc = add(this.pA.loc, scale(norm, -lenDiff/2))
        this.pB.loc = add(this.pB.loc, scale(norm, lenDiff/2))

    }

    draw(ctx){
        ctx.beginPath()
        ctx.moveTo(this.pA.loc.x, this.pA.loc.y)
        ctx.lineTo(this.pB.loc.x, this.pB.loc.y)
        ctx.stroke()
    }
}