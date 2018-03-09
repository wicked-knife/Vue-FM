export function createAudio (audioObj) {
  return new Audio(audioObj)
}

class Audio {
  constructor (audioObj) {
    this.audioUrl = audioObj.audioURL.urls[0].url
    this.createTime = audioObj.createTime
    this.duration = audioObj.duration
    this.playCount = audioObj.playNum
    this.name = audioObj.name
    this.id = audioObj.showID
  }
}
