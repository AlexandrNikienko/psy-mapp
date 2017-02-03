/* created by Alexandr Nikienko */

var psyMapp = {
    init: function () {
        console.log("Init Psy-Mapp");
        this.initGoogleMap();
        if (this.isLocal()) {
            $(".login").hide();
            this.getLocalData();
        } else {
            this.getIDs();
        }

        this.filterDateFrom = new Date('2017-01-01');
        this.filterDateTo = new Date('2017-12-31');
    },
    getLocalData: function () {
        $.getJSON("data/data.json", function (data) {
            $.each(data, function (key, val) {
                psyMapp.setMarker(psyMapp.map, val);
            });
        });
    },
    getData: function (IDs) {
        psyMapp.allData = [];
        psyMapp.allDataStr = '';
        var IDs = IDs;
        for (var i = 0; i < IDs.length; i++) {
            var a = i;
            FB.api(
                '/' + IDs[i] + "?fields=name,place,start_time,end_time,id,cover",
                'GET',
                {},
                function (data) {
                    psyMapp.allData.push(JSON.stringify(data));
                    psyMapp.allDataStr += JSON.stringify(data) + ",";
                    //console.log(a);
                    //if (a == (IDs.length - 1)) $("#status").text("psyMapp.allDataStr: " + psyMapp.allDataStr);
                    psyMapp.setMarker(psyMapp.map, data);
                }
            )
        }
        console.log("psyMapp.allData: ", psyMapp.allData);
        //$("#status").text(psyMapp.allData);

        /*console.log("psyMapp.allData.length: ", psyMapp.allData.length);
         for (var i = 0; i < psyMapp.allData.length; i++) {
         console.log("psyMapp.allData[i]: ", psyMapp.allData[i]);
         psyMapp.allDataStr += psyMapp.allData[i] + ","
         }*/

        //console.log("psyMapp.allDataStr: ", psyMapp.allDataStr);
        //$("#status").text(psyMapp.allDataStr);
    },
    getUser: function (id) {
        FB.api(
            '/' + id + '?fields=id,name,picture',
            'GET',
            {},
            function (data) {
                console.log("USER :", data);
                var html = '<div class="user-wrapper"><div class="user-name">Hello, <br>' + data.name + '</div>' +
                    '<div class="user-pic"><img src="' + data.picture.data.url + '" alt=""/></div></div>';
                $('.welcome').append(html);
            }
        )
    },
    initGoogleMap: function () {
        psyMapp.map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 30, lng: 13.392709},
            zoom: 3
        });
        psyMapp.geocoder = new google.maps.Geocoder();

        psyMapp.infowindow = new google.maps.InfoWindow({
            content: '',
            maxWidth: 250
        });

        var styles = [
            /*{
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
             },*/
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        //"color": "#b9d3c2",
                        "color": "#313131",
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
            },
            {
                featureType: "water",
                elementType: "labels",
                stylers: [
                    {visibility: "off"}
                ]
            }
        ];

        psyMapp.map.setOptions({styles: styles});
    },
    setMarker: function (map, obj) {
        //console.log("*** Marker for: ", obj.name + " ***");

        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],

            startDatestring = "" + obj.start_time + "",
            endDatestring = "" + obj.end_time + "",

            startDate = new Date(obj.start_time),

            endDate = new Date(obj.end_time),

             /*datesStr = startDate.getDate() + ' ' +
                        monthNames[startDate.getMonth()] + ' ' +
                        startDate.getFullYear() + " - " +
                        endDate.getDate() + ' ' +
                        monthNames[endDate.getMonth()] + ' ' +
                        endDate.getFullYear(),*/

            datesStr = startDatestring.substr(8, 2) + ' ' +
                monthNames[startDatestring.substr(5, 2) - 1] + ' ' +
                startDatestring.substr(0, 4) + " - " +
                endDatestring.substr(8, 2) + ' ' +
                monthNames[endDatestring.substr(5, 2) - 1] + ' ' +
                endDatestring.substr(0, 4),

            imgSrc = obj.cover ? obj.cover.source : "",

            markup = "<img class='iwImage' src='" + imgSrc + "'>" +
                "<a class='iwLink' target='_blank' href='http://www.facebook.com/events/" + obj.id + "'>" + obj.name + "</a>" +
                "<span class='iwDate'>" + datesStr + "</span>",

            today = new Date();

        /*console.log("start date ", startDatestring.substr(8, 2));
        console.log("month ", monthNames[startDatestring.substr(5, 2) - 1]);
        console.log("year ", startDatestring.substr(0, 4));*/

        if (endDate < today) {
            console.log("Enent " + obj.name + " finished");
            return;
        }

        if (+startDate > +psyMapp.filterDateTo ) {
            console.log("Enent " + obj.name + " after TO date");
            return;
        }

        if (+startDate <= +psyMapp.filterDateFrom ) {
            console.log("Enent " + obj.name + " after TO date");
            return;
        }

        if (obj.place) {
            //console.log("Place :" + JSON.stringify(obj.place));

            if (obj.place.name.toLowerCase() == "tba") {
                console.log("Place TBA for  " + obj.name + "  can not be shown");
                return;
            }

            if (!obj.place.location) {

                var address = obj.place.name;
                //console.log("Place name :" + address);
                psyMapp.geocoder.geocode({'address': address}, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        var marker = new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location,
                            icon: 'http://www.moonkoradji.com/psymap/images/map-marker-3.png'
                        });
                        psyMapp.setMarkerClick(markup, map, marker);
                    } else {
                        //console.log(obj.name + " @ " + obj.place.name + ": Geocode was not successful: " + status);
                    }
                });
            }
            else {
                var lat = obj.place.location.latitude,
                    lng = obj.place.location.longitude;
                //console.log("LatLng " + lat + "/" + lng);
                var marker = new google.maps.Marker({
                    position: {lat: lat, lng: lng},
                    map: map,
                    icon: 'http://www.moonkoradji.com/psymap/images/map-marker-3.png'
                });
                psyMapp.setMarkerClick(markup, map, marker);
            }
        } else {
            console.log("!!! have no place! !!" + obj.name);
        }
    },
    setMarkerClick: function (content, map, marker) {
        marker.addListener('click', function () {
            if (psyMapp.infoWindow) psyMapp.infoWindow.close();
            psyMapp.infowindow.setContent(content);
            psyMapp.infowindow.open(map, marker);

            google.maps.event.addListener(psyMapp.infowindow, 'domready', function () {

                var iwOuter = $('.gm-style-iw');

                var iwWrapper = iwOuter.parent().addClass('iwWrapper');

                var iwBackground = iwOuter.prev().addClass('iwBackground');

                iwOuter.children().addClass('iwInner');

                iwBackground.children(':nth-child(1)').addClass('iwBackArrowShadow').end()
                    .children(':nth-child(2)').addClass('iwBackShadow').end()
                    .children(':nth-child(3)').addClass('iwBackArrow').end()
                    .children(':nth-child(4)').addClass('iwBackColor').end()

                // Reference to the div that groups the close button elements.
                var iwCloseBtn = iwOuter.next().addClass('iwCloseBtn');

            });

        });
    },
    isLocal: function () {
        var link = window.location.href;
        if (link.indexOf("localhost") !== -1) {
            return true
        }
    },
    getIDs: function () {
        $.getJSON("data/IDs.json", function (data) {
            var IDs = [];
            $.each(data, function (key, val) {
                $.each(val, function (key, val) {
                    var link = val;
                    var arr = link.split("/");
                    var length = arr.length;
                    var id = arr[length - 1];
                    IDs.push(id);
                });

            });
            console.log(IDs.length + " IDs :", IDs);
            psyMapp.getData(IDs);
        });
    }
}

