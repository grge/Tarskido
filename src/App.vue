<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">
edit-link-color = #cc2200
navigate-link-color = #6aa84f
title-blue = #024064


#app
  font-family "Cambria", georgia, serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  padding 0
  margin 0

body
  background-color #fffffa

.markdown-body p
  font-size 22px
  font-family "Cambria"

.book-content
  display grid
  font-size 22px
  width 40em
  margin 0 auto

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
  
</style>
