import {drawRectColor, filterProps, lengthVector2d, radToDeg} from "./func.js";
import {Color} from "./color.js";

export class Camera{
    constructor(x,y,fov,speed) {
        this.x = x;
        this.y = y;
        this.a = 0;
        this.speed = speed;
        this.fov = fov;
        this.step = 0.1;
        this.radius = 10;
    }
    render(ctx,width,height,obj){
        const {x,y,step,radius,a,fov} = this;
        const sizeWidth = width/fov;
        const halfHeight = height/2;
        const fovMed = fov/2;
        obj = filterProps(obj,radius,x,y);
        for (let i of Array(fov).keys()) {
            for (let j = step;j<radius;j+=step){
                let isCollision = false;
                const Xray =(Math.sin(radToDeg(i+a-fovMed))*j)+x;
                const Yray =(Math.cos(radToDeg(i+a-fovMed))*j)+y;
                const curHeight=(halfHeight/radius)*j;
                const sizeHeight = (halfHeight-curHeight)*2;
                const xPositionWidth = sizeWidth*i;
                obj.forEach(({x,y,color,image,sizeX,sizeY})=>{
                    if(isCollision)return;
                    const columnX1= x+sizeX;
                    const columnX2= x-sizeX;
                    const columnY1= y+sizeY;
                    const columnY2= y-sizeY;
                    if(((columnX2)<Xray)&&(Xray<(columnX1))&&((columnY2)<Yray)&&(Yray<(columnY1))){
                            if(color){
                                const alpha = color.a;
                                const tempColor = new Color(...color.toArray().map(el=>el/(j+1)));
                                tempColor.a = alpha;
                                drawRectColor(ctx,tempColor.toSting(),xPositionWidth,curHeight,sizeWidth+1,sizeHeight);
                                if(alpha === 1||image)isCollision = true;
                            }
                            if(image) {
                                const corner = [
                                    [columnX1, columnY1],
                                    [columnX2, columnY2]
                                ].sort(([xC1, yC1], [xC2, yC2]) => {
                                    return lengthVector2d(this.x, this.y, xC1, yC1) - lengthVector2d(this.x, this.y, xC2, yC2);
                                });
                                const hitX1 = (Xray - corner[1][0]) / (corner[0][0] - corner[1][0]);
                                const hitY1 = (Yray - corner[1][1]) / (corner[0][1] - corner[1][1]);
                                const texture = Math.floor(Math.min(...[hitX1, hitY1]) * image.width);
                                ctx.drawImage(image, texture, 0, 1, image.height, xPositionWidth, curHeight, sizeWidth, sizeHeight);
                                const color = new Color(...[0,0,0,1].map(el=>el/(j+1)));
                                color.a = 1-color.a;
                                drawRectColor(ctx,color.toSting(),xPositionWidth,curHeight,sizeWidth+1,sizeHeight);
                                isCollision = true;
                            }
                    }
                })
                if(isCollision)break;
            }
        }
    }
    move(a){
        const tempA = this.a + a;
        const x = Math.sin(radToDeg(tempA))*this.speed;
        const y = Math.cos(radToDeg(tempA))*this.speed;
        this.addPosition(x,y);
    }
    turn(a){
        this.a +=a;
    }
    setPosition(x,y){
        this.x = x;
        this.y = y;
    }
    addPosition(x,y){
        this.x += x;
        this.y += y;
    }
}