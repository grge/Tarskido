import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'markdown-it-vue/dist/markdown-it-vue.css'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate() {
    this.$store.commit('initialiseFromLocalStorage')

    // this is required in case the user navigates directly to a book via url
    // in which case the "watch" below would not be activated
    this.$store.commit('setSelectedBookId', this.$route.params.bookid)
  },
  watch: {
    '$route.params.bookid': function(bookid) {
      this.$store.commit('setSelectedBookId', bookid)
    }
  }
}).$mount('#app')
