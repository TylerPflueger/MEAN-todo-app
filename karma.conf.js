// Karma configuration
// Generated on Sun Apr 05 2015 21:28:27 GMT-0500 (CDT)

module.exports = function(config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/lodash/lodash.js',
      'public/javascripts/app.js',
      'public/javascripts/controllers/*.js',
      'public/javascripts/directives/*.js',
      'public/javascripts/services/*.js',
      'public/javascripts/*.js',
      'public/javascripts/test/*.js',
      'public/javascripts/test/**/*.js'
    ],
    exclude: [
        'karma.conf.js'
    ],
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['PhantomJS'],
    singleRun: false
  });
};
