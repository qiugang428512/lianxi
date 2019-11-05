let gulp = require('gulp');
let ideModuleDir = "";
let workSpaceDir = "./";
let publishDir = "./../client_wxgame/";
let browserify = require(ideModuleDir + "browserify");
let source = require(ideModuleDir + "vinyl-source-stream");
let tsify = require(ideModuleDir + "tsify");
let concat = require(ideModuleDir + "gulp-concat");
let minify = require(ideModuleDir + 'gulp-minify');
let buffer = require(ideModuleDir + 'vinyl-buffer');
let del = require(ideModuleDir + "del");
let image = require(ideModuleDir + "gulp-image");

//打包自己添加的第三方库
gulp.task("otherlib", function () {
    return gulp.src(
        [
            workSpaceDir + "bin/libs/other/fairygui.min.js",
            workSpaceDir + "bin/libs/other/jszip.min.js",
            workSpaceDir + "bin/libs/other/mpsdk.min.js",
            workSpaceDir + "bin/libs/other/sprintf.js"
        ])
        .pipe(concat("mylibs.js"))
        .pipe(gulp.dest(publishDir + "libs"));
});

//打包引擎库
gulp.task("layalib", function () {
    return gulp.src(
        [
            workSpaceDir + "bin/libs/laya.core.js",
            workSpaceDir + "bin/libs/laya.html.js",
            workSpaceDir + "bin/libs/laya.ani.js",
            workSpaceDir + "bin/libs/laya.particle.js",
            workSpaceDir + "bin/libs/domparserinone.js"
        ])
        .pipe(concat("layalibs.js"))
        .pipe(minify({
            ext: {
                min: ".js"
            },
            noSource: true
        }))
        .pipe(gulp.dest(publishDir + "libs"))
});

//测试包-debug用
gulp.task("test", function () {
    return browserify({
        basedir: workSpaceDir,
        debug: true,
        entries: ['src/Main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(publishDir + "js"));//wxDevTool打开目录
});

//最小包-发布用
gulp.task("final", function () {
    return browserify({
        basedir: workSpaceDir,
        debug: false,
        entries: ['src/Main.ts'],
        cache: {},
        packageCache: {}
    })
        .plugin(tsify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(minify({
            ext: {
                min: ".js"
            },
            noSource: true
        }))
        .pipe(gulp.dest(publishDir + "js"));//wxDevTool打开目录
});

//复制res到wxDevTool打开目录
gulp.task("copyLocalRes", function (cb) {
    setTimeout(() => {//复制过快，及时是gulp.series也会引起流程问题，设置timeout避免
        console.log("copy res文件到wxDevTool打开目录");
        let destDir = publishDir + "res";
        gulp.src(workSpaceDir + "bin/res/**/*").pipe(gulp.dest(destDir));
    }, 200);
    cb();
});

//复制wxmin.js到wxDevTool打开目录
gulp.task("copyWxmini", function (cb) {
    setTimeout(() => {//复制过快，及时是gulp.series也会引起流程问题，设置timeout避免
        let destDir = publishDir + "libs";
        gulp.src(workSpaceDir + "bin/libs/laya.wxmini.js").pipe(gulp.dest(destDir));
    }, 200);
    cb();
});

//删除wxDevTool打开目录下的res
gulp.task("clearPublishRes", function (cb) {
    let destDir = publishDir + "res";
    del(destDir, { force: true });
    cb();
})

//删除wxDevTool打开目录下的res
gulp.task("clearPublishLib", function (cb) {
    let destDir = publishDir + "libs";
    del(destDir, { force: true });
    cb();
})

//删除wxDevTool打开目录下的js
gulp.task("clearPublishJs", function (cb) {
    let destDir = publishDir + "js";
    del(destDir, { force: true });
    cb();
})

// 压缩png，jpg
gulp.task("compressPng", function () {
    return gulp.src(workSpaceDir + "bin/res/**/*.png")
        .pipe(image({
            pngquant: true,			//PNG优化工具
            optipng: false,			//PNG优化工具
            zopflipng: true,		//PNG优化工具
            jpegRecompress: false,	//jpg优化工具
            mozjpeg: true,			//jpg优化工具
            guetzli: false,			//jpg优化工具
            gifsicle: false,		//gif优化工具
            svgo: false,			//SVG优化工具
            concurrent: 10,			//并发线程数
            quiet: true 			//是否是静默方式
            // optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
            // pngquant: ['--speed=1', '--force', 256],
            // zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
            // jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
            // mozjpeg: ['-optimize', '-progressive'],
            // guetzli: ['--quality', 85]
        }))
        .pipe(gulp.dest(workSpaceDir + "bin/res/"));
});

//内测版本,不排除bug

//重新生成资源,并压缩所有png图片
gulp.task("res", gulp.series('clearPublishRes', 'compressPng', 'copyLocalRes'));

//清理微信项目下所有代码和资源,并重新生成调试版本
gulp.task("clear", gulp.series('clearPublishJs', 'clearPublishLib', 'otherlib', 'layalib', 'copyWxmini', 'res', 'test'));

//重新生成可调试bundle.js(调试代码使用)
gulp.task("debug", gulp.series('test'));

//重新生成可发布bundle.js
gulp.task("pub", gulp.series('final'));

//发布正式资源和代码(版本发布使用)
gulp.task("publish", gulp.series('clearPublishJs', 'clearPublishLib', 'otherlib', 'layalib', 'copyWxmini', 'res', 'final'));