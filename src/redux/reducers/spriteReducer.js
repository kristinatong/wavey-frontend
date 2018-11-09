const defaultSpriteState = {
  // sprites: [
  //   {id:1, name: 'guitar', url: 'https://image.flaticon.com/icons/png/128/26/26843.png'},
  //   {id:2, name: 'drums', url: 'https://image.flaticon.com/icons/svg/27/27328.svg'},
  //   {id:3, name: 'piano', url: 'https://image.flaticon.com/icons/svg/27/27066.svg'},
  //   {id:4, name: 'drums2', url: 'https://image.flaticon.com/icons/svg/26/26995.svg'},
  //   {id:5, name: 'headphones', url: 'https://image.flaticon.com/icons/svg/26/26834.svg'}
  // ],
  sprites: [],
  canvasSprites: [],
  selectedSprite: {}
};

export default function spriteReducer(state = defaultSpriteState, action) {
  let index
  let sprite
  switch(action.type) {
    case 'SET_SPRITES':
      return {...state, sprites: action.sprites}
    case 'ADD_SPRITE':
      return {...state, canvasSprites: [...state.canvasSprites, action.sprite], selectedSprite:action.sprite}
    case 'SELECT_SPRITE':
      const findSprite = state.canvasSprites.find(sprite => sprite.uniqueKey === action.uniqueKey)
      return {...state, selectedSprite: findSprite}
    case 'SELECT_SOUND':
      index = state.canvasSprites.findIndex( sprite => sprite.uniqueKey === action.payload.uniqueKey)
      sprite = state.canvasSprites[index]
      return {
        ...state,
        selectedSprite: {...state.selectedSprite, sound: {...action.payload.selectedSound, url: action.payload.url}},
        canvasSprites: [
          ...state.canvasSprites.slice(0,index),
          Object.assign({},sprite,{sound:{...action.payload.selectedSound,url:action.payload.url}}),
          ...state.canvasSprites.slice(index+1)
        ]
    }
    default:
      return state;
  }
}
