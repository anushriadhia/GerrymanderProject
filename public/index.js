$(document).ready(function() {

  initMap();

  // initialises map
  function initMap() {
    var map = L.map('map').setView([35, -80], 6);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiaGV5aXRzbWVkeiIsImEiOiJjajk1bWQ5dmwxbWw5MzJwOXV4bm9hM3JpIn0.sTN2b2Bjxh9mM7HsrCfbsg', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'sk.eyJ1IjoiaGV5aXRzbWVkeiIsImEiOiJjajk1bWQ5dmwxbWw5MzJwOXV4bm9hM3JpIn0.sTN2b2Bjxh9mM7HsrCfbsg'
    }).addTo(map);


    // temporary
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        var myObj = JSON.parse(this.responseText);
        L.geoJSON(myObj, {style: style}).addTo(map);  // adds geojson districts to map with style given in style()

      }
    };
    xmlhttp.open("GET", "ncr.geojson", true);
    xmlhttp.send();
    //

  }

  // determines what colour a district should be, based on a given value d (compactness)
  function getColor(d) {
    return d > 7000 ? '#FFEDA0' :
    d > 6000  ? '#FED976' :
    d > 5000  ? '#FEB24C' :
    d > 4000  ? '#FD8D3C' :
    d > 3000   ? '#FC4E2A' :
    d > 2000   ? '#E31A1C' :
    d > 1000   ? '#BD0026' :
    '#800026';

  }

  // determines how districts on map look
  function style(feature) {
    return {
      fillColor: getColor(feature.properties.Compactness),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

  // names of metrics
  var metricsList = [

  ];

  // names of maps
  var mapsList = [

  ];

  function setWarningsText(text) {
    $('#warnings-text').text(text);
  }

  function setSafeMetricsText(text) {
    $('#safe-metrics-text').text(text);
  }

  function newMetric(nameStr) {
    metricsList.push(nameStr);
    var index = metricsList.length - 1;
    addMetricsRow(index);

    $metricRow = $('#metricsRow' + index);
  }

  function addMetricsRow(metricIndex) {
    var $metricsTable = $('#metrics-table');

    var newElem = '<tr id="metricsRow' + metricIndex + '"> <td><i class="fa fa-user w3-text-blue w3-large"></i></td> <td>' + metricsList[metricIndex] +
    '</td> <td id="metricsRowValue' + metricIndex + '"></td> </tr>';

    $('#metrics-table').append(newElem);
  }

  function setMetricValue(metricIndex, metricValue) {
    $('#metricsRowValue' + metricIndex).html(metricValue);
  }


  function newMap(nameStr) {
    mapsList.push(nameStr);
    var index = mapsList.length - 1;
    addNavRow(index);

    $mapItem = $('#navItem' + index);

    return $mapItem;
  }

  // adds a row for a metric graph
  function addNavRow(mapIndex) {
    // html for new row
    var newElem = '<a href="#" id="navItem' + mapsList[mapIndex] +
      '" class="w3-bar-item w3-button w3-padding"><i class="fa fa-users fa-fw"></i>   ' + mapsList[mapIndex] + '</a>';

    $('#div-nav-drawer').append(newElem);
    console.log('Added ' + mapsList[mapIndex] + " with index " + mapIndex);
  }

});

//******************************************************
// Get the Sidebar
var mySidebar = document.getElementById("mySidebar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function w3_open() {
   if (mySidebar.style.display === 'block') {
       mySidebar.style.display = 'none';
       overlayBg.style.display = "none";
   } else {
       mySidebar.style.display = 'block';
       overlayBg.style.display = "block";
   }
}

// Close the sidebar with the close button
function w3_close() {
   mySidebar.style.display = "none";
   overlayBg.style.display = "none";
}


// newMetric("lool");
// newMetric("iu");

//var $mapItem = newMap("Google Map");
// var gmap = initMap();

// setWarningsText("None");
// setSafeMetricsText("None");
