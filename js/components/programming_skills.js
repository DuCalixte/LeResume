/** @jsx React.DOM */
'use strict;'

var ProgrammingSkills = React.createClass({
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
    		data.label = data.language;
    		var last = data['last used'] === '' ? year : parseInt(data['last used']);
    		data.value = last - parseInt(data.start);
    		data.color = CSS_COLOR_NAMES[index];
    	});
    },
    createFullPie: function(){
    	var self = this;
    	return {
    		header: {
    			title: {
    				text:     "Programming Languages",
					color:    "#333333",
					fontSize: 24,
					font:     "open sans"
    			},
    			subtitle: {
    				text:     "The skills and experience acquired over the years.",
					color:    "#999999",
					fontSize: 12,
					font:     "open sans"
    			},
    			location: "top-center",
				titleSubtitlePadding: 9
    		},
    		footer: {
    			text: "",
				color:    "#999999",
				fontSize: 10,
				font:     "open sans",
				location: "bottom-left"
    		},
    		size: {
    			canvasWidth: 700,
				canvasHeight: 500,
				pieInnerRadius: "0%",
				pieOuterRadius: "90%"
    		},
    		data: {
    			sortOrder: "value-desc",
    			smallSegmentGrouping: {
    				enabled: false,
					value: 1,
					valueType: "percentage",
					label: "Other",
					color: "#cccccc"
    			},
    			content: self.props.skills
    		},
    		labels: {
    			enableTooltips: true,
    			outer: {
    				format: "label",
    				hideWhenLessThanPercentage: null,
    				pieDistance: 32
    			},
    			inner: {
    				format: "percentage",
    				hideWhenLessThanPercentage: 2
    			},
    			mainLabel: {
    				color: "#333333",
    				font: "Open sans",
    				fontSize: 11
    			},
    			percentage: {
    				color: "#ffffff",
					font: "Open sans",
					fontSize: 10,
					decimalPlaces: 0
    			},
    			value: {
    				color: "#adadad",
					font: "Open sans",
					fontSize: 11
    			},
    			lines: {
    				enabled: true,
					style: "curved",
					length: 32,
					color: "segment"
    			},
    			truncation: {
    				enabled: true,
    				truncateLength: 30
    			}
    		},
    		tooltips: {
    			enabled: true,
    			type: "placeholder",
    			string: "{label} - Last project: {statement}",
    			styles: {
    				fadeInSpeed: 250,
					backgroundColor: "#000000",
					backgroundOpacity: 0.5,
					color: "#efefef",
					borderRadius: 2,
					font: "arial",
					fontSize: 10,
					padding: 4,
					wordWrap: "break-word"
    			},
    		},
    		effects: {
    			load: {
    				effect: "default", // none / default
    				speed: 1000
    			},
    			pullOutSegmentOnClick: {
    				effect: "linear", // none / linear / bounce
					speed: 400,
					size: 8
    			},
    			highlightSegmentOnMouseover: true,
    			highlightLuminosity: -0.5
    		},
    		misc: {
    			colors: {
    				background: null,
    				segmentStroke: "#ffffff"
    			},
    			gradient: {
    				enabled: true,
					percentage: 100,
					color: "#000000"
    			},
    			canvasPadding: {
    				top: 5,
					right: 5,
					bottom: 5,
					left: 5
    			},
    			pieCenterOffset: {
    				x: 0,
    				y: 0
    			}
    		}
    	};
    },
	render: function(){
		this.parseData();
		this.createFullPie();
		var self = this;
		var pie = new d3pie("fullPie", this.createFullPie());

		return(
			<div className={self.props.klass} id="fullPie" />
			);
	}
})