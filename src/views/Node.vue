<template>
  <div>
      <TopBar />
      <div class='book-content'>

        <NodeDetails :nodeid='node.id' />
        <NodeDetails :nodeid='childnode.id' :key='childnode.id' v-for="childnode in children(node.id)" />
      </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import NodeDetails from '@/components/NodeDetails.vue'

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
    NodeDetails,
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
