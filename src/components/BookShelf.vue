<template>
  <div class="bookshelf">
    <div class='bookgrid'>
        <div class='bookgridbook' :key='id' v-for='(book, id) in books'>
            <router-link :to="{name: 'BookFront', params: {bookid: book.id}}">
              <p class='bookshelf-title'>{{ book.title }}</p>
              <p class='bookshelf-author'>by {{ book.author }}</p>
            </router-link>
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
  },
  methods: {
    createNewBookAndEdit() {
      this.$store.commit('createNewBook');
    }
  }
}
</script>

<style scoped lang="stylus">
.bookshelf 
  text-align center

.bookgrid
  display flex
  flex-wrap wrap
  width 70%
  min-width 500px;
  margin 1.5em auto
  background white
  border-top 1px solid #aaaaaa
  border-bottom 1px solid #aaaaaa

.bookgridbook
  text-align center
  margin 1.5em auto
  padding 0 3em
  cursor pointer

.bookgridbook a 
  text-decoration none
  color black

.bookshelf-title::before
  content "🕮"
  display block
  font-size 18pt
  text-decoration none

.bookshelf-title
  font-size 14pt
  margin 0px

.bookshelf-author
  margin 0px
  font-size 10pt
  font-style italic

</style>
