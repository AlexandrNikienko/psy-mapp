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

