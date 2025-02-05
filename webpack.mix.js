const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | php -S localhost:8000 -t public
 | npm run watch
 | npm run dev
 |
 */

mix
    // .js('resources/js/app.js', 'public/js')
    .copy('resources/js/*.js', 'public/js')
    .styles(['resources/css/minireset.css', 'resources/css/app.css'], 'public/css/app.css')
    .css('resources/css/auth.css', 'public/css/auth.css')
    .copy('resources/img', 'public/img')
    .copy('resources/txt', 'public/txt')
    .browserSync('http://localhost:8000')

if (mix.inProduction()) {
    mix.version();
}
