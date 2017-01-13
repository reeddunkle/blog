const gulp = require('gulp');
const sass = require('gulp-sass');
const shell = require('gulp-shell');

const logo = 'assets/images/logo.svg';
const touchDir = '_site/assets/images/touch';

gulp.task('clean', shell.task(['rm -rf _site']));

gulp.task('create-touch-dir', shell.task(['mkdir -p _site/assets/images/touch']));

gulp.task('generate-touch', ['create-touch-dir'],
  shell.task([16, 32, 144, 152, 192].map(size =>
    `convert -background none -density 512 -resize ${size}x ${logo} ${touchDir}/${size}x${size}.png`
  ))
);

gulp.task('sass', ['generate-touch'], () => gulp.src('./_sass/main.scss')
  .pipe(sass({includePaths: 'node_modules'}).on('error', sass.logError))
  .pipe(gulp.dest('./_site/assets'))
);

gulp.task('build', ['sass']);

gulp.task('serve', ['build'], shell.task(['bundle exec jekyll serve']));