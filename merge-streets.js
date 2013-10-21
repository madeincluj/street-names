var fs = require('fs');
var streets = JSON.parse(fs.readFileSync('geojson/streets.geojson'));

var map = {};
streets.features.forEach(function(street) {
	var name = street.properties.name || 'unnamed';
	if (!map[name]) {
		map[name] = street;
	} else {
		if (Array.isArray(map[name].geometry.coordinates[0])) {
			map[name].geometry.coordinates[0] = map[name].geometry.coordinates[0].concat(street.geometry.coordinates[0]);
		}
	}
});

var features = Object.keys(map).map(function(key) {
	return map[key];
});

var geojson = {
	type: 'FeatureCollection',
	features: features
};

fs.writeFileSync('geojson/merged-streets.json', JSON.stringify(geojson, null ,2));