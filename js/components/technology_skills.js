/** @jsx React.DOM */
'use strict;'

var TechnologySkills = React.createClass({
	getDefaultProps: function() {
        return {
        	technologies: [],
        	klass: ''
        };
    },
    parseData:function(){
    	var self = this;
    	var year = new Date().getFullYear();
    	var recursiveParse = function(data){
    		data.map(function(content,index){
    			content.name = content.technology;
    			delete content.technology;

    			if (content.hasOwnProperty('technologies')){
    				content.children = content.technologies;
    				delete content.technologies;
    				recursiveParse(content.children);
    			}
    			else{
    				var last = content['last used'] === '' ? year : parseInt(content['last used']);
    				content.size = last - parseInt(content.start);
    			}
    			
    		})
    	}
    	recursiveParse(this.props.technologies);
    	this.props.technologies = {name: "Experience and skills on technologies", children: this.props.technologies};
    },
    createChart: function(el){
    	var self = this;
    	var margin_x = 0, margin_y = 0;
    	// var margin = {top: 20, right: 20, bottom: 20, left: 20},
		   //  padding = {top: 50, right: 10, bottom: 50, left: 10},
		   //  outerWidth = 560,
		   //  outerHeight = 500,
		   //  innerWidth = outerWidth - margin.left - margin.right,
		   //  innerHeight = outerHeight - margin.top - margin.bottom,
		   //  width = innerWidth - padding.left - padding.right,
		   //  height = innerHeight - padding.top - padding.bottom,
		   //  radius = Math.min(width, height) / 2;

    	var width = 500, height = 400, radius = Math.min(width-margin_x, height-margin_y) / 2;

		var x = d3.scale.linear()
    	.range([0, 2 * Math.PI]);

		var y = d3.scale.sqrt()
		    .range([0, radius]);

		var color = d3.scale.category20c();

		var svg = d3.select(el).append("svg")
		    .attr("width", width+100)
		    .attr("height", height+100)
		  .append("g")
		    .attr("transform", "translate(" + ((width-margin_x) / 2) + "," + ((height-margin_y) / 2) + ")");

		var partition = d3.layout.partition()
			.value(function(d) { return d.size; });
		    // .sort(null)
		    // .value(function(d) { return 1; });

		var arc = d3.svg.arc()
		    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
		    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
		    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
		    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

		var tooltip = d3.select(el)
			.append("div")
		    .attr("class", "tooltip")
		    .style("position", "absolute")
		    .style("z-index", "10")
		    .style("opacity", 0);

		// var text = g.append("text")
		// 	.attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
		//     .style("font-size", "10px")
		//     .attr("x", function(d) { return y(d.y); })
		// 	.attr("dx", "20") // margin
		//     .attr("dy", ".15em") // vertical-align
		//     .text(function(d) { return d.name; });

		 // Parse data to D3 Map

		 (function(root){
		 	  node = root;
			var g = svg.selectAll("g")
      			.data(partition.nodes(root))
    			.enter().append("g");

  				var path = g.append("path")
	    			.attr("d", arc)
	    			.style("fill", function(d) { return color(d.name); })
	    			.on("click", click)
	    			.on("mouseover", function(d) {
          				tooltip.html(function() {
              				var name = format_name(d);
              				return name;
         				});
          				return tooltip.transition()
            			.duration(50)
            			.style("opacity", 0.9);
        			})
        			.on("mousemove", function(d) {
          				return tooltip
            			.style("top", (d3.event.pageY-10)+"px")
            			.style("left", (d3.event.pageX+10)+"px");
        			})
        			.on("mouseout", function(){return tooltip.style("opacity", 0);});

 				function click(d) {
   				// fade out all text elements
    				// text.transition().attr("opacity", 0);

    				path.transition()
				      .duration(750)
				      .attrTween("d", arcTweenZoom(d));
				      // .each("end", function(e, i) {
          // 		// check if the animated element's data e lies within the visible angle span given in d
          // 		if (e.x >= d.x && e.x < (d.x + d.dx)) {
          //   	// get a selection of the associated text element
          //   	var arcText = d3.select(this.parentNode).select("text");
          //   	// fade in the text element and recalculate positions
          //   	arcText.transition().duration(750)
          //     	.attr("opacity", 1)
          //     	.attr("transform", function() { return "rotate(" + computeTextRotation(e) + ")" })
          //     	.attr("x", function(d) { return y(d.y); });
          // 		}});
  		}

		 })(self.props.technologies);

		 // Done with that
		 d3.select(self.frameElement).style("height", height + "px");

		// Setup for switching data: stash the old values for transition.
		function stash(d) {
		  d.x0 = d.x;
		  d.dx0 = d.dx;
		}

		// When switching data: interpolate the arcs in data space.
		function arcTweenData(a, i) {
		  var oi = d3.interpolate({x: a.x0, dx: a.dx0}, a);
		  function tween(t) {
		    var b = oi(t);
		    a.x0 = b.x;
		    a.dx0 = b.dx;
		    return arc(b);
		  }
		  if (i == 0) {
		   // If we are on the first arc, adjust the x domain to match the root node
		   // at the current zoom level. (We only need to do this once.)
		    var xd = d3.interpolate(x.domain(), [node.x, node.x + node.dx]);
		    return function(t) {
		      x.domain(xd(t));
		      return tween(t);
		    };
		  } else {
		    return tween;
		  }
		}

  		function format_number(x) {
    		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  		}


  		function format_name(d) {
    		var name = d.name;
    		var experience = d.children ? '' : '<br />Years of experience: <strong>' + format_number(d.value) + '</strong>';
    		return '<span><strong>' + 
    				name + 
    				'</strong>' +
    				experience +
    				'</span>';
  		}

		function computeTextRotation(d) {
  			return (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 270;
		}

		// When zooming: interpolate the scales.
		function arcTweenZoom(d) {
		  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
		      yd = d3.interpolate(y.domain(), [d.y, 1]),
		      yr = d3.interpolate(y.range(), [d.y ? 10 : 0, radius]);
		  return function(d, i) {
		    return i
		        ? function(t) { return arc(d); }
		        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
		  };
		};
    },
    componentDidMount: function(){
    	this.parseData();
    	this.createChart(React.findDOMNode(this));
    },
    render: function(){
    	var self = this;
    	return(
			<div className={self.props.klass} id="techChart" />
		);
    }
})