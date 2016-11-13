var gulp=require('gulp');
var jshint=require('gulp-jshint');
var jsFiles=['*.js','src/**/*.js'];
var jscs=require('gulp-jscs');
var nodemon=require('nodemon');

gulp.task('style',function(){

   return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish',{
        verbose:true
    }))
   .pipe(jscs());
});

gulp.task('inject',function(){
   var wiredep=require('wiredep').stream;
    var inject=require('gulp-inject');
    var srcFiles=gulp.src(['./public/css/*.css','./public/js/*.js'],{
        read:false
    });
    var injectOptions={
        ignorePath:'/public'
    };
    var wdOptions={
        boverJson:require('./bower.json'),
        directory:'./public/lib',
        ignorePath:'../../public'

    };
    return gulp.src('./src/views/*.jade')
    .pipe(wiredep(wdOptions))
    .pipe(inject(srcFiles,injectOptions))
    .pipe(gulp.dest('./src/views'));

});

gulp.task('serve',['style','inject'],function(){

    var options={
      script:'app.js',
        delayTime:1,
        env:{
            PORT:3500
        },
        watch:jsFiles
    };

    return nodemon(options)
    .on('restart',function(ev){
        console.log('restarted....');
    });
});
