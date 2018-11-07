const initialSoundState = {
  sounds: [
    {id:1, name: 'guitar sound', url: 'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3'},
    {id:2, name: 'drums sound', url: 'https://storage.googleapis.com/media-session/sintel/snow-fight.mp3'},
    {id:3, name: 'piano sound', url: 'https://storage.googleapis.com/media-session/big-buck-bunny/prelude.mp3'},
    {id:4, name: 'drums2 sound', url: 'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3'},
    {id:5, name: 'headphones sound', url: 'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3'}
  ],
  selectedSound: {}
};

export default function soundReducer(state = initialSoundState, action) {
  switch(action.type) {
    case 'PLAY_SOUND':
      return {}
    case 'SELECT_SOUND':
      return {...state, selectedSound: action.payload.selectedSound}
    default:
      return state;
  }
}
