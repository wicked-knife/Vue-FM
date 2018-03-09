<template>
  <div id="scroll" ref="scroll">
    <slot></slot>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 3
    },
    click: {
      type: Boolean,
      default: true
    },
    listen: {
      type: Boolean,
      default: false
    },
    pullup: {
      type: Boolean,
      default: false
    },
    data: {}
  },
  data () {
    return {
      scroll: {}
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    scrollToElement (el, time = 0) {
      this.scroll.scrollToElement(el, time)
    },
    scrollToTop (time = 0) {
      this.scroll.scrollToElement(0, 0, time)
    },
    init () {
      this.scroll = new BetterScroll(this.$refs['scroll'], {probeType: this.probeType, click: this.click})
      if (this.listen) {
        let _this = this
        this.scroll.on('scroll', (positon) => {
          _this.$emit('scroll', positon)
        })
      }
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit('scrollToEnd')
          }
        })
      }
    },
    refresh () {
      this.scroll.refresh()
    }
  },
  watch: {
    data (newval, oldval) {
      this.scroll.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
#scroll{
  height: 100%;
  position: relative;
}
</style>
