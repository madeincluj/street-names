module.exports = function(grunt) {
	
	grunt.initConfig({
		yaml: {
			streets: {
				files: [{
					expand: true,
					cwd: 'yaml/',
					src: ['*.yaml'],
					dest: 'json/'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-yaml');

};