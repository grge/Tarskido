import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuid } from 'uuid'
import graphlib from '@/graphlib_ext.js';

import constants from '@/constants.js';

Vue.use(Vuex)

function blank_node() {
    return {
        id: null,
        reference: '',
        name: '',
        type: 'Comment',
        subtype: 'Comment',
        statement: '',
        references: [],
        chapter: "ROOT",
        proof_lines: []
    }
}

var store = new Vuex.Store({
  state: {
      books: {
        
      },
      selectedBookId: null,
      editMode: true,
      viewMode: 'book'
  },
  getters: {
      tableOfContentsData(state, getters) {
        var g = getters.selectedBookGraph

        console.log("Creating tree...")
        function get_tree(nodeid) {
            return g.children(nodeid).map((n) => {
                var n_state = state.books[state.selectedBookId].nodes[n];
                return {
                    id: n_state.id,
                    reference: n_state.reference,
                    label: n_state.reference,
                    type: n_state.type,
                    subtype: n_state.subtype,
                    name: n_state.name,
                    children: get_tree(n_state.id)
                }
            })
        }
        return get_tree("ROOT")
      },
      selectedBookGraph(state) {
          var book = state.books[state.selectedBookId];
          var g = new graphlib.Graph({directed: true, compound: true}).setGraph({})

          console.log("Creating graph...")
          Object.values(book.nodes).forEach((node) => {
            g.setNode(node.id, {
                id: node.id,
                name:node.name,
                label:node.subtype + " " + node.reference + (node.name ? "\n" + node.name : ""),
                reference:node.reference,
                type:node.type,
                subtype:node.subtype
            })
            g.setNode("ROOT", {})
            node.references.forEach((ref) => {g.setEdge(ref, node.id, {label: ""})})
            node.proof_lines.forEach((line) => {line.references.forEach((ref) => {g.setEdge(ref, node.id, {label: ""})})})
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
        var node = blank_node()
        node.id = id
        Vue.set(state.books[bookid].nodes, id, node);
    },
    createChildNode(state, payload) {
        var id = uuid();
        var node = blank_node()
        node.id = id
        node.chapter = payload.nodeid
        Vue.set(state.books[payload.bookid].nodes, id, node);
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
    createProofLine(state, payload) {
        state.books[payload.bookid].nodes[payload.nodeid].proof_lines.push({
            statement: "",
            references: []
        })
    },
    deleteProofLine(state, payload) {
        state.books[payload.bookid].nodes[payload.nodeid].proof_lines.splice(payload.ix, 1)
    },
    updateProofLineStatement(state, payload) {
        Vue.set(state.books[payload.bookid].nodes[payload.nodeid].proof_lines[payload.ix], 'statement', payload.statement)
    },
    updateProofLineReferences(state, payload) {
        Vue.set(state.books[payload.bookid].nodes[payload.nodeid].proof_lines[payload.ix], 'references', payload.references)
    },
    updateViewMode(state, mode) {
        state.viewMode = mode
    }
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