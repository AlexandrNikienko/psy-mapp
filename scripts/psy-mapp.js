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
    },
    getLocalData: function () {
        $.getJSON("data/data.json", function (data) {
            $.each(data, function (key, val) {
                psyMapp.setData(val);
                psyMapp.setMarker(psyMapp.map, val);
            });
        });
    },
    getData: function (IDs) {
        var IDs = IDs;
        for (var i = 0; i < IDs.length; i++) {
            FB.api(
                '/' + IDs[i] + "?fields=name,place,start_time,end_time,id,cover",
                'GET',
                {},
                function (data) {
                    psyMapp.setMarker(psyMapp.map, data);
                    //psyMapp.setData(data);
                }
            )
        }
    },
    setData: function (obj) {
        $("#results").append();
    },
    initGoogleMap: function (arr) {
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
    setMarker: function (map, obj) {
        //console.log("*** Marker for: ", obj.name + " ***");
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var startDate = new Date(obj.start_time);
        var endDate = new Date(obj.end_time);
        var datesStr = startDate.getDate() + ' ' + monthNames[startDate.getMonth()] + ' ' + startDate.getFullYear() +
            " - " + endDate.getDate() + ' ' + monthNames[endDate.getMonth()] + ' ' + endDate.getFullYear();
        var src = obj.cover ? obj.cover.source : "";
        var markup = "<img class='iwImage' src='" + src + "'>" +
            "<a class='iwLink' target='_blank' href='http://www.facebook.com/events/" + obj.id + "'>" + obj.name + "</a>" +
            "<span class='iwDate'>" + datesStr + "</span>";

        var today = new Date();
        if (endDate < today) {
            console.log("Enent " + obj.name + " finished");
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

                /*iwOuter.attr('style', function (i, s) {
                    return s + 'top: 18px !important; left: 24px !important'
                });*/

                iwOuter.children().addClass('iwInner');

                iwBackground.children(':nth-child(1)').addClass('iwBackArrowShadow').end()
                    .children(':nth-child(2)').addClass('iwBackShadow').end()
                    .children(':nth-child(3)').addClass('iwBackArrow').end()
                    .children(':nth-child(4)').addClass('iwBackColor').end()


                // Removes background shadow DIV
                //iwBackground.children(':nth-child(2)').addClass('iwCh2').css({'display': 'none'});

                // Removes white background DIV
                //iwBackground.children(':nth-child(4)').addClass('iwCh4').css({'display': 'none'});

                // Moves the infowindow 115px to the right.
                //iwOuter.parent().parent().addClass('iwOuter').css({left: '115px'});

                // Moves the shadow of the arrow 76px to the left margin.
                //iwBackground.children(':nth-child(1)').addClass('iwCh1').attr('style', function(i,s){ return s + 'left: 76px !important;'});

                // Moves the arrow 76px to the left margin.
                //iwBackground.children(':nth-child(3)').addClass('iwCh3').attr('style', function(i,s){ return s + 'left: 76px !important;'});

                // Changes the desired tail shadow color.
                iwBackground.children(':nth-child(3)').find('div').children().addClass('isShadow').css({
                    'box-shadow': 'rgba(72, 181, 233, 0.6) 0px 1px 6px',
                    'z-index': '1'
                });

                // Reference to the div that groups the close button elements.
                var iwCloseBtn = iwOuter.next().addClass('iwCloseBtn');

                // The API automatically applies 0.7 opacity to the button after the mouseout event. This function reverses this event to the desired value.
                iwCloseBtn.mouseout(function () {
                    //$(this).css({opacity: '1'});
                });
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

