<template>
  <div id="app">
    <multipane>
      <div class='big-graph-container' v-if='this.$store.state.selectedBookId && ["graph", "split"].includes(this.$store.state.viewMode)'>
        <Dagre :graph='this.$store.getters.selectedBookGraph' />
      </div>
      <multipane-resizer></multipane-resizer>
      <div v-if='this.$store.state.selectedBookId == null || ["book", "split"].includes(this.$store.state.viewMode)' class='router-view-container'>
        <router-view/>
      </div>
    </multipane>
  </div>
</template>

<script>
import { Multipane, MultipaneResizer } from 'vue-multipane'
// import BigGraph from '@/components/BigGraph.vue'
import Dagre from '@/components/Dagre.vue'

export default {
  components: {
    Dagre,
    Multipane,
    MultipaneResizer
  }
}
</script>

<style lang="stylus">
edit-link-color = #cc2200
nav-link-color = #6aa84f
ref-link-color = #0b5394
title-blue = #024064
background-color = #fffffa

html
  position relative
  min-height 100%

body
  height 100%

#app
  font-family "Cambria", georgia, serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  width 100%

.markdown-body p, .markdown-body li
  font-family "Cambria"
  font-size 22px

.proof-lines .markdown-body p
  font-size 16px

.book-content
  font-size 22px
  max-width 40em
  margin 0 auto

.big-graph-container 
  min-width 200px
  max-width 100%
  height 100%

.router-view-container 
  flex-grow 1
  
.size-controls .right
  display inline-block
  float right
  padding-right 1em

h2
  margin-bottom 0.15em
  margin-top 1em
  font-size 40px

h3
  margin-bottom 0.15em
  margin-top 1em
  font-size 26px

textarea 
  font-family fixed
  width 40em
  height 20em

a:hover
  text-decoration underline

.editlink, .deletelink, .navlink, .reference-link
  font-family sans-serif
  text-decoration none
  cursor pointer

.editlink, deletelink
  color edit-link-color

.navlink
  color nav-link-color

.reference-link
  color ref-link-color

.navpreviouslink:before
  content "◀ "

.navnextlink:before
  content "▶ "

.navuplink:before
  content "▲ "

.navtoclink:before
  content "▤ "

.navbacklink:before
  content "↩ "

.editlink:before
  content "🖉 "

.deletelink:before
  content "⨯ "

.listoflinks a
  margin-right 2em
  
.multipane-resizer 
  width 1px
  position relative

.multipane-resizer:before
  display block
  background-color white
  z-index 10
  content ""
  width 3px
  height 1000px
  position absolute
  left 1.5px
  border-left: 1px solid #ccc
  border-right: 1px solid #ccc

.multipane-resizer:hover:before
  border-color: #999;
</style>
