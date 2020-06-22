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
        <tr><th>Statement</th><td><input type='text' v-model="statement"/></td></tr>
        <tr><th>References</th><td><input type='text' v-model="references"/></td></tr>
        <tr><th>Chapter</th><td><input type='text' v-model="chapter"/></td></tr>
      </table>
      <div class='listoflinks'>
        <router-link class='navigatelink navbacklink' :to="{name:'Node', params:{bookid: this.book.id, nodeid: this.node.id}}">Back to node view</router-link>
        <a v-if="$store.state.editMode" class='deletelink' @click='deleteThisNode'>Delete this node</a>
      </div>
  </div>
</template>

<script>
import TopBar from '@/components/TopBar.vue'
import constants from '@/constants.js' // eslint-disable-line no-unused-vars 

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
    valid_types() {
      return Object.keys(constants.VALID_TYPES)
    },
    valid_subtypes(type) {
      return constants.VALID_TYPES[type]
    }
  },
  components: {
    TopBar,
  }
}
</script>

<style scoped lang='stylus'>
.edit-table
 width 80%

.edit-table th
 text-align right

.edit-table td
 text-align left
</style>
