import {takeOutFavoriteList, takeOutListenedList} from '@/common/js/cache'

const state = {
  channel: {},
  channelType: {},
  show: {},
  fullScreen: false,
  playingState: false,
  currentIndex: 0,
  playerShow: false,
  favoriteList: takeOutFavoriteList(),
  listenedList: takeOutListenedList()
}

export default state
