const gulp = require("gulp");
const notify = require("gulp-notify");
const plumber = require("gulp-plumber");
const paths = require("../paths");

const php = () => {
  return gulp
    .src([paths.src.php])
    .pipe(
      plumber({
        errorHandler: function (error) {
          // if error in dev mode
          notify.onError({
            title: "PHP",
            message: "Error: <%= error.message %>",
          })(error);

          // if error in production mode
          if (mode.production()) {
            console.error(`❌ Error: [PHP] ${error.message}`);
            process.exit(1);
          }
        },
      }),
    )
    .pipe(gulp.dest(paths.build.php));
};

module.exports = php;
