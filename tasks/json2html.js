var ejs = require('ejs');
var slug = require('slug');

slug.charmap['ș'] = 's';
slug.charmap['ț'] = 't';
slug.charmap['ă'] = 'a';
slug.charmap['â'] = 'a';
slug.charmap['î'] = 'i';

module.exports = function(grunt) {
	grunt.registerMultiTask('json2html', function() {
		
		grunt.log.writeln('here');
		var options = this.options({
			url: function(content, filename) {
				return slug(content.name || 'untitled') + '/index.html';
			}
		});

		var tmpl = grunt.file.read(options.template);
		this.files.forEach(function(file) {
			var output = '', dest = '';
			file.src.forEach(function(src) {
				var content = grunt.file.read(src);
				try {
					content = JSON.parse(content);
				} catch(e) {
					return;
				}

				// console.log(JSON.stringify(content));

				try {
					output += ejs.render(tmpl, content);
				} catch(e) {
					return;
				}

				console.log(file.dest);
				dest = options.url(content, src);
			});
			if (dest) grunt.file.write(dest, output);
		});
	});
};