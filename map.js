// Global variables
var mapCenter = [0,30];
var mapZoom = 1.5;


//-----------------------------------------------------------
//Live Data link to google sheet Part A


//var transformRequest = (url, resourceType) => {
//  var isMapboxRequest =
//    url.slice(8, 22) === "api.mapbox.com" ||
//    url.slice(10, 26) === "tiles.mapbox.com";
//  return {
//    url: isMapboxRequest
//      ? url.replace("?", "?pluginName=sheetMapper&")
//      : url
//  };
//};


// --------------------------------------------------------
// 1. Initialize map
    mapboxgl.accessToken = 'pk.eyJ1IjoieHVubGl1IiwiYSI6ImNrMXV5bzV2ZzA0aGUzaG16YWJybHllbjAifQ.11sHwcv-F_pZQpmW5PZxNw'; // replace this value with your own access token from Mapbox Studio

    // for more mapboxgl.Map options, see https://docs.mapbox.com/mapbox-gl-js/api/#map)
    var map = new mapboxgl.Map({
    	container: 'map', // this is the ID of the div in index.html where the map should go
        center: mapCenter, // set the centerpoint of the map programatically. Note that this is [longitude, latitude]!
        zoom: mapZoom, // set the default zoom programatically
    	style: 'mapbox://styles/xunliu/ckqhk5f702reb17p7iakske5x',// replace this value with the style URL from Mapbox Studio
        //transformRequest: transformRequest
    });

//-----------------------------------------------------------
//Live Data link to google sheet Part B
//$(document).ready(function () {
//      $.ajax({
//        type: "GET",
//        //YOUR TURN: Replace with csv export link
//        url: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRSyFzraNTlQbU2TNkrIp6Jc15SgeQKJZigPCA8fVglyhCi3AFhAsGhkaj6c6L6h-gsood5Kbw4NhZb/pub?gid=0&single=true&output=csv',
//        dataType: "text",
//        success: function (csvData) { makeGeoJSON(csvData); }
//      });
//    
//
//      function makeGeoJSON(csvData) {
//        csv2geojson.csv2geojson(csvData, {
//          latfield: 'Latitude',
//          lonfield: 'Longitude',
//          delimiter: ','
//        }, function (err, data) {
//          map.on('load', function () {
//
//            //Add the the layer to the map
//            map.addLayer({
//              'id': 'casesLive',
//              'type': 'symbol',
//              'source': {
//                'type': 'geojson',
//                'data': data
//              },
//              'layout': {
//                'icon-image': 'hospital-15',
//              }
//            });
//
//
//        // Create a popup on click 
//            map.on('click', function(e) {   // Event listener to do some code when user clicks on the map
//
//                // Change the cursor to a pointer when the mouse is over the places layer.
//                map.on('mouseenter',  function () {
//                map.getCanvas().style.cursor = 'pointer';
//                });
//
//                // Change it back to a pointer when it leaves.
//                map.on('mouseleave',  function () {
//                map.getCanvas().style.cursor = '';
//                });
//                var cases = map.queryRenderedFeatures(e.point, { 
//                layers: ['Cases']    // replace this with the name of the layer from the Mapbox Studio layers panel
//            });
//
//              if (cases.length == 0) {
//                return;
//            }
//
//            var popup = new mapboxgl.Popup({ 
//                closeButton: true, // If true, a close button will appear in the top right corner of the popup. Default = true
//                closeOnClick: true, // If true, the popup will automatically close if the user clicks anywhere on the map. Default = true
//                anchor: 'bottom', 
//                offset: [0,0]
//            });
//
//              popup.setLngLat(cases[0].geometry.coordinates);
//
//              // Set the contents of the popup window
//              popup.setHTML("<h2>" + cases[0].properties.Project +"</h2>"+"<img src='"+cases[0].properties.url+"' width='380'"+"'>"+"<p>Designer: " +cases[0].properties.Designer + "<br>Date: " + cases[0].properties.Date + "<br>Location: " + cases[0].properties.Location + "<br>Description: "+ cases[0].properties.Description + "<br><br><a href ='" + cases[0].properties.Source+ "'>Source</a></p>");
//
//              popup.addTo(map);
//          });  

//          });
//
//        });
//      };
//    });




