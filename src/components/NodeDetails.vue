<template>
  <div class='node-detail'>
      <div class='node-detail-header'>
        <component :is="'h'+ (level+1)">
          {{node.name == "" ? node.subtype + " " + node.reference : node.name}}
        </component>
        <div class='editlinks listoflinks'>
          <NodeReference :node="node"/>
          <router-link v-if='$store.state.editMode' class='editlink' :to="{ name: 'NodeEdit', params: {bookid: book.id, nodeid: node.id}}">Edit node</router-link>
          <a class='editlink' @click='createNewNode()' v-if='level == 1'>Create child node</a>
        </div>
        <div class='navlinks listoflinks' v-if='level == 1'>
          <a class='navlink navpreviouslink'>Previous</a>
          <router-link :to='this.parentRoute' class='navlink navuplink'>Up</router-link>
          <a class='navlink navnextlink'>Next</a>
          <a class='navlink navtoclink'>Show contents</a>
        </div>
      </div>

      <!-- <Dagre v-if='level==1' :graph='nodeContextGraph' /> -->

      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.5.1/katex.min.css" />
      <MarkdownItVue class='md-body' :content="node.statement" />

      <ReferenceList v-if='node.references.length' :nodeids='node.references' />

      <NodeProof v-if='node.type == "Proposition"' :node='node'/>

      <MultipartNodeDetails v-if='node.subtype == "Multi-part"' :node='node'/>
  </div>
</template> 
<script>
import NodeReference from '@/components/NodeReference.vue'
import NodeProof from '@/components/NodeProof.vue'
import MultipartNodeDetails from '@/components/MultipartNodeDetails.vue'
import ReferenceList from '@/components/ReferenceList.vue'
import Dagre from '@/components/Dagre.vue'
import MarkdownItVue from 'markdown-it-vue'

export default {
  name: 'NodeDetails',
  components: {
    NodeReference,
    NodeProof,
    ReferenceList,
    MultipartNodeDetails,
    MarkdownItVue,
    Dagre
  },
  props: {
    nodeid: String,
    level: Number
  },
  computed: {
    book() {
      return this.$store.state.books[this.$route.params.bookid];
    },
    node() {
      return this.book.nodes[this.nodeid]
    },
    graph() {
      return this.$store.getters.selectedBookGraph
    },
    parentRoute() {
      if (this.node.chapter == 'ROOT') {
        return {name: 'BookFront', params: {bookid: this.book.id}}
      }
      else {
        return {name: 'Node', params: {bookid: this.book.id, nodeid: this.node.chapter}}
      }
    },
    nodeContextGraph() {
      return this.graph
    }
  },
  methods: {
    createNewNode() {
      this.$store.commit('createChildNode', {bookid:this.book.id, nodeid:this.node.id})
    }
  }
}
</script>

<style scoped lang="stylus">

.node-detail-header
  margin-top 1.15em
  margin-bottom 1em

.node-detail-header .node-name
  font-weight normal 
  margin-left 0.5em

.editlinks.navlinks
  margin-top 1.5em

.node-detail
  margin-top 1em
  margin-bottom 80px



</style>
