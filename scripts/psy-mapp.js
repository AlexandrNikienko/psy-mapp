var psyMapp = {
    IDs: ["1724395051210095", "559379634259373", "229116730823471", "181659822248251", "1361585657192075"],
    init: function () {
        console.log("Init Psy-Mapp");
        this.initGoogleMap();
        if (this.isLocal()) {
            this.getLocalData();
        } else {
            this.getData();
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
    getData: function (id) {
        psyMapp.festivals = [];
        for (var i = 0; i < psyMapp.IDs.length; i++) {
            FB.api(
                '/' + psyMapp.IDs[i],
                'GET',
                {},
                function(data) {
                    psyMapp.setMarker(psyMapp.map, data);
                    psyMapp.setData(data);
                }
            )
        }
    },
    setData: function (data) {
        $("#results").append(JSON.stringify(data.name) + "<br>");
    },
    initGoogleMap: function(arr) {
        psyMapp.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 52.519325, lng: 13.392709},
            zoom: 5
        });
    },
    setMarker: function(map, obj) {
        console.log("Marker for: ", obj);
        var lat = !obj.place.location ? 0 : obj.place.location.latitude,
            lng = !obj.place.location ? 0 : obj.place.location.longitude;
        console.log(lat,lng);

        var marker = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: map,
            title: obj.name
        });
    },
    isLocal: function() {
        var link = window.location.href;
        if (link.indexOf("localhost") !== -1 ) {
            return true
        }
    }
}

