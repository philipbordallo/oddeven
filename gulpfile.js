'use strict';

// DEPENDENCIES
	var browserSync = require('browser-sync').create();
	var gulp = require('gulp');
	var utility = require('gulp-util');
	var sass = require('gulp-sass');
	var sourceMaps =  require('gulp-sourcemaps');
	var uglify = require('gulp-uglify');
	var concat = require('gulp-concat');
	var postcss =  require('gulp-postcss');
	var autoprefixer =  require('autoprefixer');
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
		logPrefix: ' server ',
		rewriteRules: [{
			match: /www.google-analytics.com\/analytics.js/g,
			fn: function (match) {
				return '';
			}
		}]
	};
	var uglifyOptions = {
		compress: false,
		mangle: false
	};
	var browserList = [
		'ie >= 9',
		'ie_mob >= 10',
		'firefox >= 31',
		'chrome >= 35',
		'safari >= 6.1', // OSX Lion
		'ios_saf >= 7.0-7.1', // iOS Safari & Chrome
		'android >= 4.1', // Jelly Bean
		'and_chr >= 42', // Android Chrome
		'and_ff >= 38' // Android Firefox
	];
	var postcssOptions = [
		autoprefixer({
			browsers: browserList
		})
	];

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
			.pipe(postcss(postcssOptions))
			.pipe(sourceMaps.write('./'))
			.pipe(gulp.dest('assets/css/'))
			.pipe(browserSync.stream());
	});

	gulp.task('default', ['server', 'sass']);
