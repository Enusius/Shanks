var gulp = require('gulp'),
	gulpServe = require('gulp-live-server'),
	angularFilesort = require('gulp-angular-filesort'),
	wiredep = require('wiredep').stream,
	inject = require('gulp-inject'),
	useref = require('gulp-useref');

gulp.task('serve', function () {
	var server = gulpServe.static('public/src', 8888);
	server.start();
});

gulp.task('bower', function () {
	gulp.src('./public/src/index.html')
		.pipe(wiredep({
			optional: 'configuration',
			goes: 'here'
		}))
		.pipe(gulp.dest('./public/src'));
});

gulp.task('angularFileSort', function () {
	return gulp.src('./public/src/index.html')
		.pipe(inject(gulp.src(['./public/src/components/**/*.js'])
			.pipe(angularFilesort()), {relative: true}))
		.pipe(gulp.dest('./public/src'));
});

gulp.task('useref', function () {
	return gulp.src('./public/src/index.html')
		.pipe(useref())
		.pipe(gulp.dest('./public/dist'));
});