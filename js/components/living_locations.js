/** @jsx React.DOM */
'use strict;'

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

    	var divStyle = {height: '500px'};
    	return (
    		<div className="panel panel-info" id="locations">
    			<div className="panel panel-heading"><h2 className="panel-title">Places Where I have lived and worked</h2></div>
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
			initialZoom: 4,
			mapOptions: {},
			map: null,
			google: null
		};
	},
	createMap: function(){},
	createMarker: function(){
		var places = this.props.addresses;
	},
	updateMap: function(){
		var places = this.props.addresses;
		var map = this.props.map;
		var google = this.props.google;
		var bounds = new google.maps.LatLngBounds();

		places.map(function(place, index){
			var service = new google.maps.places.PlacesService(map);
			var request = {
				query: place
			};
			service.textSearch(request, function(results, status){
				if (status == google.maps.places.PlacesServiceStatus.OK){
					var marker = new google.maps.Marker({
						map: map,
						position: results[0].geometry.location,
						title: results[0].formatted_address
					});
					bounds.extend(new google.maps.LatLng(results[0].geometry.location.lat(),results[0].geometry.location.lng()));
					map.fitBounds(bounds);
				}
			});
		});
	},
	componentWillMount: function(){
		var initialZoom = this.props.initialZoom;
		this.props.mapOptions = {
            scrollwheel: false,
        	disableDefaultUI: true,
            zoom: initialZoom,
            sensor: true
        };
	},
	componentDidMount: function(){
		var mapOptions = this.props.mapOptions;
		var self = this;
		GoogleMapsLoader.LIBRARIES = ['geometry', 'places'];
		GoogleMapsLoader.load(function(google) {
			mapOptions.center = new google.maps.LatLng(-34.397, 150.644);
			self.props.map = new google.maps.Map(document.querySelector('#map'), mapOptions);
			self.props.google = google;
			self.updateMap();
		}); 
	},
	render: function(){
		var divStyle = {height: '100%'};
		return (
			<div className="GMap" id="map" style={divStyle}></div>
			);
	},

});
