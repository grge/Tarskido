<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="stylus">
edit-link-color = #cc0000


#app
  font-family "Cambria" georgia serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  padding 0
  margin 0
  color #2c3e50

body
  background-color #fffffa

.editlink:hover
  text-decoration underline

.editlink 
  font-family sans-serif
  color edit-link-color
  text-decoration none
  cursor pointer


.editlink:before
  content "🖉 "
</style>
