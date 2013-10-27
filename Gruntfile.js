module.exports = function(grunt) {
	
	grunt.initConfig({
		yaml: {
			streets: {
				files: [{
					expand: true,
					cwd: 'metadata/',
					src: ['*.yaml'],
					dest: 'json/metadata/'
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
		},

		json2html: {
			options: {
				template: 'templates/street.ejs'
			},
			streets: {
				files: [{
					expand: true,
					cwd: 'json/metadata/',
					src: ['*.json'],
					dest: 'streets/'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-yaml');
	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.registerTask('metadata', 'Compile street metadata from YAML source', ['yaml:streets']);
	grunt.registerTask('default', 'Run development server', ['connect:server']);
};