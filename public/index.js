// names of metrics
var metricsList = [];

// names of maps
var mapsList = [];

var featureList = [];

var selectedMap = '';

var geojson;

var map;

var info = L.control();

info.onAdd = function(map) {
  this._div = L.DomUtil.create('div', 'info');
  this.update();
  return this._div;
}

info.update = function(props) {
  var prop = null;
  for(var obj in props) {
    if(obj == selectedMap) {
      prop = obj;
    }
  }

  this._div.innerHTML = '<h4>' + selectedMap + '<h4>' + (props ? '<b>' + props.DISTRICT + '</b><br />' + props[prop] : 'Hover over a state');
}

$(document).ready(function() {

  initMap();

  // initialises map
  function initMap() {
    map = L.map('map').setView([35, -80], 6);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=sk.eyJ1IjoiaGV5aXRzbWVkeiIsImEiOiJjajk1bWQ5dmwxbWw5MzJwOXV4bm9hM3JpIn0.sTN2b2Bjxh9mM7HsrCfbsg', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.streets',
      accessToken: 'sk.eyJ1IjoiaGV5aXRzbWVkeiIsImEiOiJjajk1bWQ5dmwxbWw5MzJwOXV4bm9hM3JpIn0.sTN2b2Bjxh9mM7HsrCfbsg'
    }).addTo(map);


    // temporary
    var xmlhttp = new XMLHttpRequest();
    var jsonMap;
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {

        jsonMap = JSON.parse(this.responseText);
        L.geoJSON(jsonMap, {style: districtStyle}).addTo(map);  // adds geojson districts to map with style given in style()

        var propertiesList = Object.keys(jsonMap.features[0].properties);

        for(i = 1; i < propertiesList.length; i++) {
          var name = propertiesList[i].toString();
          var $mapItem = newMap(name);

          $mapItem.click(mapItemOnClick($mapItem, name, jsonMap));
        }

      }
    };
    xmlhttp.open("GET", "ncr.geojson", true);
    xmlhttp.send();
    //

    info.addTo(map);

  }

  function mapItemOnClick($item, name, jsonMap) {
    return function() {
      clearMapItemHighlights();
      $mapItem.addClass('w3-blue');
      selectedMap = name;
      geojson = L.geoJSON(jsonMap, {style: districtStyle, onEachFeature: onEachFeature}).addTo(map);
    }
  }

  // determines what colour a district should be, based on a given value d (reock)
  function getColor(d) {
    return d > 0.6 ? '#FFEDA0' :
    d > 0.55  ? '#FED976' :
    d > 0.5  ? '#FEB24C' :
    d > 0.45  ? '#FD8D3C' :
    d > 0.4   ? '#FC4E2A' :
    d > 0.35   ? '#E31A1C' :
    d > 0.3   ? '#BD0026' :
    '#800026';
  }

  // determines how districts on map look
  function districtStyle(feature) {
    var property = null;

    for(var prop in feature.properties) {
      // console.log(prop + ' vs ' + selectedMap + ' for ' );
      if(prop == selectedMap) {
        property = prop;
      }
    }

    if(property != null)
    console.log('Property = ' + property.value);

    return {
      fillColor: getColor(feature.properties[property]),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
    };
  }

  var defaultFeature;

  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      weight: 5,
      color: '#666',
      dashArray: '',
      fillOpacity: 0.7
    });

    // problems with IE, Opera, and Edge will mean this function would not work
    // if(!L.Broswer.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
    // }

    info.update(layer.feature.properties);
  }

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();

    if(defaultFeature != null)
      highlightFeature(defaultFeature);

  }

  function zoomToFeature(e) {
    defaultFeature = e;
  }

  function onEachFeature(feature, layer) {
    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
    });
  }

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
    var newElem = '<a href="#" id="navItem' + mapIndex +
    '" class="w3-bar-item w3-button w3-padding"><i class="fa fa-users fa-fw"></i>   ' + mapsList[mapIndex] + '</a>';

    $('#div-nav-drawer').append(newElem);
    console.log('Added ' + mapsList[mapIndex] + " with index " + mapIndex);
  }

  function clearMapItemHighlights() {
    for(var i = 0; i < mapsList.length; i++) {
      $('#navItem' + i).removeClass('w3-blue');
    }
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
