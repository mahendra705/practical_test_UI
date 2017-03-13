
var app = angular.module('testApp', ['ngRoute', 'ngResource', 'LocalStorageModule', 'ui.grid', 'ui.grid.pagination']);


//Application Confugiration && Routing
app.config(function ($routeProvider, $httpProvider) {
  $routeProvider

    .when('/', {
      templateUrl: 'pages/login.html',
      controller: 'LoginController'
    })

    .when('/video', {
      templateUrl: 'pages/video.html',
      controller: 'VideoController'
    })

    .otherwise({ redirectTo: '/' });


  //Intercepting Requests
  //Push Bearer token in each requests
  $httpProvider.interceptors.push(['$q', '$location', 'localStorageService', function ($q, $location, localStorageService) {
    return {
      'request': function (config) {
        config.headers = config.headers || {};
        if (localStorageService.get('userDetails') != null && localStorageService.get('userDetails').token) {
          config.headers.Authorization = 'Bearer ' + localStorageService.get('userDetails').token;
        }
        return config;
      },
      'responseError': function (response) {
        if (response.status === 401 || response.status === 403) {
          alert('You are not authorize to access this page!');
          $location.path('/login');
        }
        return $q.reject(response);
      }
    };
  }]);
});

//app constants for global use
app.constant('appConstants',
  {
    appUri: 'http://localhost:8080/api1'
  }
);
