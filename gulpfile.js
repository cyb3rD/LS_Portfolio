var gulp = require("gulp"),
	browserSync = require ("browser-sync")
	useref = require("gulp-useref"),
	gulpif = require("gulp-if"),
	uglify = require("gulp-uglify"),
	minifyCss = require("gulp-minify-css");
// Сервер
gulp.task('server', function () {
	browserSync ({
		port: 9000,
		server: {
			baseDir: 'app'
		}
	});
});
// слежка
gulp.task('watch', function () {
	gulp.watch ([
		'app/*.html',
		'app/js/**/*.js',
		'app/css/**/*.css'
	]).on('change', browserSync.reload);
});
//Задача по умолчанию
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