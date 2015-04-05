// Karma configuration
// Generated on Wed Apr 01 2015 12:36:20 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
        '../../bower_components/angular/angular.js',
        '../../bower_components/angular-mocks/angular-mocks.js',
        '../../bower_components/angular-resource/angular-resource.js',
        '../../bower_components/angular-route/angular-route.js',
        '../../bower_components/lodash/lodash.js',
        './app.js',
        './controllers/*.js',
        './directives/*.js',
        './services/*.js',
        './*.js',
        './test/*.js',
        './test/**/*.js'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: false
  });
};
