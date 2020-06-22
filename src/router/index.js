import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NewBook from '../views/NewBook.vue'
import BookFront from '../views/BookFront.vue'
import BookEdit from '../views/BookEdit.vue'
import NodeEdit from '../views/NodeEdit.vue'
import Node from '../views/Node.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/newbook',
    name: 'NewBook',
    component: NewBook
  },
  {
    path: '/book/:bookid/edit',
    name: 'BookEdit',
    component: BookEdit
  },
  {
    path: '/book/:bookid',
    name: 'BookFront',
    component: BookFront
  },
  {
    path: '/book/:bookid/:nodeid/edit',
    name: 'NodeEdit',
    component: NodeEdit
  },
  {
    path: '/book/:bookid/:nodeid',
    name: 'Node',
    component: Node
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
