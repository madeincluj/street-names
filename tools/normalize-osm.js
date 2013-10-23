var fs = require('fs');
var _ = require('lodash');
var streets = JSON.parse(fs.readFileSync('vendor/overpass-api-export.json'));

var features = _(
		// select only LineString features
		streets.features.filter(function(street) {
			return street.geometry.type === 'LineString';
		})
	)

	// group features by name
	.groupBy(function(street) {
		return street.properties.name;
	})

	// convert to array
	.toArray()

	// concatenate coordinates of street groups, return first one (canonical, hopefully)
	.map(function(streetGroup) {
		var canonical = streetGroup[0];
		canonical.geometry.coordinates = Array.prototype.concat.apply(
			[canonical.geometry.coordinates], 
			streetGroup.slice(1).map(function(street) {
				return [street.geometry.coordinates];
			})
		)
		canonical.geometry.type = "MultiLineString";
		canonical.properties = {
			id: canonical.id,
			name: canonical.properties.name,
			highway: canonical.properties.highway
		};
		delete canonical.id;
		return canonical;
	})

	// convert to simple array
	.valueOf();

var geojson = {
	type: 'FeatureCollection',
	features: features
};

fs.writeFileSync('json/streets.json', JSON.stringify(geojson, null ,2));