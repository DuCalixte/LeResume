'use strict;'

var WorkExperience = React.createClass({
    getDefaultProps: function() {
        return {experiences: []};
    },
	render: function(){
		var self = this;
		return (
			<div id="experience">
				<div className="page-header"><h3>Work Experience</h3></div>
				<section className="ac-container">
					{this.props.experiences.map(function(experience, index){
						var id = "ac-" + (index + 1);
						var name = "accordion-" + (index + 1);
						return <Experience id={id} name={name} experience={experience} />;
					})}
				</section>
			</div>
		);
	}
});

var Experience = React.createClass({
	getInitialState: function(){
		return { checked: false };
	},
	clicked: function(status){
		this.setState({checked: status});
	},
	render: function(){
		var experience = this.props.experience;
		var self = this;
		return (
			<div>
				<input id={this.props.id} name={this.props.name} type="radio" checked={self.state.checked}  />
					<label for="{this.props.id}" onClick={self.clicked.bind(self, !self.state.checked)}>{experience.company} - {experience.role}</label>
					<article className="ac-large"><div className="container">
						<span className="top-text"><strong>
							<small className="float-left text-left">{experience.period}</small>
							<small className="right-text">{experience.location}</small>
						</strong></span>
						<div className="description">
						<span><br /><br />{(function(duties){var rows=[]; for(index in duties){rows.push(<p className="duty">{duties[index]}</p>)}return rows})(experience.duties)}
						</span></div>
						</div>
					</article>
			</div>
		);
	}
});