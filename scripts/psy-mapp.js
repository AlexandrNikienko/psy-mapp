var psyMapp = {
    init: function () {
        console.log("Init Psy-Mapp");
        this.initGoogleMap();
        if (this.isLocal()) {
            this.getLocalData();
        } else {
            this.getIDs();
        }
    },
    getLocalData: function() {
        $.getJSON( "data/data.json", function( data ) {
            $.each( data, function( key, val ) {
                psyMapp.setData(val);
                psyMapp.setMarker(psyMapp.map, val);
            });
        });
    },
    getData: function (IDs) {
        var IDs = IDs;
        for (var i = 0; i < IDs.length; i++) {
            FB.api(
                '/' + IDs[i],
                'GET',
                {},
                function(data) {
                    psyMapp.setMarker(psyMapp.map, data);
                    //psyMapp.setData(data);
                }
            )
        }
    },
    setData: function (obj) {
        $("#results").append();
    },
    initGoogleMap: function(arr) {
        psyMapp.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 52.519325, lng: 13.392709},
            zoom: 5
        });
        psyMapp.geocoder = new google.maps.Geocoder();

        var styles = [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#523735"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#c9b2a6"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#dcd2be"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#ae9e90"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#93817c"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#a5b076"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#447530"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f1e6"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#fdfcf8"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f8c967"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#e9bc62"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e98d58"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#db8555"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#806b63"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8f7d77"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#ebe3cd"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dfd2ae"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b9d3c2"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#92998d"
                    }
                ]
            }
        ];

        psyMapp.map.setOptions({styles: styles});
    },
    setMarker: function(map, obj) {
        console.log("*** Marker for: ", obj.name + " ***");
        //console.log(lat,lng);
        if (obj.place) {
            console.log("Place :" + JSON.stringify(obj.place));
            if (!obj.place.location) {
                var address = obj.place.name;
                console.log("Place name :" + address);
                psyMapp.geocoder.geocode( { 'address': address}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        map.setCenter(results[0].geometry.location);
                        var marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                            title: obj.name
                        });
                    } else {
                        console.log(obj.name + " @ " + obj.place.name + ": Geocode was not successful for the following reason: " + status);
                    }
                });
            }
            else {
                var lat = obj.place.location.latitude,
                    lng = obj.place.location.longitude;
                console.log("LatLng " + lat + "/" + lng);
                var marker = new google.maps.Marker({
                    position: {lat: lat, lng: lng},
                    map: map,
                    title: obj.name
                });
            }
        } else {
            console.log("!!! have no place! !!" + obj.name)
        }

    },
    isLocal: function() {
        var link = window.location.href;
        if (link.indexOf("localhost") !== -1 ) {
            return true
        }
    },
    getLatLngFromAddress: function(str) {
        var address = str;
        geocoder.geocode( { 'address': address}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    },
    getIDs: function() {
        $.getJSON( "data/IDs.json", function( data ) {
            var IDs = [];
            $.each( data, function( key, val ) {
                $.each( val, function( key, val ) {
                    var link = val;
                    var arr = link.split("/");
                    var length = arr.length;
                    var id = arr[length-1];
                    IDs.push(id);
                });

            });
            console.log(IDs.length + " IDs :", IDs);
            psyMapp.getData(IDs);
        });
    }
}

