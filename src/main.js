import {conf} from "./conf.js";
import {Color} from "./color.js";
import {Box} from "./box.js";
import {isPause, onDownController, onMouseController} from "./controller.js";
import {Camera} from "./camera.js";
import {drawRectColor, imgWithSrc, radToDeg} from "./func.js";
import {Sprite} from "./sprite.js";

const {width,height} = conf;
const app = document.getElementById("app");
const canvas = document.createElement("canvas");
const ctx = canvas.getContext('2d');
canvas.width = width;
canvas.height = height;
app.append(canvas);
var pause = false;
const texture = "/src/assets/image/stone.png";
const enemy = "/src/assets/image/enemy.png";
const door = "/src/assets/image/door.png";
const COLOR ={
    BLACK:new Color(0,0,0),
    WHITE:new Color(255,255,255),
    GREEN:new Color(0,255,0),
    BLUE:new Color(0,0,255),
    RED:new Color(255,0,0)
}
const doorBox =new Box(10,10,imgWithSrc(texture),1,1);
const doorBox2 =new Box(20,34,imgWithSrc(door),1,0.1);

const mapWall = [new Box(20,30,COLOR.BLUE),doorBox,doorBox2];
const camera = new Camera(20,20,60,0.2);

const keyDown = [
    {
        key:"Space",
        func:(e)=>{pause =!pause;update();}
    },
    {
        key: "KeyE",
        func:(e)=>{isPause(pause,(e)=>{
            doorBox.setPosition(camera.x,camera.y);
        })(e)}
    },
    {
        key: "KeyQ",
        func:(e)=>{isPause(pause,(e)=>{
            doorBox.smoothAddPosition(1,1,1);
        })(e)}
    }
];
const directionMove = {
    KeyA: 270,
    KeyD: 90,
    KeyS: 180,
    KeyW: 0,
}
for (let [key, value] of Object.entries(directionMove)) {
    keyDown.push({
        key:key,
        func:()=>{isPause(pause,()=>camera.move(value))()}
    })
}
onDownController(keyDown);
onMouseController(camera);
function update(){
    drawRectColor(ctx,"gray",0,0,width,height/2);
    drawRectColor(ctx,"black",0,height/2,width,height/2);
    camera.render(ctx,width,height,[...mapWall]);
    if(pause)return 0;
    requestAnimationFrame(update)
}
update();