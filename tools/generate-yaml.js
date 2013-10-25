var fs = require('fs');
var streets = JSON.parse(fs.readFileSync('json/selected-streets.json'));
streets.features.forEach(function(street) {
	var id = street.properties.id.replace('way/', '');
	var content = 'id: ' + id + '\n';
	content += 'name: ' + street.properties.name + '\n';
	var output = 'metadata/' + id + '.yaml';
	if (!fs.existsSync(output)) fs.writeFileSync(output, content);
});