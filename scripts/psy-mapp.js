var psyMapp = {
    //IDs: ["1724395051210095", "559379634259373", "229116730823471", "181659822248251"],
    //IDs: ["1724395051210095"],
    //festivals: [],
    init: function () {
        console.log("Init Psy-Mapp");
        //this.getData();
        this.getLocalData();
    },
    getLocalData: function() {
        $.getJSON( "data/data.json", function( data ) {
            psyMapp.festivals = [];
            $.each( data, function( key, val ) {
                psyMapp.getFestivalInfo(val);
                psyMapp.setData(val);
            });
            psyMapp.initGoogleMap(psyMapp.festivals);
        });
    },
    getData: function (id) {
        var IDs = ["1724395051210095", "181659822248251"];
        psyMapp.festivals = [];
        for (var i = 0; i < IDs.length; i++) {
            FB.api(
                '/' + IDs[i],
                'GET',
                {},
                function(data) {
                    console.log(data);
                    psyMapp.getFestivalInfo(data);
                    psyMapp.setData(data);
                }
            )
        }
        console.log("initGoogleMap with: ", psyMapp.festivals);
        psyMapp.initGoogleMap(psyMapp.festivals);
    },
    getFestivalInfo: function(obj) {
        var festival = [];
        festival[0] = obj.name;
        if (!obj.place.location) {
            festival[1] = 0;
        } else {
            festival[1] = obj.place.location.latitude;
        }
        if (!obj.place.longitude) {
            festival[2] = 0;
        } else {
            festival[2] = obj.place.location.longitude;
        }
        psyMapp.festivals.push(festival);
    },
    setData: function (data) {
        $("#results").append(JSON.stringify(data.name) + "<br>");
    },
    initGoogleMap: function(arr) {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 52.519325, lng: 13.392709},
            zoom: 5
        });
        this.setMarkers(map, arr);
    },
    setMarkers: function(map, festivals) {
        console.log("markers for ", festivals);
        console.log("length  ", festivals.length);

        for (var i = 0; i < festivals.length; i++) {
            var festival = festivals[i];
            console.log("marker for ", festival);
            var marker = new google.maps.Marker({
                position: {lat: festival[1], lng: festival[2]},
                map: map,
                title: festival[0]
            });
        }
    }
}
