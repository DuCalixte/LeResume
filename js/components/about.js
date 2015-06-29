/** @jsx React.DOM */
'use strict;'

var About = React.createClass({
	render: function(){
		var name = "", role = "", image="", social=[], statement="", key_skills=[];
		if (this.props.about){
		name = this.props.about.name;
		role = this.props.about.role;
		image = this.props.about.gravatar;
		social = this.props.about.social;
		statement = this.props.about.statement;
		key_skills = this.props.about["key-skills"];
	}
		return (
		<div className="about jumbotron" about={this.props.about}>
			<div className="page-header">
  				<h1>{name} <small>{role}</small></h1>
			</div>
			<div className="row container">
				<div className="col-xs-6 col-md-4">
					<span><img src={image} width="60%" height="60%"/></span>
				</div>
				<div className="col-xs-12 col-sm-6 col-md-8">
					<div className="social">
						<ul className="list-inline">
							{social.map(function(connect,i){
								return <li><span><small>{connect.network}</small><mark><strong>{connect.account}</strong></mark></span></li>;
							})}
						</ul>
					</div>
						<blockquote>
							<p>{statement}</p><footer>Thanks for stopping by...</footer>
						</blockquote>
					<div>
						<h2>Skills at a Glance:</h2>
						<ul className="list-unstyled key-skills">
							{key_skills.map(function(skill,i){
								return <li className="skill-item">{skill}</li>;
							})}
						</ul>
					</div>
				</div>
			</div>
		</div>
		);
	}
});
