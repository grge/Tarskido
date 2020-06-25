<template>

  <div>
      <h4>{{node.subtype}} {{node.reference}} {{node.name}}</h4>
      <div class='listoflinks'>
        <NodeReference :node="node"/>
        <router-link v-if='$store.state.editMode' class='editlink' :to="{ name: 'NodeEdit', params: {bookid: book.id, nodeid: node.id}}">Edit node attributes</router-link>
      </div>

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css" />
      <MarkdownItVue class='md-body' :content="node.statement" />
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
</style>
