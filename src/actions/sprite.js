export function addSprite(selectedSprite){
  return {type:'ADD_SPRITE',payload:{selectedSprite:selectedSprite}}
}

export function selectSprite(selectedSprite){
  return {type:'SELECT_SPRITE',payload:{selectedSprite:selectedSprite}}
}
