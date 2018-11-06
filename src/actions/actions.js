export default function changeSprite(x,y){
  debugger
  return {type:'CHANGE_SPRITE',payload:{x:x,y:y}}
}

export function addSprite(selectedSprite){
  return {type:'ADD_SPRITE_TO_CANVAS',payload:{selectedSprite:selectedSprite}}
}
