const gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    notify = require("gulp-notify"),
    rigger = require('gulp-rigger'),
    flatten = require('gulp-flatten'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    browserSync = require('browser-sync').create(),
    rcs = require('gulp-rcs'),
    gcmq = require('gulp-group-css-media-queries'),
    concat = require('gulp-concat'),
    path1 = require('path'),
    folders = require('gulp-folders'),
    pathToFolder = 'src/components';


gulp.task('s', folders('src/components', function (folder) {
    return gulp.src(path1.join('src/components', folder, '*.sass'))
        .pipe(rcs({
            preventRandomName: true,
            prefix: folder + "-" ,
        }))
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass({
        }))

        .pipe(gcmq())
        .pipe(cssmin())
        .pipe(flatten())
        .pipe(gulp.dest(path.build.css));
}));


gulp.task('style', function(){
    return gulp.src(path.src.style)
        // .pipe(rcs({
        //     preventRandomName: true,
        //     prefix: folder1+"-ww",
        // }))
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(sass({
        }))
        .pipe(gcmq())
        .pipe(cssmin())
        .pipe(flatten())
        .pipe(gulp.dest(path.build.css));
    // browserSync.reload();
});

gulp.task('all', () => {
    return gulp.src(['build/**/*.css', 'build/**/*.js', 'build/**/*.html'])
        .pipe(rcs({
            preventRandomName: true,
            prefix: 'my-super-cool-prefix-',
        }))
    .pipe(gulp.dest('build/'));
});



gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "build/index/"
        }
    });
});

const path = {
    src: {
        html: 'src/pages/**/*.html',
        js: 'src/pages/**/*.js',
        style: 'src/components/**/*.+(css|scss|sass)',
        images: 'src/components/**/img/*.+(png|jpg|gif|svg)',
    },
    build: {
        html: 'build/',
        js: 'build/',
        css: 'build/stylesheets',
        images: 'build/img/',
    },
    watch: {
        html: 'src/**/**/*.html',
        js: 'src/**/**/*.js',
        style: 'src/**/*.+(css|scss|sass)',
        images: 'src/components/**/img/*.+(png|jpg|gif|svg)',
    },
    clear: 'build/'
};


//
// gulp.task('js', function () {
//     gulp.src(path.src.js)
//         .pipe(plumber({
//             errorHandler: notify.onError("Error: <%= error.message %>")
//         }))
//         .pipe(rigger())
//         // .pipe(uglify())
//         .pipe(minify({
//             ext:{

//                 src:'s',
//                 min:'.js'
//             },
//         }))
//         .pipe(gulp.dest(path.build.js));
//     browserSync.reload();
// });

gulp.task('html', function () {
    gulp.src(path.src.html)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html));
    browserSync.reload();
});

gulp.task('images', function () {
    gulp.src(path.src.images)
        .pipe(plumber({
            errorHandler: notify.onError("Error: <%= error.message %>")
        }))
        .pipe(flatten())
        .pipe(gulp.dest(path.build.images));
    browserSync.reload();
});

gulp.task('clean', function () {
    return gulp.src(path.clear, {
            read: false
        })
        .pipe(clean());
});

gulp.task('build', [
    'style',
    'html',
    'images',
    'browser-sync',
    'watch',
    // 'js'
]);

gulp.task('default', ['watch',
    // 'browser-sync'
    ]
);

gulp.task('watch', function () {
    gulp.watch(path.watch.style, ['style']);
    gulp.watch(path.watch.images, ['images']);
    gulp.watch(path.watch.html, ['html']);
    // gulp.watch(path.watch.js, ['js']);
});