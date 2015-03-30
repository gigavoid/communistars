'use strict';

var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    jade = require('gulp-jade'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    gutil = require('gulp-util'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify');

var watching = false;

function exitIfNotWatching(error) {
	if (watching) {
		gutil.log(error.message);
	}
	else {
		throw error;
	}
}

var bundler = watchify(browserify({
    entries: './game.js',
    basedir: './app/scripts/',
    debug: true,
    cache: {},
    packageCache: {}
})).transform(babelify);

gulp.task('styles', function() {
    return gulp.src('./app/styl/game.styl')
        .pipe(plumber(exitIfNotWatching))
        .pipe(sourcemaps.init())
        .pipe(stylus({
            compress: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./out/static/'));
});

gulp.task('scripts', function() {
    var init = bundler.bundle()
		.on('error', function(err){
            gutil.log(err.message);
            browserSync.notify('<font color="red">Error compiling the script, please check your console</font>', 5000);
            this.emit('end');
		})
	    .pipe(plumber(exitIfNotWatching))
        .pipe(source('game.js'));

    if (!watching) {
        // If not watching (production build)
        init = init.pipe(buffer())
            .pipe(sourcemaps.init({loadMaps: true}))
            .pipe(uglify())
            .pipe(sourcemaps.write('.'));
    }

    browserSync.notify('Script compiled');
    return init.pipe(gulp.dest('./out/static/'));
});

gulp.task('static', function() {
    return gulp.src('./app/static/**')
        .pipe(gulp.dest('./out/static/'));
});

gulp.task('templates', function() {
	return gulp.src('./app/templates/*.jade')
		.pipe(plumber(exitIfNotWatching))
		.pipe(jade())
		.pipe(gulp.dest('./out/'));
});

gulp.task('watch', function() {
	watching = true;
	gulp.start(['styles', 'templates', 'scripts', 'static']);

	gulp.watch('./app/styl/*', ['styles']);
	gulp.watch('./app/templates/*', ['templates']);
	gulp.watch('./app/scripts/*', ['scripts']);
	gulp.watch('./app/static/*', ['static']);

    browserSync({
        server: {
            baseDir: './out/'
        },
        open: false
    });
});

gulp.task('default', ['styles', 'templates', 'scripts', 'static'], function() {
    process.exit(0);
});
