<template>
  <div class='dagre-graph' id='big-graph'>
    <div v-if='$store.state.viewMode=="graph"' id='fullscreen-overlay' class='size-controls'>
      <a @click='$store.commit("updateViewMode", "split")' class='right navigatelink link'>⍅ Show book</a>
    </div>
    <SvgPanZoom
      style="width: 100%; height: 1200px;"
      @svgpanzoom="registerSvgPanZoom"
      :dblClickZoomEnabled='false'
      :controlIconsEnabled='true'
      minZoom="0.1">
      <svg style='width: inherit; height: inherit;'>
        <g ref='svg-container'>


          <g class='nodes'>
            <g :class='"node" + (isSelectedNode(node.id) ? " selected" : "")' :key='node.id' v-for='node in this.nodes_in_draw_order' :transform='"translate(" + node.x + " " + node.y + ")"'>
              <router-link :to='{name: "Node", params:{nodeid:node.id, bookid:$store.state.selectedBookId}}'>
                <rect :width='node.width' :height='node.height' :x='-node.width/2' :y='-node.height/2' rx='5' ry='5' />
              </router-link>
              <g>
                <a @click='toggleChapter(node.id)'>
                  <rect class='cluster-header' :width='node.width' height='30' :x='-node.width/2' :y='-node.height/2' rx='5' ry='5'/>
                  <text :id='node.id' :x='-node.width/2 + 10' :y='-node.height/2 + 18'>{{node.label}}</text>
                </a>
              </g>
            </g>
          </g>
        </g>

        <g class='edges'>
          <g class='edge' :key='e.v + ":" + e.w' v-for='e in this.render_graph._edgeObjs'>
            <path :d='pointsToPath(render_graph.edge(e).points)'/>
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
  components: {
    SvgPanZoom,
  },
  data: function() {
    return {
      mounted: false,
      collapsedNodes: this.graph.getSubgraphNodes("ROOT"),
      svgpanzoom: null
    }
  },
  props: {
    graph: Object
  },
  computed: {
    render_graph() {
      var g = this.graph.filterNodes(() => (true))

      this.collapsedNodes.forEach((n) => (g.collapseSubgraph(n)))

      if (this.mounted) {
        g.setGraph({
          ranker: 'tight-tree',
          align: 'UR',
          rankdir: 'LR',
          nodesep: '10',
          edgesep: '70',
          ranksep: '40'
        })

        g.nodes().forEach((n) => {
          var el = document.getElementById(n)
          if (el) {
            var bbox = el.getBBox()
            g.setNode(n, {...g.node(n), width: bbox.width + 40, height: bbox.height + 20})
          }
          else {
            g.setNode(n, {...g.node(n), width: 250, height: 50})
          }
        })
        dagre.layout(g)
      }
      else {
        g.nodes().forEach((n) => {
          g.setNode(n, {...g.node(n), x: 0, y:0})
        })
        g.edges().forEach((e) => {
          g.setEdge(e, {...g.edge(e), points: [{x: 0, y:0}, {x:0, y:0}, {x:0, y:0}]})
        })
      }

      return g
    },
    clusters_in_draw_order() {
      // breadth first sort of the TOC data

      var g = this.render_graph
      return g.filterNodes((n) => {return (n == 'ROOT' || this.isSubgraph(n))}).getSubgraphNodes("ROOT").map((n) => g.node(n))
    },
    nodes_in_draw_order() {
      var g = this.render_graph
      return g.getSubgraphNodes("ROOT").map((n) => g.node(n))
    },
    subgraph_nodes() {
      return Object.values(this.render_graph._nodes).filter((n) => (n.id && (n.id != 'ROOT') && this.isSubgraph(n.id)))
    },
    non_subgraph_nodes() {
      return Object.values(this.render_graph._nodes).filter((n) => (n && (!this.isSubgraph(n.id))))
    },
    selectedNodeId() {
      return this.$route.params.nodeid
    }
  },
  methods: {
    registerSvgPanZoom(svgpanzoom) {
        this.svgpanzoom = svgpanzoom
    },
    isSelectedNode(nodeid) {
      return this.selectedNodeId == nodeid
    },
    isSubgraph(nodeid) {
      return (!!this.render_graph.children(nodeid).length) && (nodeid != 'ROOT')
    },
    toggleChapter(nodeid) {
      const ix = this.collapsedNodes.indexOf(nodeid)
      const hasChildren = !!this.graph.children(nodeid).length
      if (hasChildren) {
        if (ix > -1) {
          this.collapsedNodes.splice(ix, 1)
        }
        else {
          this.collapsedNodes.push(nodeid)
        }
      }
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
  },
  mounted() {
    this.mounted = true
  },
  updated() {
    // var n = this.render_graph.node("ROOT")
    // var p = {
    //   x: n.x - n.width,
    //   y: n.y - n.height
    // }
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
  fill white
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

.node text
  text-anchor start
  font-weight bold
  fill white

.cluster text
  font-weight bold
  fill white

rect.cluster-header
  stroke-width 1
  stroke black
  fill black

text.cluster-controls
  fill red
  text-anchor end

#big-graph a
  text-decoration none

.graph-border 
  fill red
  stroke black

rect 
  transition all 0.3s ease-in-out

path
  transition all 0.3s ease


</style>