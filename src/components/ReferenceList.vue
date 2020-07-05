<template>
  <ul class='reference-list'>
    <!-- <span>References:</span> -->
    <li v-for='nodeid in nodeids' :key='nodeid'>
      <NodeReference :node='book.nodes[nodeid]' />
    </li>
  </ul>
</template> 
<script>
import NodeReference from '@/components/NodeReference.vue'

export default {
  name: 'ReferenceList',
  computed: {
    book() {
      return this.$store.state.books[this.$route.params.bookid];
    },
  },
  props: {
    nodeids: Array,
  },
  components: {
    NodeReference,
  }
}
</script>

<style scoped lang="stylus">
.reference-list
  list-style-type none
  margin-left 2em
  padding 0

.reference-list span
  padding-right 1em
  font-style italic

.reference-list li
  display inline
  opacity 60%
  padding-right 2em
  font-size 70%

</style>
