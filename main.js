// initializing the map
var mymap = L.map('mapdiv')
mymap.setView([-8.8, 13.3], 11);
// creating the basemap layer variable
var backgroundLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png');
// adding the basemap to my leaftlet map object
mymap.addLayer(backgroundLayer);

//Dynamic coordnates and zoom level change info as mouse moves
mymap.on('mousemove', function(e){
  coords_str = "Latitude: " + e.latlng.lat.toFixed(5) + " Longitude: " + e.latlng.lng.toFixed(5) +
  " Zoom Level: " + mymap.getZoom();
  $("#map_coords").html(coords_str);
})

// adding a GeoJson layer to the map from Db

// pointToLayer is a loop to add features of the data to the map
var lyrAttractions;
refreshAttractions();
function refreshAttractions() {

  $.ajax({
    url: 'load_attractions.php',
    type:'POST',
    data:{filter:$("#filter").val()},
    success: function(response) {
      if(lyrAttractions){
        //mymap.removeLayer(lyrAttractions);
        //lyrAttractions.remove();
        lyrAttractions.removeFrom(mymap);
        $("#zoomButtons").html("");
      };
      //console.log(JSON.parse(response));
      lyrAttractions = L.geoJSON(JSON.parse(response),{pointToLayer: function(feature, latlng) {

        // Adding buttons for each feature
        var strButton = "<button id = 'zoomTo" + feature.properties.name.replace(/ /g, '');
        strButton += "' class='form-control btn-primary attraction'>";
        strButton += feature.properties.name+ "</button>";
        $("#zoomButtons").append(strButton);

        // Adding event hendler for each button
        $("#zoomTo" + feature.properties.name.replace(/ /g, '')).click(function(){
          mymap.setView([latlng.lat, latlng.lng],18);
        });

        // Adding popup for each feature
        var strPopup = "<h4>" + feature.properties.name + "</h4><hr>";
        strPopup += "<h5>Category: " +feature.properties.category+"</h5>";
        strPopup += "<a href='" +feature.properties.web + "' target='blank'>";
        strPopup += "<img src='" +feature.properties.image + "' width='200px'>";
        strPopup += "</a><br><br><button id='btnEdit' class='btn btn-primary center-block' onclick='editAttraction("+feature.properties.id+")'>Edit</button>";
        return L.marker(latlng).bindPopup(strPopup);
      }}).addTo(mymap)
      mymap.fitBounds(lyrAttractions.getBounds())
    }

  });
}

// filter; updates the app whenever map features are filtered
$("#filter").change(function(){
    refreshAttractions();
});
