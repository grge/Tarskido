<template>
  <div>
      <TopBar />
      <h2>Editing book</h2>
      <table class='edit-table'>
        <tr><th>Title</th><td><input type='text' v-model="title"/></td></tr>
        <tr><th>Author</th><td><input type='text' v-model="author"/></td></tr>
        <tr><th>Preface</th><td><textarea v-model='preface'></textarea></td></tr>
      </table>
      <div class='listoflinks'>
        <router-link class='navigatelink navbacklink' :to="{name:'BookFront', params:{bookid: this.book.id}}">Back to book view</router-link>
        <a v-if="$store.state.editMode" class='deletelink' @click='deleteThisBook'>Delete this book</a>
      </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'

export default {
  name: 'BookEdit',
  computed: {
    book() {
      return this.$store.state.books[this.$route.params.bookid];
    },
    author: {
      get() {
        return this.book.author
      },
      set(value) {
        this.$store.commit('updateBookAuthor', {bookid: this.book.id, author: value})
      }
    },
    title: {
      get() {
        return this.book.title
      },
      set(value) {
        this.$store.commit('updateBookTitle', {bookid: this.book.id, title: value})
      }
    },
    preface: {
      get() {
        return this.book.preface
      },
      set(value) {
        this.$store.commit('updateBookPreface', {bookid: this.book.id, text:value})
      }
    }
  },
  methods: {
    deleteThisBook() {
      this.$store.commit('deleteBook', this.book.id);
      this.$router.push({name: 'Home'})
    }
  },
  components: {
    TopBar,
  }
}
</script>

<style scoped lang='stylus'>
.edit-table
 width 80%

.edit-table th
 text-align right

.edit-table td
 text-align left
</style>
