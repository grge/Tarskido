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

.reference-subtype-Comment
  content "◀ "

.reference-subtype-Note
  content "= "

.reference-subtype-Chapter
  content "◀ "

.reference-subtype-Appendix
  content "◀ "

.reference-subtype-Definition
  content "◀ "

.reference-subtype-Axiom
  content "◀ "

.reference-subtype-Proposition
  content "◀ "

.reference-subtype-Corollary
  content "◀ "

.reference-subtype-Theorem
  content "◀ "

.reference-subtype-Lemma
  content "◀ "
</style>
