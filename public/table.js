
function initializeTable(dataObj){
    addTableBody(dataObj);
    defaultColors();
}

function addTableBody(dataObj){
    for(var district in dataObj){
        $('#districtTableBody')
          .append($('<tr></tr>').attr('id', district)
            .append($('<th></th').addClass(`matchTable boxable${district}`).text(district))
            .append($('<th></th').addClass(`reockAnalysis boxable${district}`).text(dataObj[district]['Reock'].toFixed(3)))
            .append($('<th></th').addClass(`polsbyAnalysis boxable${district}`).text(dataObj[district]['PolsbyPopper'].toFixed(3)))
            .append($('<th></th').addClass(`schwartzbergAnalysis boxable${district}`).text(dataObj[district]['Schwartzberg'].toFixed(3)))
            .append($('<th></th').addClass(`convexHullAnalysis boxable${district}`).text(dataObj[district]['ConvexHull'].toFixed(3))) 
            .append($('<th></th').addClass(`lengthWidthAnalysis boxable${district}`).text(dataObj[district]['LengthWidth'].toFixed(3)))
            .append($('<th></th').addClass(`xSymmetryAnalysis boxable${district}`).text(dataObj[district]['XSymmetry'].toFixed(3)))
        );
      }
    
    var oTable = $('#districtTable').DataTable( {
        scrollY:        600,
        scrollCollapse: true,
        paging:         false,
        fixedColumns:   true,
        select:         true,
        searching: false,
        columnDefs: [
            {
                className: 'mdl-data-table__cell--non-numeric'
            }
        ]
    });   
}

function defaultColors(){
    //default table color
    colorTable(".reockAnalysis", .289);
    colorTable(".polsbyAnalysis", .095);
    colorTable(".schwartzbergAnalysis", .308);
    colorTable(".convexHullAnalysis", .494);
    colorTable(".xSymmetryAnalysis", .6);
    colorTable(".lengthWidthAnalysis", .6);
}



function colorTable(metric, target){
    $(metric).each(function(){
  
      var colText = $(this).text();
  
      if(colText > target){
        $(this).attr('data-color', 'good');
      } else {
        $(this).attr('data-color', 'bad');
      }
    });
}
  

var reockDiv = 0;
var polsbyPopperDiv = 0;
var schwartzbergDiv = 0;
var convexHullDiv = 0;
var lengthWidthDiv = 0;
var xSymmetryDiv = 0;

function getBoundaryInput() {
  if (reockBoundary.value.length != 0) {
    reockDiv = Number($('#reockBoundary').val());
    colorTable(".reockAnalysis", reockDiv);
  }

  if (polsbyPopperBoundary.value.length != 0) {
    polsbyPopperDiv = Number($('#polsbyPopperBoundary').val());
    colorTable(".polsbyAnalysis", polsbyPopperDiv);
  }

  if (schwartzbergBoundary.value.length != 0) {
    schwartzbergDiv = Number($('#schwartzbergBoundary').val());
    colorTable(".schwartzbergAnalysis", schwartzbergDiv);
  }

  if (convexHullBoundary.value.length != 0) {
    convexHullDiv = Number($('#convexHullBoundary').val());
    colorTable(".convexHullAnalysis", convexHullDiv);
  }

  if (lengthWidthBoundary.value.length != 0) {
    lengthWidthDiv = Number($('#lengthWidthBoundary').val());
    colorTable(".lengthWidthAnalysis", lengthWidthDiv);
  }

  if (xSymmetryBoundary.value.length != 0) {
    xSymmetryDiv = Number($('#xSymmetryBoundary').val());
    colorTable(".xSymmetryAnalysis", xSymmetryDiv);
  }
}

function changeBoundary() {

    var boundarySelectResponse = document.getElementById("boundarySelect").value;
    if (boundarySelectResponse == "custom") {
      $('#boundaryType').html("Enter custom boundaries between 0 and 1:");
      $('#customBoundarySelect').show();
    }
    else if (boundarySelectResponse == "median") {
      $('#customBoundarySelect').hide();
      $('#boundaryType').html("Now displaying " + boundarySelectResponse + " boundaries.<br>Reock: 0.500<br>Polsby-Popper: 0.500<br>Schwartzberg: 0.500<br>Convex-Hull: 0.500<br>Length-Width: 0.500<br>X-Symmetry: 0.500");
      colorTable(".reockAnalysis", .5);
      colorTable(".polsbyAnalysis", .5);
      colorTable(".schwartzbergAnalysis", .5);
      colorTable(".convexHullAnalysis", .5);
      colorTable(".xSymmetryAnalysis", .5);
      colorTable(".lengthWidthAnalysis", .5);
    }
    else {
      $('#customBoundarySelect').hide();
      $('#boundaryType').html("Now displaying " + boundarySelectResponse + " boundaries.<br>Reock: 0.289<br>Polsby-Popper: 0.095<br>Schwartzberg: 0.308<br>Convex-Hull: 0.494<br>Length-Width: 0.717<br>X-Symmetry: 0.384");
      colorTable(".reockAnalysis", .289);
      colorTable(".polsbyAnalysis", .095);
      colorTable(".schwartzbergAnalysis", .308);
      colorTable(".convexHullAnalysis", .494);
      colorTable(".xSymmetryAnalysis", .6);
      colorTable(".lengthWidthAnalysis", .6);
    }
}
