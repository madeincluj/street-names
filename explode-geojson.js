var fs = require('fs');
var streets = JSON.parse(fs.readFileSync('geojson/streets.geojson'));

streets.features.forEach(function(street) {

	var name = street.properties.name ? street.properties.name.replace(/[^a-z0-9A-Z]/g, '_') : 'unnamed';

	var filename = street.id.replace(/\//g, '_') + '_' + name + '.json';
	var data = JSON.stringify(street, null, 2);

	fs.writeFileSync('geojson/streets/' + filename, data);
});