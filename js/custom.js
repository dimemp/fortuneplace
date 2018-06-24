$(function() {
	var lat = "";
    var lng = "";
	var appendeddatahtml = "";
	var arguments = "";
	var str = "";
	var newstr = "";
	var phone = "";
	var rating = "";
	var icon = "";
	var address = "";
	var arraylength = "";
    var randomnum = "";
    var random = "";

	
	$("#query-input").click(function(){
		$(this).val("");
	});
	
	$("#searchform").submit(function(event){
		event.preventDefault();
		if (!lat) {
			navigator.geolocation.getCurrentPosition(getLocation);
		} else {
			clearpreviousinputs();
			getVenues();
		}
	});
	
	function getLocation(location) {
	    lat = location.coords.latitude;
	    lng = location.coords.longitude;
		getVenues();
	}

	function clearpreviousinputs() {
		$("#venue-name").html("");
		$("#venue-address").html("");
		$("#venue-distance").html("");
		$("#venue-category").html("");
	}
	
	function getVenues() {
		$.ajax({
	  		type: "GET",
	  		url: "https://api.foursquare.com/v2/venues/explore?ll="+lat+","+lng+"&client_id=WFXQCYRSCF2HWKQRL5EBS5ASLCAWTGYXTRXMOUZRKELVHNDH&client_secret=EEM1WVKKDZVDARAGYMKMCRMLX0BAYXJOTGRVM4R2O5JCG41V&v=20130619&query="+$("#query-input").val()+"",
	  		success: function(data) {
				var dataobj = data.response.groups[0].items;
                
				// Find a random place using data.
                var arraylength = dataobj.length;
                var randomnum = Math.floor((Math.random() * arraylength) + 1);
                var random = dataobj[randomnum];
                console.log(dataobj)
                
                if (arraylength == 0) {
                	msgTitle = "The place you are looking does exists in onother planet, not on earth!";
                	$("#venue-name").append(msgTitle);
                }

				// Rebuild the map using data.
				var myOptions = {
					zoom:11,
					center: new google.maps.LatLng(lat,lng-.08),
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					panControl: false
				},
				map = new google.maps.Map(document.getElementById('map'), myOptions);

				findluckydestination.call(random);
				
				// Build marker and element for random venue returned.
				function findluckydestination () {
					if (this.venue.name) {
						name = '<span>'+this.venue.name+'</span>';
						$("#venue-name").append(name);
					}

					if (this.venue.location.address) {
						address = '<span class="title-venues-modal">Address:</span><span>'+this.venue.location.address+'</span>';
						$("#venue-address").append(address);
					} 
					
					if (this.venue.location.distance) {
						distance = '<span class="title-venues-modal">Distance:</span><span>'+this.venue.location.distance+' meters</span>';
						$("#venue-distance").append(distance);
					} 			

					if (this.venue.categories[0].name) {
						category = '<span class="title-venues-modal">Category:</span><span>'+this.venue.categories[0].name+'</span>';
						console.log(category, true)
						$("#venue-category").append(category);
					}
					
					// Build marker
					var markerImage = {
					url: 'content/img/pin5.png',
					scaledSize: new google.maps.Size(34, 34),
					origin: new google.maps.Point(0,0),
					anchor: new google.maps.Point(34/2, 34)
					},
					markerOptions = {
					map: map,
					position: new google.maps.LatLng(this.venue.location.lat, this.venue.location.lng),
					title: this.venue.name,
					animation: google.maps.Animation.DROP,
					icon: markerImage,
					optimized: false
					},		
					marker = new google.maps.Marker(markerOptions)
				};
			}
		});
	}
	
	
	function mapbuild() {
		var myOptions = {
		zoom:5,
		center: new google.maps.LatLng(37,20),
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		panControl: false
		},
		map = new google.maps.Map(document.getElementById('map'), myOptions);
	}
	
	mapbuild();
});


// Fireworks
$(function () {
	$('#submit-btn').clickFireworks({
	// canvas id
	id: 'fireworks',
	// append canvas to where, default is body
	appendTo: '.modal', 
	// canvas z-index, make it higher than anything on the page
	zIndex: 1000	     
	});
});