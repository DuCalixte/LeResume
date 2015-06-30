/** @jsx React.DOM */
'use strict;'

var NavBar = React.createClass({
	getInitialState: function(){
		return { focused: 0 };
	},
	clicked: function(index){
		this.setState({focused: index});
	},
	render: function(){
		var navs = [
			{
				"field": "Work Experience",
				"link": "#"
			},
			{
				"field": "Education",
				"link": "#"
			},
			{
				"field": "Skills in Time",
				"link": "#"
			},
			{
				"field": "Past Location",
				"link": "#"
			}
		];
		var self = this;
		return (
			<nav className="navbar navbar-default">
				<div className="container-fluid">
					<div className="navigation">
						<ul className="nav navbar-nav">
							{navs.map(function(nav, index){
								var style = '';
								if(self.state.focused === index){
									style = 'active';
								}
								return <li className={style} onClick={self.clicked.bind(self, index)}><a href={nav.link}>{nav.field}</a></li>;
							})}
						</ul>
					</div>
				</div>
			</nav>
			);
	}
});
