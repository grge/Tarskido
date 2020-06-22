<template>
  <div class='topbar'>
    <router-link to="/"><h1>Tarskido</h1></router-link>
    <HamburgerMenu :dark="true" />
  </div>
</template>

<script>
import HamburgerMenu from '@/components/HamburgerMenu.vue'

export default {
  name: 'TopBar',
  components: {
    HamburgerMenu
  }
}
</script>

<style scoped lang="stylus">
.topbar
  width 100%
  background #024064
  margin-top 0
  height 60px


h1
  margin-top 0
  padding-top 10px
  padding-left 1em
  text-align left
  color white
  font-family sans
  font-weight normal
  font-size 24pt

h1::before
 filter: invert(100%)
 content " "
 background-image url('/logo.svg')
 background-size 1em
 width 1em
 height 1em
 display inline-block
 margin-right 0.5em
</style>