// --------------------------------------------------------
// 2. Show a modal window when About button is clicked
// A modal window is an element that sits on top of an application's main window. It can be opened and closed without reloading the page

    $("#about").on('click', function() { // Click event handler for the About button in jQuery, see https://api.jquery.com/click/
        $("#screen").fadeToggle(); // shows/hides the black screen behind modal, see https://api.jquery.com/fadeToggle/
        $(".modal").fadeToggle(); // shows/hides the modal itself, see https://api.jquery.com/fadeToggle/
    });

    $(".modal>.close-button").on('click', function() { // Click event handler for the modal's close button
        $("#screen").fadeToggle();
        $(".modal").fadeToggle();
    });

// -------------------------------------------------------- 
// Popups
// See tutorial at https://docs.mapbox.com/help/tutorials/add-points-pt-3/
// See example of popups on click at https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/ 
// See example of popups on hover at https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/

    // Create a popup on click 
    map.on('click', function(e) {   // Event listener to do some code when user clicks on the map


        var cases = map.queryRenderedFeatures(e.point, {  // Query the map at the clicked point. See https://www.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures/ for an example on how queryRenderedFeatures works and https://www.mapbox.com/mapbox-gl-js/api/#map#queryrenderedfeatures for documentation
        layers: ['Cases']    // replace this with the name of the layer from the Mapbox Studio layers panel
    });

      // if the layer is empty, this if statement will exit the function (no popups created) -- this is a failsafe to avoid non-functioning popups
      if (cases.length == 0) {
        return;
    }

    // Initiate the popup
    var popup = new mapboxgl.Popup({ 
        closeButton: true, // If true, a close button will appear in the top right corner of the popup. Default = true
        closeOnClick: true, // If true, the popup will automatically close if the user clicks anywhere on the map. Default = true
        anchor: 'bottom', // The popup's location relative to the feature. Options are 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left' and 'bottom-right'. If not set, the popup's location will be set dynamically to make sure it is always visible in the map container.
        offset: [0, -15] // A pixel offset from the centerpoint of the feature. Can be a single number, an [x,y] coordinate, or an object of [x,y] coordinates specifying an offset for each of the different anchor options (e.g. 'top' and 'bottom'). Negative numbers indicate left and up.
    });

      // Set the popup location based on each feature
      popup.setLngLat(cases[0].geometry.coordinates);

      // Set the contents of the popup window
     popup.setHTML("<h2>" + cases[0].properties.Project +"</h2>"+"<img src='"+cases[0].properties.url+"' width='380'"+"'>"+"<p>Designer: " +cases[0].properties.Designer + "<br>Date: " + cases[0].properties.Date + "<br>Location: " + cases[0].properties.Location + "<br>Description: "+ cases[0].properties.Description + "<br><br><a href ='" + cases[0].properties.Source+ "'>Source</a></p>");

        

      // Add the popup to the map 
      popup.addTo(map);  // replace "map" with the name of the variable in line 4, if different
        
  });
