const {parallel,watch} = require('gulp');
const gulpSass = require('gulp-sass');
const browserSync = require('browser-sync').create();

function sass(){
    return src('./sass/*.scss')
    .pipe(gulpSass())
    .pipe(dest('./css/'))
    .pipe(browserSync.stream());
}


function browser(){
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
    watch('*.html').on('change',browserSync.reload);
}


function watcher(done){
    watch("./sass/style.scss", sass)
    browserSync.reload()
    done()
}

module.exports = {
    sass,
    browser : parallel(browser, watcher)
}