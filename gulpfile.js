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

gulp.task('inject-dependencies', function () {
	var target = gulp.src('./public/src/index.html');
	// It's not necessary to read the files (will speed up things), we're only after their paths:
	var sources = gulp.src([
		"./public/bower_components/jquery/dist/jquery.min.js",
		"./public/bower_components/moment/min/moment.min.js",
		"./public/bower_components/angular/angular.min.js",
		"./public/bower_components/angular-ui-router/release/angular-ui-router.min.js",
		"./public/bower_components/angular-ui-calendar/src/calendar.js",
		"./public/bower_components/fullcalendar/dist/fullcalendar.min.js",
		"./public/bower_components/fullcalendar/dist/gcal.js",
		"./public/bower_components/bootstrap/dist/js/bootstrap.min.js",
		"./public/bower_components/angular-bootstrap/ui-bootstrap.min.js",
		"./public/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js",
		"./public/bower_components/firebase/firebase.js",
		"./public/bower_components/angularfire/dist/angularfire.min.js",
		"./public/bower_components/angular-sanitize/angular-sanitize.min.js",
		"./public/bower_components/angular-animate/angular-animate.min.js",
		"./public/bower_components/ngToast/dist/ngToast.min.js"
	], {read: false});

	return target.pipe(inject(sources))
		.pipe(gulp.dest('./public/src'));
});