export function createShow (show) {
  return new Show(show)
}

class Show {
  constructor (showObj) {
    this.id = showObj.albumID
    this.categoryName = showObj.categoryName
    this.categoryId = showObj.vecCate[0].categoryId
    this.cover = showObj.cover.urls[0].url
    this.desc = showObj.desc
    this.displayText = showObj.displayText
    this.playCount = showObj.playNum
    this.name = showObj.name
    this.score = showObj.score
    this.owner = showObj.owner.nickname
    this.sourceInfo = showObj.sourceInfo
    this.updateTime = showObj.updateTime
    this.audioList = []
  }
}
