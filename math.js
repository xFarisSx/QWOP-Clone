function subtract(A, B){
    return {
        x: A.x- B.x, 
        y: A.y- B.y, 
    }
}
function add(A, B){
    return {
        x: A.x+ B.x, 
        y: A.y+ B.y, 
    }
}

function distance(A, B){
    return ((A.y - B.y)**2 + (A.x - B.x)**2)**0.5
}
function scale(A, c){
    return {
        x:A.x*c,
        y:A.y*c,
    }
}

function magnitude(A){
    return (A.y**2 + A.x**2)**0.5
}
function normalize(A){
    return scale(A, 1/magnitude(A))
}