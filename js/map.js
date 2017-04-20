var infowindow = null;

function initialize() {
		

		var mapOptions = {
			zoom: 13,
			center: new google.maps.LatLng(43.678136, -79.397593),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		

		infowindow = new google.maps.InfoWindow({
			content: "holding..."
		});

		var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
	
		
		jQuery.getJSON("https://raw.githubusercontent.com/Pedro-on-a-bike/TOMeshNodeMap/master/nodeListTest.json", function(data){
		
		for (var key in data) {
			var results = data[key];

			console.log(results);

			var lat = results['latitude'];
			var lng = results['longitude'];
			var myNodeLatLng = new google.maps.LatLng(lat,lng);

			var myNodeName = results['name'];

			addMarker(map, results, myNodeName, myNodeLatLng);
		}
	});
}

function addMarker(map, nodeResult, name, location) {
		var marker = new google.maps.Marker({
			position: location,
			map: map,
			title: name,
			html:
					'<div class="markerPop">' +
					'<h1>Name: ' + name + '</h1>' + //substring removes distance from title
					'<p>Online Status: ' + nodeResult['onlineStatus'] + '</p>' +
					'<p>Direction: ' + nodeResult['cardinalDirection'] + '</p>' +
					'<p>Floor: ' + nodeResult['floor'] + '</p>' +
					'<p>Hardware: ' + nodeResult['meshHardware'] + '</p>' +
					'<p>IPV6: ' + nodeResult['IPV6Address'] + '</p>' +
					'</div>'
		
		});

		google.maps.event.addListener(marker, 'click', function() {
			if (typeof infowindow != 'undefined') infowindow.close();
			infowindow.setContent(this.html);
			infowindow.open(map,this);
		});
		google.maps.event.addListener(map, 'click', function() {
			infowindow.close();
		});	


}

google.maps.event.addDomListener(window, 'load', initialize);
