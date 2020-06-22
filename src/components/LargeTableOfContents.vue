<template>
  <div>
    <h3>Contents</h3>
    <ul>
      <li :key='node.id' v-for="node in this.$store.getters.tableOfContentsData">
        <router-link :to="{name: 'Node', params: {bookid: book.id, nodeid: node.id}}">{{node.id}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'LargeTableOfContents',
  computed: {
    book() {
      return this.$store.state.books[this.$route.params.bookid];
    }
  }
}
</script>

<style scoped lang="stylus">
</style>
