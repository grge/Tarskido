<template>
  <div id="app">
    <multipane>
      <div class='big-graph-container'>
        <BigGraph v-if="true" />
      </div>
      <multipane-resizer></multipane-resizer>
      <div class='router-view-container'>
        <router-view/>
      </div>
    </multipane>
  </div>
</template>

<script>
import { Multipane, MultipaneResizer } from 'vue-multipane'
import BigGraph from '@/components/BigGraph.vue'

export default {
  components: {
    BigGraph,
    Multipane,
    MultipaneResizer
  }
}
</script>

<style lang="stylus">
edit-link-color = #cc2200
navigate-link-color = #6aa84f
title-blue = #024064


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


.markdown-body p
  font-size 21px
  font-family "Cambria"

.book-content
  display grid
  font-size 21px
  max-width 40em
  margin 0 auto

.big-graph-container 
  min-width 200px
  max-width 100%
  height 100%

.router-view-container 
  background-color #fffff5
  flex-grow 1
  

h2
  margin-bottom 0.15em
  margin-top 1em
  font-size 40px

h3
  margin-bottom 0.15em
  margin-top 1em
  font-size 30px

textarea 
  font-family fixed
  width 40em

a:hover
  text-decoration underline

.editlink, .deletelink, navigatelink, .reference-link
  font-family sans-serif
  text-decoration none
  font-size 12pt
  cursor pointer

.editlink, deletelink
  color edit-link-color

.navigatelink
  color navigate-link-color

.reference-link
  color title-blue

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
