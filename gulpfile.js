var fs = require('fs');
var path = require('path');
var gulp = require('gulp');
var browser = require('browser-sync');
var browserify = require('browserify');
var shell = require('child_process').execSync;
var glob = require('glob');
var source = require('vinyl-source-stream');
var async = require('async');
var minify = require('gulp-minify');
var rename = require('gulp-rename');
var del = require('del');
var runSequence = require('gulp-run-sequence');

var entry_files = glob.sync('examples/**/app.jsx');

function isRootDir(dirname) {
	var rootPath = path.join(dirname, 'gulpfile.js');

	try {
		fs.statSync(rootPath);
		return true;
	} catch (e) {
		return false;
	}
}

function getParentAppJSX(fpath) {
	var isRun = true;
	var dirname = path.dirname(fpath);
	while (isRun) {
		var appJSXPath = path.join(dirname, 'app.jsx');

		if (isRootDir(dirname)) {
			return;
		}

		try {
			fs.statSync(appJSXPath);
			return appJSXPath;
		} catch (e) {
			dirname = path.dirname(dirname);
		}
	}
}

gulp.task('reload', function(cb) {
	browser.reload();
	cb();
});

gulp.task('server', function() {

});

function bundle_file(filepath, done) {
	console.log('bundle_file', filepath);
	browserify(filepath, {debug: false, extensions: ['.jsx']})
		.transform("babelify", {
			presets: ["react", 'es2015', 'stage-1'],
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
	    .pipe(source(filepath.slice(0, -1)))
	    .pipe(gulp.dest('.'))
	    .on('end', done);
}

gulp.task('bf', function(done) {
	async.eachSeries(entry_files, function(file, cb) {
		bundle_file(file, cb);
	}, function(err) {
		console.log('bf done');
		done(err);
	});
	// entry_files.forEach(function(file) {
	// 	bundle_file(file);
	// });
	return;
});

gulp.task('compress', function(done) {
  gulp.src('examples/**/app.js')
    .pipe(minify())
    .pipe(gulp.dest('examples'))
    .on('end', done);
});

gulp.task('copy-to-dist', function() {
	gulp.src("examples/**/*.css").pipe(gulp.dest("dist/"));
	gulp.src("examples/**/*.html").pipe(gulp.dest("dist/"));
	gulp.src("examples/**/app-min.js")
		.pipe(rename({basename: "app"}))
		.pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
	del.sync('dist');
});

gulp.task('production', function(done) {
	runSequence('clean', 'compress', 'copy-to-dist', done);
});

gulp.task('server', function() {
	browser.init({
		server: {
			baseDir: "examples",
			index: ['index.html']
		},
		port: 8001,
	});

	gulp.watch('examples/**/*.jsx', function(file) {
		var appJSXPath = getParentAppJSX(file.path);
		console.log('appJSXPath', appJSXPath);
		if (appJSXPath) {
			bundle_file(appJSXPath, function(err) {
				if (err) return;
				browser.reload();
				console.log("rebundle path", appJSXPath);
			});
		}
	});
});

gulp.task('default', ['server'], function() {

});