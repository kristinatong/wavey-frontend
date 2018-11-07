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

export function selectSound(selectedSound, uniqueKey) {
  return {
    type: 'SELECT_SOUND',
    payload: {
      selectedSound: selectedSound,
      uniqueKey: uniqueKey
    }
  }
}
