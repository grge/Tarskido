


<template>
  <div class='dagre-graph' id='big-graph'>
    <SvgPanZoom :fit='true' :center='true'>
      <svg width="1000px" height="1000px">

        <g class='clusters'> 
          <g :class='"cluster" + (isSelectedNode(node.id) ? " selected" : "")' :key='node.id' v-for='node in this.subgraph_nodes' :transform='"translate(" + node.x + " " + node.y + ")"'>
            <router-link :to='{name: "Node", params:{nodeid:node.id, bookid:$store.state.selectedBookId}}'>
              <rect :width='node.width' :height='node.height' :x='-node.width/2' :y='-node.height/2' rx='5' ry='5'/>
              <text :x='-node.width/2 + 10' :y='-node.height/2 + 30'>{{node.label}}</text>
            </router-link>
          </g>
        </g>

        <g class='edges'>
          <g class='edge' :key='e.v + ":" + e.w' v-for='e in this.render_graph._edgeObjs'>
            <path :d='pointsToPath(render_graph.edge(e).points)'/>
          </g>
        </g>

        <g class='nodes'>
          <g :class='"node" + (isSelectedNode(node.id) ? " selected" : "")' :key='node.id' v-for='node in this.non_subgraph_nodes' :transform='"translate(" + node.x + " " + node.y + ")"'>
            <router-link :to='{name: "Node", params:{nodeid:node.id, bookid:$store.state.selectedBookId}}'>
              <rect :width='node.width' :height='node.height' :x='-node.width/2' :y='-node.height/2' rx='5' ry='5' />
              <text>{{node.label}}</text>
            </router-link>
          </g>
        </g>

      </svg>
    </SvgPanZoom>
  </div>
</template>

<script>
import dagre from 'dagre'
import SvgPanZoom from 'vue-svg-pan-zoom'


export default {
  name: 'Dagre',
  props: {
    graph: Object
  },
  computed: {
    render_graph() {
      var g = this.graph.filterNodes(() => true).setGraph({
        rankger: 'tight-tree',
        rankdir: 'LR',
        nodesep: '20',
        edgesep: '50',
        ranksep: '50'
      })
      g.nodes().forEach((n) => (g.setNode(n, {...g.node(n), width: 250, height: 50})))
      // g.edges().forEach((e) => {
      //   g.setEdge(e,{ label: '' })
      // })
      dagre.layout(g)
      return g
    },
    subgraph_nodes() {
      return Object.values(this.render_graph._nodes).filter((n) => (n.id && (n.id != 'ROOT') && this.isSubgraph(n.id)))
    },
    non_subgraph_nodes() {
      return Object.values(this.render_graph._nodes).filter((n) => (n && !this.isSubgraph(n.id)))
    },
    selectedNodeId() {
      return this.$route.params.nodeid
    }
  },
  components: {
    SvgPanZoom,
  },
  methods: {
    isSelectedNode(nodeid) {
      return this.selectedNodeId == nodeid
    },
    isSubgraph(nodeid) {
      return (!!this.render_graph.children(nodeid).length) && (nodeid != 'ROOT')
    },
    pointsToPath(points) {
      var p = [points[0], ...points, points[points.length - 1], points[points.length - 1]]

      var out = "M " + p[0].x + " " + p[0].y + " "

      // Straight lines
      for (var i = 1; i < p.length; i++) {
        out += "L " + p[i].x + " " + p[i].y + " "
      }
      return out
    }
  }
}
</script>

<style lang='stylus'>

.node rect 
  z-index 1
  fill white
  stroke black

.node text
  text-anchor middle
  dominant-baseline central

.cluster rect
  z-index 1
  fill #eeeeee
  stroke black
  stroke-width 4

.cluster:hover rect, .node:hover rect
  filter drop-shadow(0px 0px 6px yellow)
  stroke orange

.cluster:hover text, .node:hover text
  fill orange

.edge path
  fill transparent
  stroke black
  stroke-width 2

.selected rect
  fill #ffffaa

text
  fill black
  font-size 22px
  font-family sans-serif

.cluster text
  font-weight bold

#big-graph a
  text-decoration none



</style>