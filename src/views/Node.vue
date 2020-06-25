<template>
  <div>
      <TopBar />
      <div class='book-content'>
        <h3>{{node.subtype}} {{node.reference}} {{node.name}}</h3>
        <div class='listoflinks'>
          <NodeReference :node="node"/>
          <router-link v-if='$store.state.editMode' class='editlink' :to="{ name: 'NodeEdit', params: {bookid: book.id, nodeid: node.id}}">Edit node attributes</router-link>
          <a v-if='$store.state.editMode && canHaveChildren' class='editlink' @click="createNewNode()">Create new node</a>
        </div>
        <div class='listoflinks'>
          <a class='navigatelink navpreviouslink'>Previous</a>
          <router-link :to='this.parentRoute' class='navigatelink navuplink'>Up</router-link>
          <a class='navigatelink navnextlink'>Next</a>
          <a class='navigatelink navtoclink'>Show contents</a>
        </div>

        <MarkdownItVue class='md-body' :content="node.statement" />

        <NodeInPage :nodeid='childnode.id' :key='childnode.id' v-for="childnode in children(node.id)" />
      </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import NodeReference from '@/components/NodeReference.vue'
import NodeInPage from '@/components/NodeInPage.vue'
import MarkdownItVue from 'markdown-it-vue'

export default {
  name: 'Node',
  computed: {
    book() {
      return this.$store.state.books[this.$route.params.bookid];
    },
    node() {
      return this.book.nodes[this.$route.params.nodeid];
    },
    canHaveChildren() {
      return this.node.type == 'Chapter'
    },
    parentRoute() {
      if (this.node.chapter == 'ROOT') {
        return {name: 'BookFront', params: {bookid: this.book.id}}
      }
      else {
        return {name: 'Node', params: {bookid: this.book.id, nodeid: this.node.chapter}}
      }
    },
  },
  methods: {
    children(nodeid) {
      var childids = this.$store.getters.selectedBookGraph.children(nodeid)
      return childids.map((n) => {return this.book.nodes[n]})
    },
    createNewNode() {
      this.$store.commit('createChildNode', {bookid:this.book.id, nodeid:this.node.id})
    }
  },
  components: {
    TopBar,
    NodeReference,
    NodeInPage,
    MarkdownItVue
  },
}
</script>

<style scoped>
</style>
