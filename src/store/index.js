import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuid } from 'uuid'
import dagre from 'dagre-d3';

import constants from '@/constants.js';

Vue.use(Vuex)

var store = new Vuex.Store({
  state: {
      books: {
        
      },
      selectedBookId: null,
      editMode: true,
  },
  getters: {
      tableOfContentsData(state) {
          var book = state.books[state.selectedBookId];
          return Object.values(book.nodes);
      },
      selectedBookGraph(state) {
          var book = state.books[state.selectedBookId];
          var g = new dagre.graphlib.Graph({directed: true, compound: true})

          Object.values(book.nodes).forEach((node) => {
            g.setNode(node.id, {id: node.id, name:node.name, reference:node.reference, type:node.type, subtype:node.subtype})
            node.references.forEach((ref) => {g.setEdge(ref, node.id)})
            g.setParent(node.id, node.chapter)
          })
          return g
      }
  },
  mutations: {
    initialiseFromLocalStorage(state) {
        if(localStorage.getItem('books')) {
            state.books = JSON.parse(localStorage.getItem('books'))
        }
    },
    setSelectedBookId(state, bookid) {
        if (bookid === undefined) {
            bookid = null
        }
        Vue.set(state, 'selectedBookId', bookid)
    },
    createNewBook(state) {
        var id = uuid();
        Vue.set(state.books, id,  {
            id: id,
            author: 'Anonymous',
            title: 'Unnammed Book',
            preface: '',
            nodes: {}
        });
    },
    deleteBook(state, bookid) {
        Vue.delete(state.books, bookid)
    },
    updateBookTitle(state, payload) {
        Vue.set(state.books[payload.bookid], 'title', payload.title)
    },
    updateBookAuthor(state, payload) {
        Vue.set(state.books[payload.bookid], 'author', payload.author)
    },
    updateBookPreface(state, payload) {
        Vue.set(state.books[payload.bookid], 'preface', payload.text)
    },
    createNode(state, bookid) {
        var id = uuid();
        Vue.set(state.books[bookid].nodes, id, {
            id: id,
            reference: '',
            name: '',
            type: 'Comment',
            subtype: 'Comment',
            statement: '',
            references: [],
            chapter: null,
        })
    },
    deleteNode(state, payload) {
        Vue.delete(state.books[payload.bookid].nodes, payload.nodeid)
    },
    updateNodeReference(state, payload) {
        Vue.set(state.books[payload.bookid].nodes[payload.nodeid], 'reference', payload.reference)
    },
    updateNodeName(state, payload) {
        Vue.set(state.books[payload.bookid].nodes[payload.nodeid], 'name', payload.name)
    },
    updateNodeType(state, payload) {
        var node = state.books[payload.bookid].nodes[payload.nodeid];
        var valid_subtypes = constants.VALID_TYPES[payload.type];
        Vue.set(node, 'type', payload.type)
        if (! valid_subtypes.includes(node.subtype)) {
            Vue.set(node, 'subtype', valid_subtypes[0])
        }
    },
    updateNodeSubType(state, payload) {
        Vue.set(state.books[payload.bookid].nodes[payload.nodeid], 'subtype', payload.subtype)
    },
    updateNodeStatement(state, payload) {
        Vue.set(state.books[payload.bookid].nodes[payload.nodeid], 'statement', payload.statement)
    },
    updateNodeReferences(state, payload) {
        Vue.set(state.books[payload.bookid].nodes[payload.nodeid], 'references', payload.references)
    },
    updateNodeChapter(state, payload) {
        Vue.set(state.books[payload.bookid].nodes[payload.nodeid], 'chapter', payload.chapter)
    },
  },
  actions: {
  },
  modules: {
  },
  strict: true
});

store.subscribe((mutation, state) => {
    localStorage.setItem('books', JSON.stringify(state.books))
});

export default store