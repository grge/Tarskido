<template>
  <div class='node-detail' :class='`node-detail-l${level}`'>
      <!-- column 1 header in wide mode -->
      <div class='node-detail-header' :class='`node-detail-header-l${level}`'>
        <h2 v-if='node.name && level==1' class='node-h-reference'>
          {{node.nodetype.secondary}} {{node.reference}}
        </h2>
        <h3 v-if='level==2' class='node-h-name'>
          {{node.name == "" ? node.nodetype.secondary + " " + node.reference : node.name}}
        </h3>
        <div class='editlinks listoflinks'>
          <NodeReference :nodeId="node.id" v-if='level > 1'/>
          <router-link class='editlink' v-if="store.editMode" :to="{ name: 'NodeEdit', params: {bookParam: book.slug || book.id, nodeParam: node.slug || node.id}}">Edit node</router-link>
          <a class='editlink' @click='createChildNode()' v-if='store.editMode && level == 1 && node.nodetype.primary == "Group"'>Create child node</a>
        </div>
      </div>

      <!--- the top level gets an extra header in the central column --> 
      <div class='node-extra-header' v-if='level == 1'>
        <h2>{{node.name == "" ? node.nodetype.secondary + " " + node.reference : node.name}} </h2>
        <div class='navlinks listoflinks' v-if='level == 1'>
          <!-- <a class='navlink navpreviouslink'>Previous</a> -->
          <router-link :to="{ name: 'Node', params: {bookParam: book.slug || book.id, nodeParam: prevNodeId} }" class='navlink navpreviouslink' v-if="prevNodeId != 'ROOT'">Previous</router-link>
          <router-link :to="{ name: 'Node', params: {bookParam: book.slug || book.id, nodeParam: node.chapter} }" class='navlink navuplink' v-if="node.chapter && node.chapter != 'ROOT'">Up</router-link>
          <router-link :to="{ name: 'Book', params: {bookParam: book.slug || book.id} }" class='navlink navuplink' v-if="! node.chapter || node.chapter == 'ROOT'">Up</router-link>
          <router-link :to="{ name: 'Node', params: {bookParam: book.slug || book.id, nodeParam: nextNodeId} }" class='navlink navnextlink' v-if="nextNodeId != 'ROOT'">Next</router-link>
          <a class='navlink navtoclink' @click="toggleGraphVisibility()" >{{ graphHidden ? "Show" : "Hide" }} Graph</a>
        </div>
      </div>

      <div class='context-graph-wrapper' v-if='level == 1 && !graphHidden'>
        <ContextGraph :contextIds='[node.id]' />
      </div>

      <div class='node-body'>
        <MarkdownRenderer :markdown="node.statement" />
      </div>

      <ReferenceList v-if='node.references.length' :nodeids='node.references' />

      <NodeProof v-if='node.nodetype.primary == "Proposition"' :node='node'/>

  </div>
</template> 
<script lang="ts">
import { useBookStore } from '@/stores/bookStore';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { v4 as uuidv4 } from 'uuid';
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';
import NodeProof from '@/components/NodeProof.vue'
import NodeReference from '@/components/NodeReference.vue'
// import MultipartNodeDetails from '@/components/MultipartNodeDetails.vue'
import ReferenceList from '@/components/ReferenceList.vue'
import ContextGraph from '@/components/ContextGraph.vue';

export default {
  name: 'NodeDetails',
  components: {
    NodeReference,
    NodeProof,
    ReferenceList,
    // MultipartNodeDetails,
    MarkdownRenderer,
    ContextGraph
  },
  setup(props) {
    const router = useRouter();
    const store = useBookStore();
    const book = store.rawBook;

    const node = computed(() => book.nodes[props.nodeId]);
    const hasName = computed(() => node.value.name && node.value.name.trim() !== '');

    const nextNodeId = computed(() => store.nextNodeId(props.nodeId));
    const prevNodeId = computed(() => store.prevNodeId(props.nodeId));

    const graphHidden = ref(false);

    function toggleGraphVisibility() {
      graphHidden.value = !graphHidden.value;
    }

    function createChildNode() {
      const childId = uuidv4();
      const child = {
        id: childId,
        reference: '',
        name: '',
        nodetype: { primary: '', secondary: '' },
        statement: '',
        references: [],
        chapter: node.id,
        proof_lines: []
      };
      store.upsertNode(child);
      router.push({ name: 'NodeEdit', params: { bookParam: store.rawBook.id, nodeParam: childId }}); 
    }
    return { book, store, node, createChildNode, nextNodeId, prevNodeId, hasName, toggleGraphVisibility, graphHidden };
  },

  props: {
    nodeId: String,
    level: Number
  },
}
</script>

<style lang="stylus">

.node-body
  text-align left

.node-detail-header-l1 .reference-link
  display none

.node-extra-header h2
    font-weight normal

@container book-content (min-width: 65em)
  .node-detail
    display grid
    grid-template-columns 1fr 40em 1fr
    row-gap 0em
    column-gap 3em
    margin-top 4em

  .node-detail-l1
    margin-top 3em

  h3.node-h-name, h2.node-h-reference
    grid-column 1
    grid-row 1
    text-align right
    margin-top 0

  .node-children .node-body p:first-child
    margin-top 0
    padding-top 0

  .node-detail-header h3
    font-weight bold
    margin-top 0
    padding-top 0

  .node-extra-header
    grid-column 2 / 4
    grid-row 1

  .node-extra-header h2
    margin-top 0

  .editlinks
    grid-column 1
    text-align right

  .editlinks a
    margin-right 0
    margin-left 1.5em

  .editlinks .reference-link
    margin-bottom 0.5em
    display block

  .context-graph-wrapper
    margin-top 2em
    grid-column 1 / span 3

  .node-body
    grid-column 2

  .proof-heading, .proof-line, .navlinks
    grid-column 2
  

@container book-content (max-width: 65em)
  .node-detail
    display block
    margin 1em 2em

  .node-children .node-detail
    margin-top 5em

  .node-detail-header
    margin-top 1.15em
    margin-bottom 1em

  .node-detail-header .node-name
    font-weight normal 
    margin-left 0.5em

  .reference-list li
    display inline

  .node-extra-header h2
    margin-top 0
    padding-top 0

  .context-graph-wrapper
    margin-top 2em

</style>
