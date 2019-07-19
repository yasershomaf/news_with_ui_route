angular.module('newsModule', ['ui.router'])
  .config(['$stateProvider', '$urlMatcherFactoryProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider.otherwise('/home');
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'Templates/home.html',
        controller: 'homeController',
        controllerAs: 'homeCtrl',
        resolve: {
          newsList: function($http) {
            return $http({
              method: 'GET',
              url: 'https://newsapi.org/v2/top-headlines',
              params: {
                apiKey: 'd64511a0d5c2408f8f8f5ae1ff72c38b',
                country: 'nl',
                pageSize: 100,
                page: 1
              }
            })
              .then(function(res) {
                return res.data
              });
          }
        }
      })
      .state('about', {
        url: '/about',
        templateUrl: 'Templates/about.html',
        controller: 'aboutController',
        controllerAs: 'aboutCtrl'
      });
    $locationProvider.html5Mode(true);
  }])
  .controller('homeController', ['newsList', function(newsList) {
    this.newsList = newsList;
  }])
  .controller('aboutController', [function() {

  }]);