var fs = require('fs');
var gulp = require('gulp');
var browser = require('browser-sync');
var browserify = require('browserify');
var shell = require('child_process').execSync;
var glob = require('glob');

var entry_files = glob.sync('examples/**/app.jsx');

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
	console.log('bundle_file', filepath);
	browserify(filepath, {debug: true})
		.transform("babelify", {
			presets: ["react"]
		})
		.bundle()
		.on('error', function(err){
	      // print the error (can replace with gulp-util)
	      console.log(err.message);
	      // end this stream
	      this.emit('end');
	      var oascript = 'display notification "'+ err.message + '" with title "Error"';
	      var cmd = "osascript -e '" + oascript + "'";
	      shell(cmd);
	    })
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