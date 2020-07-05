<template>
  <div>
      <TopBar />
      <div class='book-content'>
        <NodeDetails :nodeid='node.id' :level='1' />
        <div v-if='node.subtype == "Chapter"'>
          <NodeDetails :nodeid='childnode.id' :key='childnode.id' v-for="childnode in children(node.id)" :level='2'/>
        </div>
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
  },
  methods: {
    children(nodeid) {
      var childids = this.$store.getters.selectedBookGraph.children(nodeid)
      return childids.map((n) => {return this.book.nodes[n]})
    }
  },
  components: {
    TopBar,
    NodeDetails,
  },
}
</script>

<style scoped lang='stylus'>
</style>
