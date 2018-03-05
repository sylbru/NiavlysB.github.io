const gulp = require('gulp')
const inject = require('gulp-inject')
const cssnano = require('gulp-cssnano')

gulp.task('build', build)

function build(done) {
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
      
   done()
}

gulp.task('watch', function () {
   gulp.watch(['./src/*.css', './src/*.html']).on('change', function () {
      build();
   });
})