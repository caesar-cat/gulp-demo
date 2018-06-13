let gulp = require('gulp');
let del = require('del');
let rev = require('gulp-rev');
let cssmin = require('gulp-clean-css');
let autoprefixer = require('gulp-autoprefixer');
let less = require('gulp-less');
let uglify = require('gulp-uglify');
let useref = require('gulp-useref');
let imagemin = require('gulp-imagemin');
let spriter = require('gulp-css-spriter-dookay');
let revCollector = require('gulp-rev-collector');
let multiProcess = require('gulp-multi-process');
let browserSync = require('browser-sync').create();
let gulpSequence = require('gulp-sequence');
let uncss = require('gulp-uncss');
let htmlmin = require('gulp-htmlmin');

const baseConfig = {
    buildPath: './public/dist',
    srcPath: './public/src',
    tmpPath: './tmp',
    viewsPathProduction: './views_production',
    viewsPathLocal: './views_local'
}

//删除任务
gulp.task('del', function() {
    return del([baseConfig.buildPath, 'tmp']);
});

//处理html模板中的引用文件
gulp.task('useref', function() {
    return gulp.src(`${baseConfig.srcPath}/views/*.html`)
        .pipe(useref())
        .pipe(gulp.dest(`${baseConfig.tmpPath}/useref/views/`));
});

//图片压缩(普通图片不加版本号)
gulp.task('useref-img', function() {
    return gulp.src(`${baseConfig.srcPath}/img/**/*`)
        .pipe(imagemin())
        .pipe(gulp.dest(`${baseConfig.buildPath}/img/`));
});

//less编译
gulp.task('less', function() {
    return gulp.src(`${baseConfig.srcPath}/less/**/*`)
        .pipe(less())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(`${baseConfig.srcPath}/css/`))
})

//css文件压缩
gulp.task('min-css', function() {
    return gulp.src(`${baseConfig.srcPath}/css/*.css`)
        .pipe(cssmin({compatibility: 'ie8'}))
        .pipe(gulp.dest(`${baseConfig.tmpPath}/useref/css/`));
});

//生成雪碧图
gulp.task('sprite', function() {
    return gulp.src(`${baseConfig.srcPath}/css/**/*.css`)
        .pipe(spriter({
            'spriteSheet': `${baseConfig.srcPath}/img/common/spritesheet.png`,
            'pathToSpriteSheetFromCSS': '../img/common/spritesheet.png',
            matchReg:{
                pattern:"\.\.\/img\/icons\/"
            }
        }))
        .pipe(gulp.dest(`${baseConfig.srcPath}/css/`))
        .pipe(gulp.dest(`${baseConfig.tmpPath}/useref/css/`));
});


//css加版本号
gulp.task('rev-css', function() {
    return gulp.src(`${baseConfig.tmpPath}/useref/css/**/*.css`)
        .pipe(rev())
        .pipe(uncss({
            html: [`${baseConfig.viewsPathProduction}/*.html`],
        })).pipe(cssmin({compatibility: 'ie8'}))
        .pipe(gulp.dest(`${baseConfig.tmpPath}/rev/css/`))
        .pipe(rev.manifest())
        .pipe(gulp.dest(`${baseConfig.tmpPath}/rev/css/`));
});

//js加版本号
gulp.task('rev-js', function() {
    return gulp.src([`${baseConfig.srcPath}/js/*.js`])
        .pipe(rev())
        .pipe(uglify())
        .pipe(gulp.dest(`${baseConfig.tmpPath}/rev/js/`))
        .pipe(rev.manifest())
        .pipe(gulp.dest(`${baseConfig.tmpPath}/rev/js/`));
});

//分析resource-map, 分配资源到HTML start
gulp.task('build-css', function() {
    return gulp.src([`${baseConfig.tmpPath}/rev/css/**/*.css`])
        .pipe(gulp.dest(`${baseConfig.buildPath}/css/`));
});

gulp.task('build-js', function() {
    return gulp.src([`${baseConfig.tmpPath}/rev/js/*.js`])
        .pipe(gulp.dest(`${baseConfig.buildPath}/js/`));
});

gulp.task('build-img', function() {
    return gulp.src([`${baseConfig.srcPath}/img/*`])
        .pipe(gulp.dest(`${baseConfig.buildPath}/img/`))
})

gulp.task('build-view', function() {
    return gulp.src([`${baseConfig.viewsPathLocal}/*.html`])
        .pipe(gulp.dest(baseConfig.viewsPathProduction))
})

gulp.task('rev-collector-html', function() {
    return gulp.src([`${baseConfig.tmpPath}/rev/**/*.json`, `${baseConfig.viewsPathProduction}/*.html`])
        .pipe(revCollector({
            replaceReved: true,
            dirReplacements: {
                '/src/css': '/dist/css',
                '/src/js': '/dist/js',
            }
        }))
        .pipe(htmlmin({
            removeComments: true
        }))
        .pipe(gulp.dest(baseConfig.viewsPathProduction));
});
//分析resource-map, 分配资源到HTML end


// 静态服务器
gulp.task('bs', function() {
    gulp.watch(`${baseConfig.srcPath}/less/**/*.less`, function() {
        multiProcess(['less'], function() {});
    })
    browserSync.init({
        files: "**", //监听整个项目
        server: {
            baseDir: "./public/src"
        } 
    })
});

//生产构建
gulp.task('build', gulpSequence(
    'del', ['useref', 'useref-img'],
    'less', 'min-css', 'sprite', 'build-view', ['rev-js', 'rev-css'], ['rev-collector-html'], ['build-css'], ['build-js'], ['build-img']
));

//监听less编译
gulp.task('watch', function() {
    gulp.watch(`${baseConfig.srcPath}/less/*.less`, function() {
        multiProcess(['less'], function() {});
    })
})

