export const channel = state => state.channel

export const channelType = state => state.channelType

export const show = state => state.show

export const fullScreen = state => state.fullScreen

export const playingState = state => state.playingState

export const currentAudio = (state) => {
  if (state.show.audioList) {
    return state.show.audioList[state.currentIndex] || {}
  }
}

export const playerShow = state => state.playerShow

export const currentIndex = state => state.currentIndex

export const favoriteList = state => state.favoriteList

export const listenedList = state => state.listenedList
