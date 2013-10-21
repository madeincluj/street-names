$(document).ready(function() {

//Initialize the map with a starting view and a generous maximum boundary
var map = L.map('map',{
            maxBounds: [[46.6412301,23.4324747],[46.9201137,23.8047838]]
        })
        .fitBounds([[46.7412301, 23.53816],[46.76813, 23.59253]]);                  

 var AltTiles = 'http://b.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png';
 var StamenTiles = 'http://a.tile.stamen.com/toner-lite/{z}/{x}/{y}.png';
//Background tiles
L.tileLayer(StamenTiles).addTo(map);

//Keep track of the currently selected street
var selectedStreet;


console.log(streetList.length);
var len = streetList.length;

for (var i = 0; i < len; i++) {

    var street = streetList[i];                    
    
    //if (street.dimensions == 3) {
        //It's a MultiPolyLine, a street with multiple <way>s
        if (typeof street.geometry.coordinates[0] != "number") {
        
          newLayer = new L.Polyline(street.geometry.coordinates.map(function(e) {return new L.LatLng(e[1], e[0])}));
        } else {
          //newLayer = new L.Polyline(new L.LatLng(street.geometry.coordinates[0], street.geometry.coordinates[1]));
        }
    //} else {                
        //It's a simple Polyline, a street with one <way>
        //newLayer = new L.polyline(street.polyline);
    //}
   newLayer.setStyle({opacity: 0.3, color: 'blue'});

        if (typeof street.geometry.coordinates[0] != "number") {          
            newLayer.on('mouseover', function(e) {
            //Highlight it
            this.setStyle({opacity: 1, color: 'orange'});
        })
        .on('mouseout', function(e) {                
            //Unhighlight it, unless they've clicked on it
            if (this != selectedStreet) {                    
                this.setStyle({opacity: 0.3, color: 'blue'});                    
            }
        })
        .on('click', function(e) {
            //Update the infobox with the street info
            selectedStreet = this;
            infoBox.update(street);
        })
    //add the polyline to the map
    map.addLayer(newLayer);

        }
}      

});
