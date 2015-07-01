/** @jsx React.DOM */
'use strict;'

var Resume = React.createClass({
    loadResumeData: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
              this.setState({data: data});
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentWillMount: function() {
        this.loadResumeData();
    },
	render: function(){
        var data=this.state.data;
		return (
        <div className="main container-fluid" url={this.props.url}>
            <About about={data.about} />
            <NavBar />
            <WorkExperience experiences={data.experiences}/>
        </div>);
	}
});
