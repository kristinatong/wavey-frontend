const defaultSoundState = {
  // sounds: [
  //   {id:1, name: 'bodak yellow', url: 'http://1604ent.com/wp-content/uploads/2017/10/Cardi_B_-_Bodak_Yellow_1604Ent.com.mp3'},
  //   {id:2, name: 'in my feelings', url: 'http://1604ent.com/wp-content/uploads/2018/08/Drake_-_In_My_Feelings_1604Ent.com.mp3'},
  //   {id:3, name: 'piano sound', url: `http://localhost:3000/rails/active_storage/disk/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaDEwUVdoeFdqZHhOV3RIYUZsWE4wVmhZamRTYXpJMFpVNEdPZ1pGVkE9PSIsImV4cCI6IjIwMTgtMTEtMDdUMTU6Mzk6MzUuNTI3WiIsInB1ciI6ImJsb2Jfa2V5In19--ca335fc176630708bf50141520a9c900347d6db4/Latryx%20-%20Lady%20Don't%20Tek%20No.mp3?content_type=audio%2Fmpeg&disposition=inline%3B+filename%3D%22Latryx+-+Lady+Don%2527t+Tek+No.mp3%22%3B+filename%2A%3DUTF-8%27%27Latryx%2520-%2520Lady%2520Don%2527t%2520Tek%2520No.mp3`},
  //   {id:4, name: 'drums2 sound', url: 'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3'},
  //   {id:5, name: 'headphones sound', url: 'https://storage.googleapis.com/media-session/elephants-dream/the-wires.mp3'}
  // ],
  sounds: [],
  selectedSound: {},
  djMode: false,
  stopVideo: true
};

export default function soundReducer(state = defaultSoundState, action) {
  switch (action.type) {
    case 'SET_SOUNDS':
      return { ...state,
        sounds: action.sounds
      }
    case 'CHANGE_DJ_MODE':
      // debugger
      // if(!state.djMode===true){
      //   stopVideo = false
      // }else{
      //   stopVideo = true
      // }
      return { ...state,
        djMode: !state.djMode,
        stopVideo: !state.stopVideo
      }
    case 'PLAY_SOUND':
      return {}
      // case 'SELECT_SOUND':
      // return {...state, selectedSound: {...action.payload.selectedSound, url: action.payload.url}}
    default:
      return state;
  }
}
