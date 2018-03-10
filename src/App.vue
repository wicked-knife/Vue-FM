<template>
  <div id="app">
    <app-header></app-header>
    <nav-bar></nav-bar>
        <router-view/>
    <player></player>
  </div>
</template>

<script>
import appHeader from '@/components/app-header/app-header'
import navBar from '@/components/nav-bar/nav-bar'
import player from '@/components/player/player'
export default {
  name: 'App',
  components: {
    appHeader,
    navBar,
    player
  }
}
</script>

<style lang='scss'>
@import './common/style/index.scss';
body{
  background-color: $bg-color;
}
</style>
