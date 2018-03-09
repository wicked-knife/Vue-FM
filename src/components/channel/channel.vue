<template>
  <div id='chanel-page-warpper'>
    <panel ref='panel' @foldChange='onChannelContentChange'></panel>
    <div id='channel-content' ref='channel-content'>
      <scroll :data='albumList' v-if="albumList.length" ref='scroll' :pullup='true' @scrollToEnd='searchMore'>
      <ul id='album-list' ref='album-list'>
        <li class='album-item' v-for='(album, index) in albumList' :key='index'>
          <album :album='album' @selectShow='onSelectShow'></album>
        </li>
      </ul>
      </scroll>
    </div>
    <toast text='已无更多' type='cancel' v-model="failToastShow" position='bottom' ></toast>
    <toast text='加载完成' type='success' v-model="successToastShow" position='bottom' ></toast>
    <router-view v-if='show.id'/>
  </div>
</template>

<script>
import album from '@/base/album/album'
import panel from '@/base/panel/panel'
import scroll from '@/base/scroll/scroll'
import { Toast } from 'vux'
import { mapGetters, mapMutations } from 'vuex'
import { getChannelTypeData } from '@/common/api/api'
import { fixScrollMixin } from '@/common/js/mixin'
const HEIGHT = 70
export default {
  mixins: [fixScrollMixin],
  data () {
    return {
      albumList: [],
      currentPage: 1,
      hasMore: true,
      failToastShow: false,
      successToastShow: false
    }
  },
  computed: {
    ...mapGetters(['channelType', 'show'])
  },
  methods: {
    ...mapMutations({
      setPlayerShow: 'setPlayerShow'
    }),
    _getChannelTypeData () {
      if (this.hasMore) {
        getChannelTypeData(this.channelType.id, this.currentPage).then((res) => {
          res.data.data.commonInfo.hasMore ? this.hasMore = true : this.hasMore = false
          console.log(res.data)
          if (this.currentPage > 1) {
            this.albumList = this.albumList.concat(res.data.data.albumInfoList)
          } else {
            this.albumList = res.data.data.albumInfoList
          }
          this.successToastShow = true
          // 获取到数据并渲染之后再修正top值
          this._fixChannelContentTop()
        })
      } else {
        this.failToastShow = true
      }
    },
    _fixChannelContentTop (height) {
      // 如果有height 值就让top等于height否则就让top自己去获取
      var top
      if (height) {
        top = height + HEIGHT
      } else {
        top = this.$refs['panel'].$el.clientHeight + HEIGHT
      }
      this.$refs['channel-content'].style.top = top + 'px'
      this.$refs['channel-content'].style.bottom = '0px'
      if (this.$refs.scroll) {
        this.$refs['scroll'].refresh()
      }
    },
    onChannelContentChange (height) {
      this._fixChannelContentTop(height)
    },
    onSelectShow () {
      this.$router.push({
        path: `/channel/${this.show.id}`
      })
      this.setPlayerShow(true)
    },
    searchMore () {
      this.toastShow = true
      this.currentPage++
      this._getChannelTypeData()
    },
    handleScrollFix () {
      this.$refs['album-list'].style['padding-bottom'] = '60px'
    }
  },
  mounted () {
    this._getChannelTypeData()
  },
  watch: {
    channelType (newval, oldval) {
      this.currentPage = 1
      this._getChannelTypeData()
    }
  },
  components: {
    album,
    panel,
    scroll,
    Toast
  }
}
</script>

<style lang="scss" scoped>
#chanel-page-warpper{
  width: 100%;
  #channel-content{
    width: 100%;
    position: absolute;
    overflow: hidden;
  }
}

</style>
