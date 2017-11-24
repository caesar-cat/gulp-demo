var gulp = require('gulp');
var del = require('del');
var rev = require('gulp-rev');
var cssmin = require('gulp-clean-css');
var stylus = require('gulp-stylus');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var imagemin = require('gulp-imagemin');
var spriter = require('gulp-css-spriter');
var revCollector = require('gulp-rev-collector');
var browserSync = require('browser-sync').create();
var gulpSequence = require('gulp-sequence');
var uncss = require('gulp-uncss');
var htmlmin = require('gulp-htmlmin');

//删除任务
gulp.task('del', function() {
    return del(['dist', 'tmp']);
});

/**
 *  处理html模板中的引用文件
 **/
gulp.task('useref', function() {
    return gulp.src('./src/view/*.html')
        .pipe(useref())
        .pipe(gulp.dest('./tmp/useref/view/'));
});

/**
 *  图片压缩
 */
gulp.task('useref-img', function() {
    return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/img/'));
});

/**
 * stylus编译
 */
gulp.task('stylus', function() {
    return gulp.src('./src/stylus/**/*')
        .pipe(stylus())
        .pipe(gulp.dest('./src/css/'))
})

/**
 * css文件压缩
 */
gulp.task('min-css', function() {
    return gulp.src('./src/css/*.css')
        .pipe(cssmin({compatibility: 'ie8'}))
        .pipe(gulp.dest('./tmp/useref/css/'));
});

/**
 * 生成雪碧图
 */
gulp.task('sprite', function() {
    return gulp.src('./src/css/*.css')
        .pipe(spriter({
            'spriteSheet': './tmp/img/spritesheet.png',
            'pathToSpriteSheetFromCSS': '../img/spritesheet.png'
        }))
        .pipe(gulp.dest('./tmp/useref/css/'));
});


/*
 * css加版本号
 */
gulp.task('rev-css', function() {
    return gulp.src('./tmp/useref/css/*.css')
        .pipe(rev())
        .pipe(uncss({
            html: ['./tmp/**/*.html'],
        })).pipe(cssmin({compatibility: 'ie8'}))
        .pipe(gulp.dest('./tmp/rev/css/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./tmp/rev/css/'));
});

/*
 * js加版本号
 */
gulp.task('rev-js', function() {
    return gulp.src(['./src/js/*.js'])
        .pipe(rev())
        .pipe(uglify())
        .pipe(gulp.dest('./tmp/rev/js/'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./tmp/rev/js/'));
});

/**
 * 雪碧图加版本号 
*/
gulp.task('rev-spriter-img', function() {
    return gulp.src(['./tmp/img/spritesheet.png'])
    .pipe(rev())
    .pipe(gulp.dest('./tmp/rev/img/'))
    .pipe(rev.manifest())
    .pipe(gulp.dest('./tmp/rev/img/'));
})

/*
 * 分析resource-map, 分配资源到HTML
 */
gulp.task('build-css', function() {
    return gulp.src(['./tmp/rev/css/*.css'])
        .pipe(gulp.dest('./dist/css/'));
});

gulp.task('build-js', function() {
    return gulp.src(['./tmp/rev/js/*.js', ])
        .pipe(gulp.dest('./dist/js/'));
});

gulp.task('build-img', function() {
    return gulp.src(['./tmp/rev/img/*', './src/img/*'])
        .pipe(gulp.dest('./dist/img/'))
})

gulp.task('rev-collector-html', function() {
    return gulp.src(['./tmp/rev/**/*.json', './tmp/useref/view/*.html'])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                '../css': '/dist/css',
                '../js': '/dist/js',
            }
        }))
        .pipe(htmlmin({
            removeComments: true
        }))
        .pipe(gulp.dest('./dist/view/'));
});

gulp.task('rev-collector-spriter', function() {
    return gulp.src(['./tmp/rev/img/*.json', './tmp/rev/css/**.css'])
        .pipe(revCollector())
        .pipe(gulp.dest('./dist/css/'))
})


// 静态服务器
gulp.task('bs', function() {
    browserSync.init({
        files: "**", //监听整个项目
        server: {
            baseDir: "./src/"
        }
    });
});

// 代理
gulp.task('bsp', function() {
    browserSync.init({
        proxy: "你的域名或IP"
    });
});


//构建
gulp.task('build', gulpSequence(
    'del', ['useref', 'useref-img'],
    'stylus', 'min-css', 'sprite', ['rev-js', 'rev-css', 'rev-spriter-img'], ['rev-collector-html', 'rev-collector-spriter'], ['build-css'], ['build-js'], ['build-img']
));

gulp.task('default', ['bs'], function() {
    del(['tmp/']);
});
