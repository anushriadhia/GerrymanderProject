$(document).ready(function() {
  var pieChart = c3.generate({
      title: {
        text: '2016 NC Registered Voter Party Affiliation'
      },
      bindto: '#pieChart',
      data: {
          // iris data from R
          columns: [
              ['Democrat', 37],
              ['Republican', 33],
              ['Independent', 30],
          ],
          type : 'pie',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
      }
  });

  // var barChart = c3.generate({
  //     title: {
  //       text: '2016 NC Registered Voter Party Affiliation'
  //     },
  //     bindto: '#barChart',
  //     data: {
  //         // iris data from R
  //         columns: [
  //             ['Democrat', 57],
  //             ['Republican', 33],
  //             ['Independent', 10],
  //         ],
  //         type : 'bar',
  //         onclick: function (d, i) { console.log("onclick", d, i); },
  //         onmouseover: function (d, i) { console.log("onmouseover", d, i); },
  //         onmouseout: function (d, i) { console.log("onmouseout", d, i); }
  //     },
  //     bar: {
  //       width: {
  //         ratio: 0.5
  //       }
  //     }
  // });

  // var timeChart = c3.generate({
  //     title: {
  //       text: '2016 NC Voter Gubernatorial Preference'
  //     },
  //     bindto: '#timeChart',
  //     data: {
  //       x: 'x',
  //         columns: [
  //             ['x', '2016-01-01', '2016-02-01', '2016-03-01', '2016-04-01', '2016-05-01'],
  //             ['McCrory', 33, 36, 37, 32, 29],
  //             ['Cooper', 42, 40, 34, 39, 32],
  //         ],
  //     },
  //     axis: {
  //       x: {
  //         type: 'timeseries',
  //         tick: {
  //           format: "%Y-%m-%d"
  //         }
  //       }
  //     }
  //
  // });

      newMetric("lool");

      newMap("Map 1");
      newMap("Map 2");

});

// names of metrics
var metricsList = [

];

// names of maps
var mapsList = [

];


function newMetric(nameStr) {
  metricsList.push(nameStr);
  addMetricsRow(metricsList.length - 1);

}

function addMetricsRow(metricIndex) {

}


function newMap(nameStr) {
  mapsList.push(nameStr);
  addNavRow(mapsList.length - 1);
}

// adds a row for a metric graph
function addNavRow(mapIndex) {
  var $navDrawer = $('#navDrawer');

  // html for new row
  var newElem = '<a href="#" id="navItem' + mapsList[mapIndex] +
    '" class="w3-bar-item w3-button w3-padding"><i class="fa fa-users fa-fw"></i>   ' + mapsList[mapIndex] + '</a>';

  $('#div-nav-drawer').append(newElem);
  console.log('Added ' + mapsList[mapIndex] + " with index " + mapIndex);
}
