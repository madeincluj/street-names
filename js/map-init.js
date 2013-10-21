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

L.geoJson(streetList.features, {
    style: function(feature) {
        return { color: "#CC0000" };
    },
    onEachFeature: function(feature,layer) {
        layer.on('mouseover', function() {
            console.log(this, arguments);
            layer.setStyle({
                color: "#000000"
            })
        });
    }
}).addTo(map)
});
