<template>
  <div>
      <TopBar />
      <div class='book-content'>
        <h2 class='book-front-title'>{{book.title}}</h2>
        <div class='book-front-author'>by {{book.author}}</div>
        <div class='listoflinks'>
          <router-link v-if='$store.state.editMode' class='editlink' :to="{ name: 'BookEdit', params: {bookid: book.id}}">Edit book attributes</router-link>
          <a v-if="$store.state.editMode" class='editlink' @click="addNode(book.id)">Create a new node</a>
        </div>
        <MarkdownItVue class='md-body book-preface' :content="book.preface" />
        <BookOverviewGraph />
        <LargeTableOfContents />
      </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import LargeTableOfContents from '@/components/LargeTableOfContents.vue'
import BookOverviewGraph from '@/components/BookOverviewGraph.vue'
import MarkdownItVue from 'markdown-it-vue' 

export default {
  name: 'BookFront',
  computed: {
    book() {
      return this.$store.state.books[this.$route.params.bookid];
    }
  },
  components: {
    TopBar,
    LargeTableOfContents,
    BookOverviewGraph,
    MarkdownItVue
    // BookEdit
  },
  methods: {
    addNode(bookid) {
      this.$store.commit('createNode', bookid);

    }
  }
}
</script>

<style scoped lang='stylus'>
.book-content
  text-align center

.book-front-title 
  margin-bottom 0.15em
  margin-top 1em
  font-size 40px

.book-front-author
  margin-bottom 0.5em
  font-size 25px
  font-style italic

.book-preface
  text-align left

.listoflinks
  margin-bottom 1.5em
</style>
