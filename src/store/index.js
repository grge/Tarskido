import Vue from 'vue'
import Vuex from 'vuex'
import { v4 as uuid } from 'uuid'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
      books: {
        
      },
      selectedBookId: null,
      editMode: true,
  },
  mutations: {
      createNewBook(state) {
          var id = uuid();
          Vue.set(state.books, id,  {
              id: id,
              author: 'Anonymous',
              title: 'Unnammed Book',
              nodes: []
          });
      }
  },
  actions: {
  },
  modules: {
  }
})
