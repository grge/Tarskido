<template>
  <div class='topbar'>
    <router-link to="/"><h1>Tarskido</h1></router-link>
    <router-link :to="{name:'BookFront', params:{bookid:this.book.id}}"><h2>{{this.book.title}}</h2></router-link>
    <HamburgerMenu :dark="true" />
    <div class='size-controls'>
      <a @click='$store.commit("updateViewMode", "book")' class='left navlink link'>⍅ Expand</a>
      <a @click='$store.commit("updateViewMode", "graph")' class='right navlink link'>Hide ⍆</a>
    </div>
  </div>
</template>

<script>
import HamburgerMenu from '@/components/HamburgerMenu.vue'

export default {
  name: 'TopBar',
  components: {
    HamburgerMenu
  },
  computed: {
    book() {
      return this.$store.state.books[this.$store.state.selectedBookId]
    }
  },
  methods: {
    expandBookView() {
      this.$store.commit("updateViewMode", 'book')
    }
  }
}
</script>

<style scoped lang="stylus">
.topbar
  width 100%
  background #024064
  margin-top 0
  margin-bottom 0
  padding-bottom 10px
  height 60px
  // overflow hidden

.size-controls
  font-family sans-serif
  font-size 20px
  color black
  margin-top 10px
  // padding-top 10px
  display block
  // background #ffffda
  height 35px
  width 100% 

.size-controls .left
  display inline-block
  float left
  margin-left 1em

.size-controls .right
  display inline-block
  float right
  padding-right 1em

h1
  display inline
  line-height 2.15em
  padding-left 1em
  text-align left
  color white
  font-family sans
  font-weight normal
  font-size 35px

h1::before
  filter: invert(100%)
  content " "
  background-image url('/logo.svg')
  background-size 1em
  width 1em
  height 1em
  display inline-block
  margin-right 0.5em

 h2
  display inline
  color background-color
  font-size 30px
  color white
  font-weight normal
  margin-left 2em



</style>
