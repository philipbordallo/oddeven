'use strict';

// DEPENDENCIES
const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const utility = require('gulp-util');
const sass = require('gulp-sass');
const sourceMaps =  require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const checkIf = require('gulp-if');
const concat = require('gulp-concat');
const postcss =  require('gulp-postcss');
const autoprefixer =  require('autoprefixer');
const fs = require('fs');

const ENV = process.env.NODE_ENV;

// CONFIGS
const SCRIPTS = [
	'src/js/vendor/classlist.min.js',
	'src/js/errors.js',
	'src/js/date.js',
	'src/js/parking.js',
	'src/js/visual.js',
];
const REWRITE_RULES = {
	googleAnalytics: {
		match: /www.google-analytics.com\/analytics.js/g,
		fn: function() { return '' }
	},
	jsBundle: {
		match: /<!-- bundle -->([\s\S]*?)<!-- \/bundle -->/gmi,
		fn: function() {
			let scriptString = '';

			SCRIPTS.forEach(item => {
				scriptString += `<script src='${item}'></script>`
			});

			return scriptString;
		}
	}
};
const OPTIONS = {
	sass: {
		outputStyle: 'compressed',
		includePaths: 'src/scss/'
	},
	browserSync: {
		production: {
			server: './',
			open: false,
			notify: false,
			logConnections: true,
			logPrefix: ' server ',
		},
		development: {
			server: './',
			open: false,
			notify: false,
			logPrefix: ' server ',
			rewriteRules: [
				REWRITE_RULES.googleAnalytics,
				REWRITE_RULES.jsBundle
			]
		}
	},
	uglify: {
		compress: false,
		mangle: false
	},
	postcss: [
		autoprefixer()
	]
};

// DEVELOPMENT TASKS – `gulp`
gulp.task('watch', () => {
	// Watch scss files for changes, sass it up, and report
	gulp.watch('src/scss/**/*.scss', ['sass'])
		.on('change', (event) => {
			const reg = new RegExp(__dirname, 'g');
			const result = utility.colors.green(event.path.replace(reg, ''));
			const prefix = `[${utility.colors.blue('nodesass')}] `;

			console.log(`${prefix} ${result} was ${event.type}`);
		});

	// Watch html files for changes and reload
	gulp.watch('**/*.html', browserSync.reload);

	// Watch js files for changes and reload
	gulp.watch('src/js/**', browserSync.reload);
});

// Start `browser-sync` server
gulp.task('server', ['watch'], () => {
	browserSync.init(OPTIONS.browserSync[ENV]);
});

gulp.task('sass', () => {
	return gulp.src('src/scss/**/*.scss')
		.pipe(sourceMaps.init())
		.pipe(sass(OPTIONS.sass)).on('error', sass.logError)
		.pipe(postcss(OPTIONS.postcss))
		.pipe(checkIf(ENV === 'development', sourceMaps.write('./')))
		.pipe(gulp.dest('assets/css/'))
		.pipe(browserSync.stream());
});

gulp.task('default', ['server', 'sass']);

// Compile and uglify js
gulp.task('js', () => {
	return gulp.src(SCRIPTS)
		.pipe(concat('bundle.js'))
		.pipe(uglify(OPTIONS.uglify))
		.pipe(gulp.dest('assets/js/'))
});

// BUILD TASK - `build`
gulp.task('build', ['sass', 'js'])

