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
		},

		connect: {
			server: {
				hostname: '*',
				options: {
					keepalive: true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-yaml');
	grunt.loadNpmTasks('grunt-contrib-connect');

};