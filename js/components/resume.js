/** @jsx React.DOM */
'use strict;'

var Resume = React.createClass({
    getDefaultProps: function(){
        return {
            interval: 14400
        };
    },
    loadResumeData: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function(data) {
              this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err){
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentWillMount: function() {
        this.loadResumeData();
        console.log(this.props.interval);
        setInterval(this.loadResumeData, this.props.interval);
    },
	render: function(){
        var data=this.state.data;
		return (
        <div className="main container-fluid" url={this.props.url}>
            <About about={data.about} />
            <NavBar />
            <WorkExperience experiences={data.experiences}/>
            <Education universities={data.universities} certifications={data.certifications} />
            <LivingLocations locations={data.locations} />
        </div>);
	}
});
