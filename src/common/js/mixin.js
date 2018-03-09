import {mapGetters, mapMutations} from 'vuex'

export const fixScrollMixin = {
  computed: {
    ...mapGetters(['playerShow'])
  },
  methods: {
    handleScrollFix () {
    }
  },
  watch: {
    playerShow (newval, oldval) {
      this.handleScrollFix()
    }
  }
}

export const toggleFavorite = {
  data () {
    return {
      isFavorite: false
    }
  },
  computed: {
    ...mapGetters(['favoriteList', 'show'])
  },
  methods: {
    ...mapMutations({
      setFavoriteList: 'setFavoriteList'
    }),
    toggleFavorite () {
      let index = this.checkFavorite()
      if (index !== -1) {
        //  是被收藏的
        this.isFavorite = false
        let list = this.favoriteList.concat()
        list.splice(index, index + 1)
        this.setFavoriteList(list)
      } else {
        //  不是被收藏的
        this.isFavorite = true
        let list = this.favoriteList.concat()
        list.unshift(this.show)
        this.setFavoriteList(list)
      }
    },
    checkFavorite () {
      let findIndex = this.favoriteList.findIndex((item, index) => {
        return item.id === this.show.id
      })
      findIndex === -1 ? this.isFavorite = false : this.isFavorite = true
      return findIndex
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.checkFavorite()
    })
  },
  watch: {
    show (newval, oldval) {
      if (newval.id !== oldval.id) {
        this.checkFavorite()
      }
    },
    favoriteList () {
      this.checkFavorite()
    }
  }
}
