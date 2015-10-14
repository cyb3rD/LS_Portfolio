var gulp = require("gulp"),
	browserSync = require ("browser-sync")
	useref = require("gulp-useref"),
	gulpif = require("gulp-if"),
	uglify = require("gulp-uglify"),
	minifyCss = require("gulp-minify-css"),
	wiredep = require("wiredep").stream;
// Server
gulp.task('server', function () {
	browserSync ({
		port: 9000,
		server: {
			baseDir: 'app'
		}
	});
});

// Attach bower files
gulp.task('wiredep-bower', function() {
	return gulp.src('./app/*.html')
		.pipe(wiredep({
			directory: './app/bower',
			overrides: {
				//rewrite qtip2 bower.json
				"qTip2": {
					"main": ["./jquery.qtip.min.js", "./jquery.qtip.css"],
					"dependencies": {"jquery": ">=1.6.0"}
				}
			}
			//
		}))
		.pipe(gulp.dest('./app'));
});

// Watch
gulp.task('watch', function () {
	gulp.watch ([
		'app/*.html',
		'app/js/**/*.js',
		'app/css/**/*.css'
	]).on('change', browserSync.reload);
});


// Default task
//gulp.task('default', ['server', 'wiredep-bower', 'watch']);
gulp.task('default', ['server', 'watch']);



// Move files to DIST
gulp.task('useref', function () {
	var assets = useref.assets();
	return gulp.src('./app/*.html')
		.pipe(assets)
		.pipe(gulpif('*.js', uglify()))
		.pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('dist'));
});
// Dev server
gulp.task('dev-server', function () {
	browserSync ({
		port: 9999,
		server: {
			baseDir: 'dist'
		}
	});
});