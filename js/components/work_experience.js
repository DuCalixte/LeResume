'use strict;'

var WorkExperience = React.createClass({
    getDefaultProps: function() {
        return {experiences: []};
    },
	render: function(){
		var self = this;
		return (
			<div className="panel-group">
				<div className="panel-heading"><h3 className="panel-title">Work Experience</h3></div>
					{this.props.experiences.map(function(experience, index){
						var _class = (index === 0 ? "panel panel-primary" : "panel panel-default");
						return <Experience klass={_class} experience={experience}/>;
					})}
			</div>
		);
	}
});

var Experience = React.createClass({
	render: function(){
		var experience = this.props.experience;
		return (
			<div className={this.props.klass}>
				<div className="panel-heading"><h3 className="panel-title">{experience.company} - {experience.role}</h3></div>
				<div className="panel-body">
					<span>
						<small className="float-left text-left">{experience.period}</small>
						<small className="float-right text-right">{experience.location}</small>
					</span>
					<span><p className="description">{experience.duties}</p></span>
				</div>
			</div>
		);
	}
});