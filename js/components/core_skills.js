/** @jsx React.DOM */
'use strict;'

var CoreSkills = React.createClass({
	getDefaultProps: function() {
        return {
        	technologies: [],
        	skills: [],
        	// content: []
        };
    },
	getInitialState: function(){
		return { focused: 0 };
	},
	clicked: function(index){
		this.setState({focused: index});
	},
	setShowHide: function(index){
		return ((this.state.focused === index) ? 'page-item show-container' : 'page-item hide-container');
	},
	render: function(){
		var self = this;
		// var content = this.props.content;
		var content = [
			{"container": <ProgrammingSkills skills={this.props.skills} klass={this.setShowHide(0)}/>, "name": "Developer Skills"},
			{"container": <TechnologySkills technologies={this.props.technologies} klass={this.setShowHide(1)}/>, "name": "Software Skills"},
			{"container": <Expertise skills={this.props.skills} klass={this.setShowHide(2)}/>, "name": "Language Expertise"}
		];
		return (
			<div className="container" id="skills">
				<div className="text-center graph-container">
				{(function(data){
									var rows = [];
									for (i in data){
										rows.push(data[i].container);
									}
									return rows;
								})(content)}
				</div>
				<div className="pagination-centered">
				  <ul className="pagination pagination-sm text-center">
				    <li>
				      <a href="#" aria-label="Previous">
				        <span aria-hidden="true">&laquo;</span>
				      </a>
				    </li>
				    {(function(data){
				    				    	var rows = [];
				    				    	for (i in data){
				    				    		var index = parseInt(i);
				    				    		var klass = ((self.state.focused === index) ? 'item active' : 'item');
				    				    		rows.push(<li className={klass}><a href="#skills" onClick={self.clicked.bind(self, index)}>{data[i].name}</a></li>);
				    				    	}
				    				    	return rows;
				    				    })(content)}
				    <li>
				      <a href="#" aria-label="Next">
				        <span aria-hidden="true">&raquo;</span>
				      </a>
				    </li>
				  </ul>
				</div>
			</div>
			);
	}
});