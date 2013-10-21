var fs = require('fs');
var streets = JSON.parse(fs.readFileSync('export.geojson'));

var map = {};
streets.features
	.filter(function(street) {
		return street.geometry.type === 'LineString';
	})
	.forEach(function(street) {
	var name = street.properties.name || 'unnamed';
	if (!map[name]) {
		map[name] = street;
		street.geometry.coordinates = [street.geometry.coordinates];
		street.geometry.type = "MultiLineString";

	} else {
			map[name].geometry.coordinates = map[name].geometry.coordinates.concat([street.geometry.coordinates]);
	}
});

var features = Object.keys(map).map(function(key) {
	return map[key];
});

var geojson = {
	type: 'FeatureCollection',
	features: features
};

var str = "load(" + JSON.stringify(geojson, null ,2) + ");";

fs.writeFileSync('merged-streets.json', str);