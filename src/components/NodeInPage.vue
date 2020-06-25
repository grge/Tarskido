<template>

  <div>
      <h4>{{node.subtype}} {{node.reference}} {{node.name}}</h4>
      <div class='listoflinks'>
        <NodeReference :node="node"/>
        <router-link v-if='$store.state.editMode' class='editlink' :to="{ name: 'NodeEdit', params: {bookid: book.id, nodeid: node.id}}">Edit node attributes</router-link>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css" />
      <MarkdownItVue class='md-body' :content="node.statement" />
      <ul class='nodereflist' v-if='node.references.length'>
        <span>References:</span>
        <li v-for='refnodeid in node.references' :key='refnodeid'>
          <NodeReference :node='book.nodes[refnodeid]' />
        </li>
      </ul>
  </div>
</template>

<script>
import NodeReference from '@/components/NodeReference.vue'
import MarkdownItVue from 'markdown-it-vue'

export default {
  name: 'LargeTableOfContents',
  computed: {
    book() {
      return this.$store.state.books[this.$route.params.bookid];
    },
    node() {
      return this.book.nodes[this.nodeid]
    }
  },
  props: {
    nodeid: String
  },
  components: {
    NodeReference,
    MarkdownItVue
  }
}
</script>

<style scoped lang="stylus">
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
