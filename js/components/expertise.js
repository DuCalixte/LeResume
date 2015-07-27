/** @jsx React.DOM */
'use strict;'

var Expertise = React.createClass({
	getDefaultProps: function() {
        return {
        	skills: [],
        	klass: ''
        };
    },
    parseData:function(){
    	var self = this;
    	var year = new Date().getFullYear();
    	this.props.skills.map(function(data, index){
    		// data.label = data.language;
    		var last = data['last used'] === '' ? year : parseInt(data['last used']);
    		data.value = last - parseInt(data.start);
    	});
    },
    createBarChart: function(el){
    	var categories = ['Novice', 'Limited', 'Intermediate', 'Advanced', 'Expert'];
    	var color = d3.scale.category20b();
    	var width = 600, height = 400;
    	var canvas = d3.select(el)
    		.attr({'width':width,'height':height});

    	var margin = {top: 50, bottom: 100, left:150, right: 50};
    	var width = 600;
    	var height = 400;

    	var xScale = d3.scale.linear().range([0, width]);
    	var yScale = d3.scale.ordinal().rangeRoundBands([0, height], 1.8,0);

    	var numTicks = categories.length;

    	var xAxis = d3.svg.axis().scale(xScale)
                    .orient("top")
                    .tickSize((-height))
                    .ticks(numTicks);

    	var svg = d3.select(el).append("svg")
                .attr("width", width+margin.left+margin.right)
                .attr("height", height+margin.top+margin.bottom)
                .attr("class", "base-svg");

    	var barSvg = svg.append("g")
                .attr("transform", "translate("+margin.left+","+margin.top+")")
                .attr("class", "bar-svg");

    	var x = barSvg.append("g")
            .attr("class", "x-axis");

    	// Prep the tooltip bits, initial display is hidden
		var tooltip = barSvg.append("g")
			.attr("class", "tooltip")
		  	.style("display", "none");
		    
		tooltip.append("rect")
		  	.attr("width", 30)
		  	.attr("height", 20)
		  	.attr("fill", "white")
		  	.style("opacity", 0.5);
		tooltip.append("text")
		  	.attr("x", 15)
		  	.attr("dy", "1.2em")
		  	.style("text-anchor", "middle")
		  	.attr("font-size", "12px")
		  	.attr("font-weight", "bold");

		(function(data){
			var xMax = d3.max(data, function(d) { return d.expertise; } );
        	var xMin = 0;
        	xScale.domain([xMin, xMax]);
       		yScale.domain(data.map(function(d) { return d.language; }));

       		d3.select(".base-svg").append("text")
            .attr("x", margin.left)
            .attr("y", (margin.top)/2)
            .attr("text-anchor", "start")
            .text("Expertise in Software language and framework")
            .attr("class", "title");

            var groups = barSvg.append("g")
            	.attr("class", "labels")
             	.selectAll("text")
               	.data(data)
             	.enter()
            	.append("g");

        	groups.append("text")
                .attr("x", "0")
                .attr("y", function(d) { return yScale(d.language); })
                .text(function(d) { return d.language; })
                .attr("text-anchor", "end")
                .attr("dy", ".9em")
                .attr("dx", "-.32em")
                .attr("id", function(d,i) { return "label"+i; });

        	var bars = groups
                    .attr("class", "bars")
                    .append("rect")
                    .attr("width", function(d) { return xScale(d.expertise); })
                    .attr("height", height/20)
                    .attr("x", xScale(xMin))
                    .attr("y", function(d) { return yScale(d.language); })
                    .style("fill", function(d) { return color(d.expertise); })
                    .attr("id", function(d,i) { return "bar"+i; })
                    .on("mouseover", function() { tooltip.style("display", "block"); })
				  	.on("mouseout", function() { tooltip.style("display", "block"); })
				  	.on("mousemove", function(d) {
					    var xPosition = d3.mouse(this)[0] - 15;
					    var yPosition = d3.mouse(this)[1] - 25;
					    tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
					    tooltip.select("text").text(d.language);
 					});

        	groups.append("text")
                .attr("x", function(d) { return xScale(d.expertise); })
                .attr("y", function(d) { return yScale(d.language); })
                .text(function(d) { return categories[d.expertise -1]; })
                .attr("fill", "white")
                .attr("text-anchor", "end")
                .attr("dy", "1.2em")
                .attr("dx", "-.32em")
                .attr("id", "precise-value")
     //                .on("mouseover", function() { tooltip.style("display", null); })
				 //  	.on("mouseout", function() { tooltip.style("display", "none"); })
				 //  	.on("mousemove", function(d) {
					//     var xPosition = d3.mouse(this)[0] - 15;
					//     var yPosition = d3.mouse(this)[1] - 25;
					//     tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
					//     tooltip.select("text").text(d.language);
					// });

		})(this.props.skills);
    },
    componentDidMount: function() {
		this.parseData();
		this.createBarChart(React.findDOMNode(this));	
    },
	render: function(){
		var self = this;
		return(
			<div className={self.props.klass} id="expertise" />
			);
	}
})