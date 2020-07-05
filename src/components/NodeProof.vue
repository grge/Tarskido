<template>
    <div class='node-proof' v-if='node.proof_lines.length'>
        <h4 class='proof-heading'>Proof:</h4>
        <div class="proof-line" :key='ix' v-for='(line, ix) in node.proof_lines'> 
          <MarkdownItVue class='md-body' :content="line.statement" />
          <ReferenceList :nodeids="line.references" v-if='line.references.length' />
        </div>
    </div>
</template> 
<script>
import ReferenceList from '@/components/ReferenceList.vue'
import MarkdownItVue from 'markdown-it-vue'

export default {
  name: 'NodeProof',
  computed: {
    book() {
      return this.$store.state.books[this.$route.params.bookid];
    }
  },
  props: {
    node: Object,
  },
  components: {
    ReferenceList,
    MarkdownItVue
  }
}
</script>

<style scoped lang="stylus">

.node-proof h4 
  font-variant small-caps
  font-weight normal
  margin-bottom 0.5em

.proof-line
  font-size 18px
  padding-left 1em
  width 45em
  border-left 10px solid #dddddd


</style>

