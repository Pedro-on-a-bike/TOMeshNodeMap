function initialize() {
		var infowindow = null;

		var mapOptions = {
			zoom: 12,
			center: new google.maps.LatLng(43.645031,-79.380806),
			mapTypeId: google.maps.MapTypeId.ROADMAP
		}
		

		infowindow = new google.maps.InfoWindow({
			content: "holding..."
		});

		var map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
		
		
		$.getJSON("nodeListTest.json", function(data){
		
		for (var key in data) {
			var results = data[key];

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
					'<h1>' + name.substring(4) + '</h1>' + //substring removes distance from title
					'<h3>' + nodeResult['onlineStatus'] + '</h3>' +
					'<p>' + nodeResult['cardinalDirection'] + '</p>' +
					'<p>' + nodeResult['floor'] + '</p>' +
					'<p>' + nodeResult['meshHardware'] + '</p>' +
					'<p>' + nodeResult['IPV6Address'] + '</p>' +
					'</div>'
		
		});

		google.maps.event.addListener(marker, 'click', function() {
			if (typeof infowindow != 'undefined') infowindow.close();
			infowindow.setContent(this.html);
			infowindow.open(map,this);
		});
}

google.maps.event.addDomListener(window, 'load', initialize);

