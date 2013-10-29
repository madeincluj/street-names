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
		}
	});

	grunt.loadNpmTasks('grunt-yaml');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.registerTask('metadata', 'Compile street metadata from YAML source', ['yaml:streets']);
	grunt.registerTask('default', 'Run development server', ['connect:server']);
};