/** @jsx React.DOM */
'use strict;'

// var LivingLocations = React.createClass({
//     getDefaultProps: function () {
//         return {
//             initialZoom: 8,
//             mapCenterLat: 43.6425569,
//             mapCenterLng: -79.4073126,
//         };
//     },
//     componentDidMount: function (rootNode) {
//         var mapOptions = {
//             center: this.mapCenterLatLng(),
//             zoom: this.props.initialZoom
//         },
//         map = new google.maps.Map(this.getDOMNode(), mapOptions);
//         var marker = new google.maps.Marker({
//             position: this.mapCenterLatLng(),
//             title: 'Hi',
//             map: map
//         });
//         this.setState({
//             map: map
//         });
//     },
//     mapCenterLatLng: function () {
//         var props = this.props;
//         return new google.maps.LatLng(props.mapCenterLat, props.mapCenterLng);
//     },
//     render: function () {
//         return ( < div className = 'map-gic' > < /div>
//         );
//     }
// });

var LivingLocations = React.createClass({
	getDefaultProps: function() {
        return {locations: []};
    },
    render: function(){
    	var addresses = [];
    	var self = this;
    	(function(){
    		addresses = [];
    		self.props.locations.map(function(location, index){addresses.push(location.address);})
    	})();

    	var divStyle = {height: 500};
    	return (
    		<div className="panel panel-default">
    			<div className="<panel></panel>-heading"><h2 className="panel-title">Places Where I have lived and worked</h2></div>
    			<div className="panel-body" style={divStyle}>
    				<GMap addresses={addresses}/>
    			</div>
    		</div>
    	);
    }
});

var GMap = React.createClass({
	getDefaultProps: function(){
		return {
			initialZoom: 5,
			mapOptions: {},
			map: null
		};
	},
	createMap: function(){},
	createMarker: function(){
		var places = this.props.addresses;
	},
	componentWillMount: function(){
		var initialZoom = this.props.initialZoom;
		this.props.mapOptions = {
            scrollwheel: false,
        	disableDefaultUI: true,
            zoom: initialZoom,
            sensor: true,
            libraries: ['geometry', 'places']
        };
	},
	componentDidMount: function(){
		var mapOptions = this.props.mapOptions;
		var self = this;
		GoogleMapsLoader.load(function(google) {
			mapOptions.center = new google.maps.LatLng(-34.397, 150.644);
			self.props.map = new google.maps.Map(document.querySelector('#map'), mapOptions);
		}); 
	},
	render: function(){
		var divStyle = {height: '100%'};
		return (
			<div className="GMap" id="map" style={divStyle}></div>
			);
	},

});
