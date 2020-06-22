<template>
  <div>
      <TopBar />
      <h2>{{node.name}}</h2>
      <div class='listoflinks'>
        <NodeReference :node="node"/>
        <router-link v-if='$store.state.editMode' class='editlink' :to="{ name: 'NodeEdit', params: {bookid: book.id, nodeid: node.id}}">Edit node attributes</router-link>
      </div>
      <div class='listoflinks'>
        <a class='navigatelink navpreviouslink'>Previous</a>
        <router-link :to='this.parentRoute' class='navigatelink navuplink'>Up</router-link>
        <a class='navigatelink navnextlink'>Next</a>
        <a class='navigatelink navtoclink'>Show contents</a>
      </div>
      <div>{{node.statement}}</div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import NodeReference from '@/components/NodeReference.vue'

export default {
  name: 'Node',
  computed: {
    book() {
      return this.$store.state.books[this.$route.params.bookid];
    },
    node() {
      return this.book.nodes[this.$route.params.nodeid];
    },
    parentRoute() {
      if (this.node.chapter == 'null') {
        return {name: 'BookFront', params: {bookid: this.book.id}}
      }
      else {
        return {name: 'Node', params: {bookid: this.book.id, nodeid: this.node.chapter}}
      }
    }
  },
  components: {
    TopBar,
    NodeReference
  },
}
</script>

<style scoped>
</style>
