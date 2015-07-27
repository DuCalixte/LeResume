/** @jsx React.DOM */
'use strict;'

React.render(
    <Resume url={'data/le_resume.json'}/>,
    document.body
);

// var Route = ReactRouter.Route;
// var Router = ReactRouter.Router;

// var App = React.createClass({
// 	render: function () {
// 		return <Resume url={'../data/le_resume.json'}/>;
// 	}
// });

// var routes = (
//   <Route handler={App} path="/">
//     <Route name="About" handler={About} path="/about"/>
//     <Route name="WorkExperience" handler={WorkExperience} path="/experience" />
//     <Route name="Education" handler={Education} path="/education"/>
//     <Route name="CoreSkills" handler={CoreSkills} path="/skills" />
//     <Route name="LivingLocations" handler={LivingLocations} path="/locations" />
//   </Route>
// );

// ReactRouter.run(routes, function (Handler, state) {
//     React.render(<Handler/>, document.body);
// });
