const initialSpriteState = {
  sprites: [
    {id:1, name: 'guitar', url: 'https://image.flaticon.com/icons/png/128/26/26843.png'},
    {id:2, name: 'drums', url: 'https://image.flaticon.com/icons/svg/27/27328.svg'},
    {id:3, name: 'piano', url: 'https://image.flaticon.com/icons/svg/27/27066.svg'},
    {id:4, name: 'drums2', url: 'https://image.flaticon.com/icons/svg/26/26995.svg'},
    {id:5, name: 'headphones', url: 'https://image.flaticon.com/icons/svg/26/26834.svg'}
  ],
  canvasSprites: [],
  selectedSprite: {}
};

export default function spriteReducer(state = initialSpriteState, action) {
  let index
  let sprite
  switch(action.type) {
    case 'CHANGE_SPRITE':
      return {...state, sprites: [...state.sprites, action.payload] };
    case 'ADD_SPRITE':
      return {...state, canvasSprites: [...state.canvasSprites, action.payload.selectedSprite]}
    case 'SELECT_SPRITE':
      return {...state, selectedSprite: action.payload.selectedSprite}
    case 'SELECT_SOUND':
      index = state.canvasSprites.findIndex( sprite => sprite.uniqueKey === action.payload.uniqueKey)
      sprite = state.canvasSprites[index]
      return {
        ...state,
        selectedSprite: {...state.selectedSprite, selectedSound: {...action.payload.selectedSound, url: action.payload.url}},
        canvasSprites: [
        ...state.canvasSprites.splice(0, index),
        Object.assign({}, sprite, { selectedSound: action.payload.selectedSound }),
        ...state.canvasSprites.splice(index + 1)
      ]}
    default:
      return state;
  }
}
