var ejs = require('ejs');
var fs = require('fs');
var slug = require('slug');

slug.charmap['ș'] = 's';
slug.charmap['ț'] = 't';
slug.charmap['ă'] = 'a';
slug.charmap['â'] = 'a';
slug.charmap['î'] = 'i';

var json_dir = 'json/metadata/';
var output_dir = 'streets/';
var json_files = fs.readdirSync(json_dir);
var tmpl = fs.readFileSync('templates/street.ejs', 'utf8');

fs.mkdirSync(output_dir);

json_files.forEach(function(filepath) {
	var content = JSON.parse(fs.readFileSync(json_dir + filepath));
	try {
		var output = ejs.render(tmpl, {
			street: content
		}); 
	} catch (e) {
		return;
	}
	var name = slug((content.name || content.id) +'').toLowerCase() + '/';

	fs.mkdirSync(output_dir + name);
	fs.writeFileSync(output_dir + name + 'index.html', output);
});