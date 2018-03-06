const gulp = require('gulp')
const inject = require('gulp-inject')
const cssnano = require('gulp-cssnano')
const server = require('browser-sync').create()

gulp.task(build)
gulp.task(watch)
gulp.task(serve)

gulp.task('dev', gulp.parallel(watch, serve))
gulp.task('default', gulp.parallel(watch, serve))

function serve() {
   server.init({server: true})
}

function build() {
   const getContents = function (filePath, file) {
      return file.contents.toString('utf8')
   }

   gulp.src('./src/index.html')
      .pipe(inject(gulp.src('./src/minireset.css'), {
         starttag: '<!-- inject:css:minireset -->',
         relative: true,
         removeTags: true,
         transform: getContents,
      }))
      .pipe(inject(gulp.src('./src/index.css').pipe(cssnano()), {
         starttag: '<!-- inject:css:index -->',
         relative: true,
         removeTags: true,
         transform: getContents,
      }))
      .pipe(gulp.dest('./'))
}

function watch() {
   gulp.watch(['./src/*.css', './src/*.html']).on('all', function() {
      build()
      server.reload()
   });
}