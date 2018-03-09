<template>
  <div id='page-recommend'>
    <swiper :list='bannerData' dots-position="center"></swiper>
    <div class='recommend-type'>
      <album v-for="(show, index) in recommendData" :key='index' :show='show'></album>
    </div>
  </div>
</template>

<script>
import recommendData from './recommend-data'
import bannerData from './banner-data'
import album from '@/base/album/album'
import { Swiper } from 'vux'
export default {
  data () {
    return {
      recommendData,
      bannerData
    }
  },
  components: {
    Swiper,
    album
  }
}
</script>

<style lang="scss" scoped>

</style>
