import store from 'store'

const FAVORITE_KEY = '__favorite_FM_list__'
const LISTENED_KEY = '__listened_FM_list__'

const MAX_LENGTH = 100

export function storeFavoriteList (list) {
  if (list.length > MAX_LENGTH) {
    list.pop()
  }
  store.set(FAVORITE_KEY, list)
}

export function storeListenedList (list) {
  if (list.length > MAX_LENGTH) {
    list.pop()
  }
  store.set(LISTENED_KEY, list)
}

export function takeOutFavoriteList () {
  var thing = store.get(FAVORITE_KEY)
  if (thing) {
    return thing
  }
  return []
}

export function takeOutListenedList () {
  var thing = store.get(LISTENED_KEY)
  if (thing) {
    return thing
  }
  return []
}
