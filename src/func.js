export function radToDeg(a){
    return(a *Math.PI)/180;
}
export function drawMap(obj,ctx,size =10){
    obj.map(({x,y})=>{
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.rect(x,y,-size,-size);
        ctx.fill();
        ctx.closePath();
    })
}
export function lengthVector2d(x1,y1,x2,y2){
    return Math.sqrt(Math.pow((x2-x1),2)+Math.pow((y2-y1),2));
}
export function filterProps(obj, radius,xCamera,yCamera){
    return obj.filter(({x,y,sizeX,sizeY})=>{
        if(lengthVector2d(xCamera,yCamera,x,y)<=radius)return true;
        const size = lengthVector2d(x,y,sizeX,sizeY);
        if(lengthVector2d(xCamera,yCamera,x,y)<=radius+size&&size>=radius)return true;
        return false;
    })
}
export function drawRectColor(ctx,color,x,y,w,h){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.rect(x,y,w,h);
    ctx.fill();
    ctx.closePath();
}
export function imgWithSrc(texture){
    const img = new Image();
    img.src = texture;
    return img;
}