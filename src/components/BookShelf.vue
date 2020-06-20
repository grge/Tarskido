<template>
  <div class="hello">
    <div class='bookgrid'>
        <div class='bookgridbook' :key='id' v-for='(book, id) in books'>
            <p>{{ book.title }}</p>
            <p>by {{ book.author }}</p>
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
  width: 450px
  margin 1.5em auto
  grid-template-columns 150px 150px 150px
  background white
  border-top 1px solid #aaaaaa
  border-bottom 1px solid #aaaaaa

.bookgridbook
  text-align center
  width 135px
  margin 0 auto

</style>
