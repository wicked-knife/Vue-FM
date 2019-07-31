import axios from 'axios'

export function getChannelTypeData (typeId, page) {
  return axios({
    url: 'https://api.imjad.cn/qqfm/v1/',
    params: {
      type: 'album',
      page_size: '10',
      id: typeId,
      page
    }
  })
}

export function getShowPlaylist (showId) {
  return axios({
    url: 'https://api.imjad.cn/qqfm/v1/',
    params: {
      type: 'show',
      id: showId
    }
  })
}

export function getPlaylistItem (id, start, list) {
  var paramStr = _handleListToString(start, list)
  return axios({
    url: 'https://api.imjad.cn/qqfm/v1/',
    params: {
      type: 'skip_show',
      id,
      shows: paramStr
    }
  })
}
const LENGTH = 10
function _handleListToString (start, list) {
  var end = start + LENGTH
  var fixedList = list.slice(start, end)
  return fixedList.join(',')
}
