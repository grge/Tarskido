<template>
  <div>
      <TopBar />
      <h2>Editing node</h2>
      <table class='edit-table'>
        <tr><th>Reference</th><td><input type='text' v-model="reference"></td></tr>
        <tr><th>Name</th><td><input type='text' v-model="name"/></td></tr>

        <tr>
          <th>Type</th>
          <td>
            <select v-model='type'>
              <option :key='loop_type' :value='loop_type' v-for='loop_type in valid_types()'>{{loop_type}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <th>SubType</th>
          <td>
            <select v-model='subtype'>
              <option :key='loop_subtype' :value='loop_subtype' v-for='loop_subtype in valid_subtypes(type)'>{{loop_subtype}}</option>
            </select>
          </td>
        </tr>
        <tr><th>References</th>
          <td>
            <Multiselect placeholder='Add references...' :custom-label="reference_label" :multiple="true" v-model='references' :options='valid_references()'>
            </Multiselect>
          </td>
        </tr>
        <tr><th>Parent chapter</th>
          <td>
            <select v-model='chapter'>
              <option value='ROOT'>None</option>
              <option :key='cnode.id' :value='cnode.id' v-for='cnode in valid_chapters()'>{{cnode.subtype}} {{cnode.reference}}</option>
            </select>
          </td>
        </tr>
        <tr><th>Statement</th><td><textarea v-model="statement"></textarea></td></tr>
        <tr v-if='node.type == "Proposition"'>
          <th>Proof</th>
          <td>
            <a @click='createProofLine' class='editlink'>Add new line</a>
            <table class='proof-lines-table'>
              <tr :key='ix' v-for='(line, ix) in node.proof_lines'><th>Proof Line {{ix}}</th>
                <td>
                  <textarea v-on:input='updateProofLineStatement(ix, $event.target.value)' :value='node.proof_lines[ix].statement'></textarea>
                  <Multiselect
                    placeholder='Add references...'
                    :custom-label="reference_label"
                    :multiple="true"
                    v-on:input='updateProofLineReferences(ix, $event)'
                    :value='node.proof_lines[ix].references'
                    :options='valid_references()'>
                  </Multiselect>
                  <a @click='deleteProofLine(ix)' class='deletelink editlink'>Delete this line</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
      <div class='listoflinks'>
        <router-link class='navigatelink navbacklink' :to="{name:'Node', params:{bookid: this.book.id, nodeid: this.node.id}}">Back to node view</router-link>
        <a v-if="$store.state.editMode" class='editlink deletelink' @click='deleteThisNode'>Delete this node</a>
      </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import constants from '@/constants.js' // eslint-disable-line no-unused-vars 
import Multiselect from 'vue-multiselect'

export default {
  name: 'NodeEdit',
  computed: {
    book() {
      return this.$store.state.books[this.$route.params.bookid];
    },
    node() {
      return this.book.nodes[this.$route.params.nodeid];
    },
    reference: {
      get() {
        return this.node.reference
      },
      set(value) {
        this.$store.commit('updateNodeReference', {bookid: this.book.id, nodeid: this.node.id, reference: value})
      }
    },
    name: {
      get() {
        return this.node.name
      },
      set(value) {
        this.$store.commit('updateNodeName', {bookid: this.book.id, nodeid: this.node.id, name: value})
      }
    },
    type: {
      get() {
        return this.node.type
      },
      set(value) {
        this.$store.commit('updateNodeType', {bookid: this.book.id, nodeid: this.node.id, type: value})
      }
    },
    subtype: {
      get() {
        return this.node.subtype
      },
      set(value) {
        this.$store.commit('updateNodeSubType', {bookid: this.book.id, nodeid: this.node.id, subtype: value})
      }
    },
    statement: {
      get() {
        return this.node.statement
      },
      set(value) {
        this.$store.commit('updateNodeStatement', {bookid: this.book.id, nodeid: this.node.id, statement: value})
      }
    },
    references: {
      get() {
        return this.node.references
      },
      set(value) {
        console.log(value)
        this.$store.commit('updateNodeReferences', {bookid: this.book.id, nodeid: this.node.id, references: value})
      }
    },
    chapter: {
      get() {
        return this.node.chapter
      },
      set(value) {
        this.$store.commit('updateNodeChapter', {bookid: this.book.id, nodeid: this.node.id, chapter: value})
      }
    },
  },
  methods: {
    deleteThisNode() {
      this.$store.commit('deleteNode', {bookid: this.book.id, nodeid: this.node.id});
      this.$router.push({name: 'BookFront', params: {bookid: this.book.id}})
    },
    createProofLine() {
      this.$store.commit('createProofLine', {bookid: this.book.id, nodeid: this.node.id})
    },
    deleteProofLine(ix) {
      this.$store.commit('deleteProofLine', {bookid: this.book.id, nodeid: this.node.id, ix: ix});
    },
    updateProofLineStatement(ix, statement) {
      console.log(statement)
      this.$store.commit('updateProofLineStatement', {bookid: this.book.id, nodeid: this.node.id, ix: ix, statement: statement})
    },
    updateProofLineReferences(ix, references) {
        this.$store.commit('updateProofLineReferences', {bookid: this.book.id, nodeid: this.node.id, ix: ix, references: references})
    },
    valid_types() {
      return Object.keys(constants.VALID_TYPES)
    },
    valid_subtypes(type) {
      return constants.VALID_TYPES[type]
    },
    valid_references() {
      // TODO: Remove any nodes that refer to this node (including indirectly)
      return Object.values(this.book.nodes).filter((n) => (n.type != 'Group')).map((n) => n.id);
    },
    valid_chapters() {
      var g = this.$store.getters.selectedBookGraph;

      // get all descendent nodes of node (i.e. all nodes that are children or children of children, etc)
      // this routine should be moved into the graphlib class
      function getAllDescendents(nodeid) {
        var children = g.children(nodeid)
        return children.concat(...children.map(getAllDescendents))
      }

      var descendents = getAllDescendents(this.node.id);

      /* Any node is a valid parent chapter for this node if it:
         * has type='Chapter'
         * is not the same node as this node
         * is not a descendent chapter of this node 
      */
      var valid_chapters = Object.values(this.book.nodes).filter((n) => {
        return (n.type == 'Group') && (!descendents.includes(n.id)) && (n.id != this.node.id)
      })

      return valid_chapters
    },
    reference_label(nodeid) {
      var n = this.book.nodes[nodeid];
      return n.subtype + " " + n.reference + " " + n.name
    }

  },
  components: {
    TopBar,
    Multiselect
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped lang='stylus'>
.edit-table
 width 80%

.edit-table th
 text-align right
 vertical-align top

.edit-table td
 text-align left

.multiselect
  width 30em

.proof-lines-table textarea
  height 200px
  width 30em
  
.proof-lines-table th
  padding-top 20px
  font-weight normal 

.proof-lines-table td
  padding-top 20px
</style>
