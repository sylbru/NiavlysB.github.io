import gulp from 'gulp'
import inject from 'gulp-inject'
import cssnano from 'gulp-cssnano'
import browserSync from 'browser-sync'

const server = browserSync.create()

export const serve = function () {
   server.init({server: true})
}

export const build = function () {
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

export const watch = function () {
   gulp.watch(['./src/*.css', './src/*.html']).on('all', function() {
      build()
      server.reload()
   })
}

export const dev = gulp.parallel(watch, serve)
export default dev
