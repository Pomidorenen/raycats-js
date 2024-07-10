import {Color} from "./color.js";

export class Box{
    constructor(x,y,texture,sizeX=1,sizeY=1) {
        this.x = x;
        this.y = y;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
        if(texture instanceof Color)this.color = texture;
        if(texture instanceof Image)this.image = texture;
    }
    setPosition(x,y){
        this.x = x;
        this.y = y;
    }
    smoothAddPosition(x,y,time){
        for(let i=0;i<time*33;i++){
            setTimeout(()=>{
                console.log(this.x,this.y)
                this.addPosition(x/33,y/33);
            },33*i);
        }
    }
    addPosition(x,y){
        this.x += x;
        this.y += y;
    }
}