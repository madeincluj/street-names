var fs = require('fs');
var streetNames = fs.readFileSync('tools/selected-streets.txt', 'utf8').split(/\r?\n/).filter(function(str) {
	return str;
});

var map = {};
streetNames.forEach(function(name) {
	map[name] = false;
});

var streets = JSON.parse(fs.readFileSync('json/streets.json'));

streets.features = streets.features.filter(function(street) {
	var name = street.properties.name;
	var found = streetNames.filter(function(streetName) {
		if (name.indexOf(streetName) > -1) {
			map[streetName] = true;
			return true;
		}
		return false;
	});
	if (found.length) {
		console.log("Matched ", street.properties.name);
		return true;
	}
	return false;
});

console.log('Total: ', streets.features.length);
console.log('Unmatched: ');
for (var i in map) {
	if (!map[i]) {
		console.log(i);
	}
}


fs.writeFileSync('json/selected-streets.json', JSON.stringify(streets, null, 2));