// -------------------------------------------------------- 
// Popups
// See tutorial at https://docs.mapbox.com/help/tutorials/add-points-pt-3/
// See example of popups on click at https://docs.mapbox.com/mapbox-gl-js/example/popup-on-click/ 
// See example of popups on hover at https://docs.mapbox.com/mapbox-gl-js/example/popup-on-hover/

    // Create a popup on click 
    map.on('click', function(e) {   // Event listener to do some code when user clicks on the map


        var students = map.queryRenderedFeatures(e.point, {  // Query the map at the clicked point. See https://www.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures/ for an example on how queryRenderedFeatures works and https://www.mapbox.com/mapbox-gl-js/api/#map#queryrenderedfeatures for documentation
        layers: ['Students']    // replace this with the name of the layer from the Mapbox Studio layers panel
    });

      // if the layer is empty, this if statement will exit the function (no popups created) -- this is a failsafe to avoid non-functioning popups
      if (students.length == 0) {
        return;
    }

    // Initiate the popup
    var popup = new mapboxgl.Popup({ 
        closeButton: true, // If true, a close button will appear in the top right corner of the popup. Default = true
        closeOnClick: true, // If true, the popup will automatically close if the user clicks anywhere on the map. Default = true
        anchor: 'top', // The popup's location relative to the feature. Options are 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left' and 'bottom-right'. If not set, the popup's location will be set dynamically to make sure it is always visible in the map container.
        offset: [0, -15] // A pixel offset from the centerpoint of the feature. Can be a single number, an [x,y] coordinate, or an object of [x,y] coordinates specifying an offset for each of the different anchor options (e.g. 'top' and 'bottom'). Negative numbers indicate left and up.
    });

      // Set the popup location based on each feature
      popup.setLngLat(students[0].geometry.coordinates);

              
              
      // Get Live data
      // Reference: https://github.com/mapbox/real-time-maps#directory-structure
//     
        var url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + students[0].properties.Latitude +'&lon='+ students[0].properties.Longitude+ '&appid=35063a696ba8c55b4558a61011094759&units=imperial';
        
//        var url = 'https://api.openweathermap.org/data/2.5/weather?q=Chicago,US&appid=35063a696ba8c55b4558a61011094759&units=imperial';
        var request = new XMLHttpRequest();

        request.open('GET', url, false);

        request.send(null);
        var text = request.responseText;
        var json = JSON.parse(text);
     
        var timeDif = students[0].properties.timeDif;
        
        var d = new Date();
        var n = d.getUTCHours();
        d.setHours( n+timeDif);
        var localTime = d.toLocaleString();
        
      // Set the contents of the popup window
      popup.setHTML('<h2>Name: ' + students[0].properties.Name + '</h2><p>Location: ' + students[0].properties.Location + '<br>Current Weather: '+ json.weather[0].main+ '<br>Current Temperature: '+ json.main.temp +'F'+'<br>Current Humidity: '+ json.main.humidity+'<br>Current Time: '+ localTime +'</p>');

        

      // Add the popup to the map 
      popup.addTo(map);  // replace "map" with the name of the variable in line 4, if different
        
  });



// -------------------------------------------------------- 
// 6. Show/hide layers
// See example at https://www.mapbox.com/mapbox-gl-js/example/toggle-layers/
    
    var layers = [  // an array of the layers you want to include in the layers control (layers to turn off and on)

        // [layerMachineName, layerDisplayName]
        // layerMachineName is the layer name as written in your Mapbox Studio map layers panel
        // layerDisplayName is the way you want the layer's name to appear in the layers control on the website
        //['casesLive', 'Selected Case Study'],                      // layers[0]
        ['Cases', 'Selected Case Study'],                      // layers[0]
        ['Students', 'Students and Teaching Team'],                              // layers[1][1] = 'Parks'
        ['Terrain', 'Terrain'],     
        ['Contour', 'Contour'],
        ['Buildings', 'Buildings']
        // add additional live data layers here as needed
    ]; 

    // functions to perform when map loads
    map.on('load', function () {
        
        
        for (i=0; i<layers.length; i++) {

            // add a button for each layer
            $("#layers-control").append("<a href='#' class='active button-default' id='" + layers[i][0] + "'>" + layers[i][1] + "</a><br>"); // see http://api.jquery.com/append/
        }

        // show/hide layers when button is clicked
        $("#layers-control>a").on('click', function(e) {

                var clickedLayer = e.target.id;

                e.preventDefault();
                e.stopPropagation();

                var visibility = map.getLayoutProperty(clickedLayer, 'visibility');  // see https://www.mapbox.com/mapbox-gl-js/api/#map#getlayoutproperty
                console.log(visibility);

                if (visibility === 'none') {
                    $(e.target).addClass('active');
                    map.setLayoutProperty(clickedLayer, 'visibility', 'visible');  // see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                } else {
                    map.setLayoutProperty(clickedLayer, 'visibility', 'none'); // see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                    $(e.target).removeClass('active');

                }
        });
    });


// -------------------------------------------------------- 
// 9. Reset map button
//    
//    $("#reset").click(function() {
//        map.setCenter(mapCenter);
//        map.setZoom(mapZoom);
//        map.setPitch(0);
//        map.setBearing(0);
//        map.setFilter("cville-building-permits", null); // reset building permits filters
//        
//        // Reset all layers to visible
//        for (i=0; i<layers.length; i++) {
//            map.setLayoutProperty(layers[i][0], 'visibility', 'visible'); 
//            $("#" + layers[i][0]).addClass('active');
//        }                   
//
//    });











