var fs = require('fs');
var streets = JSON.parse(fs.readFileSync('json/selected-streets.json'));
streets.features.forEach(function(street) {
	var id = street.properties.id.replace('way/', '');
	var content = 'id: ' + id + '\n';
	content += 'name: ' + street.properties.name + '\n';
	fs.writeFileSync('metadata/' + id + '.yaml', content);
});