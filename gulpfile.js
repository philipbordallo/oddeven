'use strict';

// DEPENDENCIES
	var gulp = require('gulp');
	var utility = require('gulp-util');
	var sass = require('gulp-sass');
	var sourceMaps =  require('gulp-sourcemaps');
	var autoprefixer =  require('gulp-autoprefixer');
	var uglify = require('gulp-uglify');
	var concat = require('gulp-concat');
	var browserSync = require('browser-sync').create();
	var del = require('del');
	var q = require('q');

// CONFIGS
	var sassOptions = {
		outputStyle: 'compressed',
		includePaths: 'src/scss/'
	};
	var browserSyncOptions = {
		server: './',
		open: false,
		notify: false,
		logPrefix: ' server '
	};
	var uglifyOptions = {
		compress: false,
		mangle: false
	};
	var autoprefixerOptions = {
		browser: [
			'ie >= 9',
			'ie_mob >= 10',
			'firefox >= 31',
			'chrome >= 35',
			'safari >= 6.1', // OSX Lion
			'ios_saf >= 7.0-7.1', // iOS Safari & Chrome
			'android >= 4.1', // Jelly Bean
			'and_chr >= 42', // Android Chrome
			'and_ff >= 38' // Android Firefox
		]
	};
	var jsInput = require('./src/js/_files.json');
	var jsOutput = 'assets/js/scripts.js';

// DEVELOPMENT TASKS – `gulp`
	gulp.task('watch', function() {

		// Watch scss files for changes, sass it up, and report
		gulp.watch('src/scss/**/*.scss', ['sass'])
			.on('change', function(event) {
				var reg = new RegExp(__dirname, 'g');
				var result = utility.colors.green(event.path.replace(reg, ''));
				var prefix = '[' + utility.colors.blue('nodesass') + '] ';
				console.log(prefix + result + ' was ' + event.type);
			});

		// Watch html files for changes and reload
		gulp.watch('**/*.html', browserSync.reload);

		// Watch js files for changes and reload
		gulp.watch('src/js/**', browserSync.reload);
	});

	// Start `browser-sync` server
	gulp.task('server', ['watch'], function() {
		browserSync.init(browserSyncOptions);
	});

	gulp.task('sass', function() {
		gulp.src('src/scss/**/*.scss')
			.pipe(sourceMaps.init())
			.pipe(sass(sassOptions)).on('error', sass.logError)
			.pipe(autoprefixer(autoprefixerOptions))
			.pipe(sourceMaps.write('./'))
			.pipe(gulp.dest('assets/css/'))
			.pipe(browserSync.stream());
	});

	gulp.task('default', ['server', 'sass']);

// BUILD TASKS – `gulp build`
	// Compile and uglify js
	gulp.task('build', function() {
		gulp.src(jsInput)
			.pipe(concat(jsOutput))
			.pipe(uglify(uglifyOptions))
			.pipe(gulp.dest('./'))
	});