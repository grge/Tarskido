<template>
  <router-link :to="{name: 'Node', params: {bookid: this.$store.state.selectedBookId, nodeid: node.id}}" class='reference-link'>
    <span :class='"reference-subtype-" + node.subtype'>{{node.subtype}} {{node.reference}}</span>
  </router-link>
</template>

<script>
export default {
  name: 'NodeReference',
  props: {
      node: Object
  },
}
</script>

<style scoped lang="stylus">

.reference-subtype-Comment::before
  content "= "

.reference-subtype-Note::before
  content "= "

.reference-subtype-Chapter::before
  content "✧ "

.reference-subtype-Appendix::before
  content "✧ "

.reference-subtype-Definition::before
  content "▣ "

.reference-subtype-Axiom::before
  content "▣ "

.reference-subtype-Proposition::before
  content "⍟ "

.reference-subtype-Corollary::before
  content "⍟ "

.reference-subtype-Theorem::before
  content "⬤ "

.reference-subtype-Lemma::before
  content "◑ "
</style>
