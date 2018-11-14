export function setSounds(sounds) {
  return {
    type: 'SET_SOUNDS',
    sounds
  }
}

export function playSound() {
  return {
    type: 'PLAY_SOUND',
    payload: {}
  }
}

export function selectSound(selectedSound, uniqueKey, url, loop) {
  return {
    type: 'SELECT_SOUND',
    payload: {selectedSound, uniqueKey, url, loop}
  }
}

export function loopSound() {
  return {
    type: 'LOOP_SOUND',
  }
}

export function changeDJMode(){
  return {
    type: 'CHANGE_DJ_MODE'
  }
}
