<template>
  <div>
      <TopBar />
      <h2>{{node.name}}</h2>
      <div class='node-reference'>{{node.subtype}} {{node.reference}}</div>
      <div class='listoflinks'>
        <router-link>Previous</router-link>
        <router-link>Next</router-link>
        <router-link>Up</router-link>
      </div>
      <div>{{node.statement}}</div>
      <router-link v-if='$store.state.editMode' class='editlink' :to="{ name: 'NodeEdit', params: {bookid: book.id, nodeid: node.id}}">Edit node attributes</router-link>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'

export default {
  name: 'Node',
  computed: {
    book() {
      return this.$store.state.books[this.$route.params.bookid];
    },
    node() {
      return this.book.nodes[this.$route.params.nodeid];
    }
  },
  components: {
    TopBar,
  },
}
</script>

<style scoped>
</style>
