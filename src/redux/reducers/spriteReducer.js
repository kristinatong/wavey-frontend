const initialSpriteState = {
  sprites: [
    {id:1, name: 'guitar', url: 'https://image.flaticon.com/icons/png/128/26/26843.png'},
    {id:2, name: 'drums', url: 'https://image.flaticon.com/icons/svg/27/27328.svg'},
    {id:3, name: 'piano', url: 'https://image.flaticon.com/icons/svg/27/27066.svg'},
    {id:4, name: 'drums2', url: 'https://image.flaticon.com/icons/svg/26/26995.svg'},
    {id:5, name: 'headphones', url: 'https://image.flaticon.com/icons/svg/26/26834.svg'}
  ],
  canvasSprites: [],
  selectedSprite: {id:4, name: 'drums2', url: 'https://image.flaticon.com/icons/svg/26/26995.svg'}
};

export default function spriteReducer(state = initialSpriteState, action) {
  switch(action.type) {
    case 'CHANGE_SPRITE':
      return {...state, sprites: [...state.sprites, action.payload] };
    case 'ADD_SPRITE_TO_CANVAS':
      return {...state, canvasSprites: [...state.canvasSprites, action.payload.selectedSprite]}
    default:
      return state;
  }
}
