export function setSprites(sprites){
  return {
    type:'SET_SPRITES',
    sprites
  }
}

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

export function clearSelected(){
  return {
    type:'CLEAR_SELECTED'
  }
}

export function setSpritePosition(uniqueKey,position){
  return {
    type:'SET_SPRITE_POSITION',
    payload: {uniqueKey,position}
  }
}
