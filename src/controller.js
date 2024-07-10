export function isPause(pause,func){
    if(!pause)return func;
}

export function onDownController(keyDown){
    document.addEventListener("keydown",e=>{
       keyDown.map(({key,func})=>{
           if(e.code === key)func(e);
       })
    })
}
export function onMouseController(camera){
    document.addEventListener("mousemove",e=>{
      camera.turn(e.movementX)
    })
}