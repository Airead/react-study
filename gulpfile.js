var fs = require('fs');
var gulp = require('gulp');
var browser = require('browser-sync');
var browserify = require('browserify');

var entry_files = [
	'examples/basic/app.jsx',
	'examples/basic-external/app.jsx',
];

gulp.task('reload', function(cb) {
	browser.reload();
	cb();
});

gulp.task('server', function() {
	browser.init({
		server: {
			baseDir: "examples",
			index: ['index.html']
		},
		port: 8001,
	});
});

function bundle_file(filepath) {
	browserify(filepath)
		.transform("babelify", {
			presets: ["react"]
		})
		.bundle()
		.pipe(fs.createWriteStream(filepath.slice(0, -1)));
}

gulp.task('browserify', function() {
	entry_files.forEach(function(file) {
		bundle_file(file);
	});
	return;
});

gulp.task('default', ['browserify', 'server'], function() {
	gulp.watch('examples/**/app.jsx', function(file) {
		bundle_file(file.path);
		console.log("rebundle path", file.path);
	});
});