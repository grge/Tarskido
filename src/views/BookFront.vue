<template>
  <div>
      <TopBar />
      <h2>{{book.title}}</h2>
      <div>by {{book.author}}</div>
      <router-link v-if='$store.state.editMode' class='editlink' :to="{ name: 'BookEdit', params: {bookid: book.id}}">Edit book attributes</router-link>
      <a v-if="$store.state.editMode" class='editlink' @click="addNode(book.id)">Create a new node</a>
      <div>{{book.preface}}</div>
      <BookOverviewGraph />
      <LargeTableOfContents />
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import LargeTableOfContents from '@/components/LargeTableOfContents.vue'
import BookOverviewGraph from '@/components/BookOverviewGraph.vue'
// import BookEdit from '@/views/BookEdit.vue'

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
    // BookEdit
  },
  methods: {
    addNode(bookid) {
      this.$store.commit('createNode', bookid);

    }
  }
}
</script>

<style scoped>
</style>
