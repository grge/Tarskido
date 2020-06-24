<template>
  <div>
    <h3>Contents</h3>
    <table>
      <tr :key='node_lvl0.id' v-for="node_lvl0 in this.$store.getters.tableOfContentsData">
        <td>
          <div class='level-0'>
            {{node_lvl0.subtype}} {{node_lvl0.reference}}.
          </div>
        </td>
        <td>
          <router-link
            :to="{name: 'Node', params: {bookid: book.id, nodeid: node_lvl0.id}}"
            class='level-0'
            v-if='node_lvl0.name != ""'>
            {{node_lvl0.name}}
          </router-link>
          <router-link
            :to="{name: 'Node', params: {bookid: book.id, nodeid: node_lvl0.id}}"
            class='level-0'
            v-if='node_lvl0.name == ""'>
            Unnamed
          </router-link>
          <div :key='child_lvl1.id' v-for='child_lvl1 in node_lvl0.children'>
            <router-link
              :to="{name: 'Node', params: {bookid: book.id, nodeid: child_lvl1.id}}"
              class='level-1'>
              {{child_lvl1.subtype}} {{child_lvl1.reference}}&emsp;&emsp;{{child_lvl1.name}}
            </router-link>
            <div :key='child_lvl2.id' v-for='child_lvl2 in child_lvl1.children'>
              <router-link
                :to="{name: 'Node', params: {bookid: book.id, nodeid: child_lvl2.id}}"
                class='level-2'>
                {{child_lvl2.subtype}} {{child_lvl2.reference}}&emsp;{{child_lvl2.name}}
              </router-link>
            </div>
          </div>
        </td>
      </tr>
    </table>
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
h3
 font-size 18pt 

table
 font-size 16pt
 width 80%
 margin 0 auto

table a
 text-decoration none
 color black

table a:hover
 text-decoration underline

table tr td:first-child
 vertical-align top
 text-align right
 padding-right 2em
 width 15em

table td
 padding-bottom 1em

table tr td:nth-child(2)
 vertical-align top
 text-align left
 width 90em

.level-0
 line-height 2em
 font-weight bold

.level-1
 line-height 1.5em
 margin-top 2em

.level-2
 font-style italic
 margin-left 1.15em

</style>
