/** @jsx React.DOM */
'use strict;'

var Resume = React.createClass({
    loadResumeData: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: true,
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
    },
	render: function(){
        var data=this.state.data;
		return (
        <div className="main container-fluid" url={this.props.url}>
            <About about={data.about} />
            <NavBar />
            <WorkExperience experiences={data.experiences}/>
            <Education universities={data.universities} certifications={data.certifications} />
            <CoreSkills technologies={data.technologies} skills={data["programming skills"]} />
            <LivingLocations locations={data.locations} />
        </div>);
	}
});
