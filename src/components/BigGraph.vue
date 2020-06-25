<template>
  <div class='biggraph'>
    <svg width="100%" height="100%"></svg>
  </div>
</template>

<script>
import dagre from 'dagre-d3'
import * as d3 from 'd3'

export default {
  name: 'BigGraph',
  mounted() {
    var g = this.$store.getters.selectedBookGraph.setGraph({rankdir: 'LR', ranker:'tight-tree'})
    // g.removeNode("ROOT")
    var render = new dagre.render();
    var svg = d3.select('svg')
    var inner = svg.append('g');
    render(inner, g)
    // Run the renderer. This is what draws the final graph.
    var zoom = d3.zoom().on("zoom", () => { inner.attr("transform", d3.event.transform);});
    svg.call(zoom);

    // Center the graph
    // g.nodes().forEach(function(v) {
    //   var node = g.node(v);
    //   // Round the corners of the nodes
    //   node.rx = node.ry = 5;
    // });
    var initialScale = 0.75;
    svg.call(zoom.transform, d3.zoomIdentity.translate((svg.node().getBBox().width - g.graph().width * initialScale) / 2, 20).scale(initialScale));

    console.log(svg.node().getBBox().width)
    // svg.attr('height', g.graph().height * initialScale + 40);
    
  }
}
</script>

<style lang='stylus'>
text 
  fill black 

.biggraph 
  overflow: hidden;
  width: 1000px;
  height: 1000px

.node rect
  stroke black
  fill white
  border-radius 5px
  
.cluster rect 
  fill white
  stroke gray

.edgePath path {
  stroke black
}

</style>
