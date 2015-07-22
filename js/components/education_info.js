/** @jsx React.DOM */
'use strict;'

var Education = React.createClass({
    getDefaultProps: function() {
        return {
        	universities: [],
        	certifications: []
        };
    },
	render: function(){
		var self = this;
		return (
			<div id="education">
				<div className="page-header"><h3>Education</h3></div>
				<div className="panel-group">
					<Universities universities={this.props.universities} />
					<Certifications certifications={this.props.certifications} />
				</div>
			</div>
		);
	}
});

var Universities = React.createClass({
	render: function(){
		var universities = this.props.universities;
		return(
			<div className="panel panel-default">
				<div className="panel-heading"><h3>Education: <small>Degrees</small></h3></div>
				<div className="panel-body">
				{universities.map(function(university, index){
					return <div><span><strong>{university.degree}</strong> - {university.university} - {university.graduated}</span></div>;
				})}
			</div></div>
			);
	}
});

var Certifications = React.createClass({
	render: function(){
		var certifications = this.props.certifications;
		return(
			<div className="panel panel-default">
				<div className="panel-heading"><h3>Education: <small>Certifications</small></h3></div>
				<div className="panel-body">
				{certifications.map(function(certification, index){
					return <div><span><strong>{certification.certification}</strong> - {certification.university} - {certification.years}</span></div>;
				})}
			</div></div>
			);
	}
});