var gulp = require('gulp'),
		sass = require('gulp-sass'),
		prefixer = require('gulp-autoprefixer'),
		pug = require('gulp-pug'),
		imagemin = require('gulp-imagemin'),
		uglify = require('gulp-uglify');

var config = {
	server: {
			baseDir: "./dist"
	},
	tunnel: true,
	host: 'localhost',
	port: 9000,
	logPrefix: "si"
};

var path = {
	dist: {
		html: 'dist/',
		js: 'dist/js/',
		css: 'dist/css/',
		img: 'dist/img/',
		fonts: 'dist/fonts/'
	},
	src: {
		pug: 'src/*.pug',
		js: 'src/js/main.js',
		sass: 'src/sass/main.sass',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	watch: { //наблюдаем
		html: 'src/**/*.html',
		js: 'src/js/**/*.js',
		sass: 'src/sass/**/*.sass',
		img: 'src/img/**/*.*',
		fonts: 'src/fonts/**/*.*'
	},
	clean: './dist'
};


//////////
//Собираем
gulp.task('pug', function() {
	gulp.src(path.src.pug)
		.pipe(pug({pretty: true}))
		.pipe(gulp.dest(path.dist.html))
});

gulp.task('sass', function() {
	gulp.src(path.src.sass)
		.pipe(sass())
		.pipe(prefixer())
		.pipe(gulp.dest(path.dist.css))
	console.log('Hello Sass');
});

gulp.task('js', function() {
	gulp.src(path.src.js)
		.pipe(uglify())
		.pipe(gulp.dest(path.dist.js))
});

gulp.task('img', function() {
	gulp.src(path.src.img)
		.pipe(imagemin({
			progressive: true,
			optimizationLevel: 5,
			interlaced: true,
			svgoPlugins: [{removeViewBox: false}]
		}))
		.pipe(gulp.dest(path.dist.img))
	console.log('Hello Img');
});

// gulp.task('fonts', function() {
// 	gulp.src(path.src.fonts)
// 		.pipe()
// 		.pipe(gulp.dest(path.dist.fonts))
// });


//////////
//WATCH
gulp.task('watch', function() {
	watch([path.watch.pug], function() {
		gulp.start('pug');
	});
	gulp.watch([path.watch.sass], function() {
		gulp.start('sass');
	});
	// watch([path.watch.js], function() {
	// 	gulp.start('js');
	// });
	watch([path.watch.img], function() {
		gulp.start('img');
	});
	// watch([path.watch.fonts], function() {
	// 	gulp.start('fonts');
	// });
});