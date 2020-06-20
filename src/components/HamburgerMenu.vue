<template>
  <div class="hamburger-menu">
      <img v-if='dark' class="hamburger-menu-button" src="hamburger_icon_dark.png" />
      <img v-if='!dark' class="hamburger-menu-button" src="hamburger_icon_light.png" />
  </div>
</template>

<script>
export default {
  name: 'HamburgerMenu',
  props: {
      dark: Boolean
  }
}
</script>

<style scoped lang="stylus">
.hamburger-menu-button
   position absolute
   right 0
   top 0
   margin 15px
   width 30px
</style>
