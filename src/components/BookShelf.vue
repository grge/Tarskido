<template>
  <div class="hello">
    <div class='bookgrid'>
        <div class='bookgridbook' :key='id' v-for='(book, id) in books'>
            <p class='bookshelf-title'>{{ book.title }}</p>
            <p class='bookshelf-author'>by {{ book.author }}</p>
        </div>
    </div> 
    <a v-if="$store.state.editMode" class='editlink newbooklink'  @click="$store.commit('createNewBook')">Create new book</a>
  </div>
</template>

<script>
export default {
  name: 'BookShelf',
  props: {
      books: Object
  }
}
</script>

<style scoped lang="stylus">
.bookgrid
  display grid
  width: 600px
  margin 1.5em auto
  grid-template-columns 150px 150px 150px 150px
  background white
  border-top 1px solid #aaaaaa
  border-bottom 1px solid #aaaaaa

.bookgridbook
  text-align center
  margin 1.5em auto
  padding 0 1em

.bookshelf-title::before
  content "🕮"
  display block

.bookshelf-title
  font-size 11pt
  margin 0px

.bookshelf-author
  margin 0px
  font-size 9pt
  font-style italic

</style>
