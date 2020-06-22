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
  font-family "Cambria" georgia serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  padding 0
  margin 0
  color #2c3e50

body
  background-color #ffffaa

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
