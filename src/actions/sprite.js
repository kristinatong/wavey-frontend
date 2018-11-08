export function addSprite(sprite){
  return {
    type:'ADD_SPRITE',
    sprite
  }
}

export function selectSprite(uniqueKey){
  return {
    type:'SELECT_SPRITE',
    uniqueKey
  }
}
