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
    },
	render: function(){
		var self = this;
		return(
			<div className={self.props.klass}>One</div>
			);
	}
})