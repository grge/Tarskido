<template>
  <div class="home">
      <HamburgerMenu :dark='false'/>
      <h1>Tarskido</h1>
      <BookShelf :books='$store.state.books'/>
  </div>
</template>

<script>
import BookShelf from '@/components/BookShelf.vue'
import HamburgerMenu from '@/components/HamburgerMenu.vue'

export default {
  name: 'Home',
  components: {
    BookShelf,
    HamburgerMenu
  }
}
</script>

<style scoped lang='stylus'>

.home
 text-align center

h1
 margin-top 2em
 font-size 41pt
 font-weight normal
 font-family sans

h1::before
 content " "
 background-image url('/logo.svg')
 background-size 1em
 width 1em
 height 1em
 display inline-block
 margin-right 0.5em

</style>
