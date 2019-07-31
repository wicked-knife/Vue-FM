<template>
  <div class='panel-warpper' ref='item'>
    <transition-group tag='ul' name='fade' class='panel-content'>
      <li class='panel-item' v-for="(type, index) in channel.list" :key='index + type.type' @click='selectType(type, index)' :class="{'active': channelType.type === type.type}" v-if='!isFold || index <= 3'>{{type.type}}</li>
    </transition-group>
    <i class='iconfont icon-jipiaoxiaoxiala' @click='toggleFold' :class="{'rotate': isFold === true}"></i>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
const MIN_HEIGHT = 72
export default {
  data () {
    return {
      isFold: false,
      height: 0
    }
  },
  computed: {
    ...mapGetters(['channel', 'channelType'])
  },
  mounted () {
    this.$nextTick(() => {
      this.initFold()
    })
  },
  methods: {
    ...mapMutations({
      setChannelType: 'setChannelType'
    }),
    selectType (type, index) {
      this.setChannelType(type)
    },
    toggleFold () {
      this.isFold = !this.isFold
      if (this.isFold) {
        this.$emit('foldChange', MIN_HEIGHT)
      } else {
        this.$emit('foldChange', this.height)
      }
    },
    initFold () {
      this.isFold = false
      this.height = this.$refs.item.offsetHeight
      if (this.isFold) {
        this.$emit('foldChange', MIN_HEIGHT)
      } else {
        this.$emit('foldChange', this.height)
      }
    },
    refreshFold () {
      this.isFold = false
      setTimeout(() => {
        this.height = this.$refs.item.offsetHeight
        if (this.isFold) {
          this.$emit('foldChange', MIN_HEIGHT)
        } else {
          this.$emit('foldChange', this.height)
        }
      }, 400)
    }
  },
  watch: {
    channel (newval, oldval) {
      this.$nextTick(() => {
        this.refreshFold()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../common/style/index.scss";
.panel-warpper {
  width: 100%;
  position: relative;
  transition: all 0.3s;
  padding-bottom: 30px;
  .panel-content {
    overflow: hidden;
    .panel-item {
      float: left;
      background-color: #222;
      width: calc(25% - 2px);
      height: 40px;
      line-height: 40px;
      text-align: center;
      color: #fff;
      margin: 1px;
    }
  }
  i {
    font-size: 26px;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translate3d(-50%, 20%, 0) rotateZ(-180deg);
    color: $theme-color;
    padding: 5px;
    transition: all 0.3s;
    z-index: 1;
  }
}
.rotate {
  transform: translate3d(-50%, 20%, 0) rotateZ(-360deg) !important;
}
.active {
  color: $theme-color !important;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}
</style>
