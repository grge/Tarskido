<script lang="ts">
import LargeTableOfContents from '@/components/LargeTableOfContents.vue';
import ContextGraph from '@/components/ContextGraph.vue';
import CorenerMenu from '@/components/CornerMenu.vue';
import { useBookStore } from '@/stores/bookshelf';
import MarkdownRenderer from '@/components/MarkdownRenderer.vue';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'vue-router';

export default {
  components: {
    MarkdownRenderer,
    CorenerMenu,
    LargeTableOfContents,
    ContextGraph,
  },
  setup() {
    const store = useBookStore();
    const book = store.rawBook;
    const router = useRouter();

    function createNewNode() {
      const nodeId = uuidv4();
      const node = {
        id: nodeId,
        reference: '',
        name: '',
        nodetype: { primary: '', secondary: '' },
        statement: '',
        references: [],
        chapter: '',
        proof_lines: []
      };
      store.upsertNode(node);
      router.push({ name: 'NodeEdit', params: { bookid: store.rawBook.id, nodeid: nodeId }}); 
    }


    function cleanBrokenRefs() {
      for (const nodeId in book.nodes) {
        const node = book.nodes[nodeId];
        node.references = node.references.filter(refId => book.nodes[refId]);
        node.proof_lines.forEach(line => {
          line.references = line.references.filter(refId => book.nodes[refId]);
        });
        if (node.chapter && !book.nodes[node.chapter]) {
          node.chapter = 'ROOT'
        }
      }
    }

    return { book, createNewNode, cleanBrokenRefs, store };
  },
}
</script>

<template>
  <div>
    <CorenerMenu />
      <div class='book-content'>
        <h1 class='book-front-title'>{{book.title}}</h1>
        <div class='book-front-author'>by {{book.author}}</div>
        <div class='listoflinks' v-if="store.editMode">
          <router-link class='editlink' :to="{ name: 'BookEdit', params: {bookid: book.id}}">Edit book attributes</router-link>
          <a class='editlink' @click="createNewNode()">Create a new node</a>
          <a class='editlink' @click="cleanBrokenRefs()">Clean broken references</a>
        </div>
        <ContextGraph :contextIds='["ROOT"]'/>
        <div class='book-preface'>
        <MarkdownRenderer :markdown="book.preface" />
        </div>

        <!-- <MdEditor v-model="book.preface" previewOnly /> -->
        <LargeTableOfContents />
      </div>
  </div>
</template>

<style scoped lang='stylus'>
.book-content
  text-align left

.book-front-title 
  margin-bottom 0.15em
  margin-top 1em
  font-size 40px
  text-align center

.book-front-author
  margin-bottom 0.5em
  font-size 25px
  font-style italic
  text-align center

.book-preface
  text-align left
  max-width 40em
  margin 0 auto

.listoflinks
  margin-bottom 1.5em
  text-align center

p
  word-break break-word
  overflow-wrap break-word
  white-space pre-wrap
</style>
