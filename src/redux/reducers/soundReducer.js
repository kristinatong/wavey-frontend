const initialSoundState = {
  sounds: [
    {id:1, name: 'drum kit', url: 'https://image.flaticon.com/icons/png/128/26/26843.png'}
  ]
};


export default function userReducer(state = initialSoundState, action) {
  switch(action.type) {
    default:
      return state;
  }
}
