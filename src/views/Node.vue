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

        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css" />
        <MarkdownItVue class='md-body' :content="node.statement" />

        <ul class='nodereflist' v-if='node.references.length'>
          <span>References:</span>
          <li v-for='refnodeid in node.references' :key='refnodeid'>
            <NodeReference :node='book.nodes[refnodeid]' />
          </li>
        </ul>

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
      return this.node.type == 'Group'
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

<style scoped lang='stylus'>
.nodereflist
  list-style-type none
  margin-left 2em
  padding 0

.nodereflist span
  padding-right 1em
  font-style italic

.nodereflist li
  display inline
  opacity 60%
  padding-right 2em
  font-size 70%
</style>
