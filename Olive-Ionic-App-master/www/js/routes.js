angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('tabsController.logConsumption', {
    url: '/page2',
    views: {
      'tab1': {
        templateUrl: 'templates/logConsumption.html',
        controller: 'logConsumptionCtrl'
      }
    }
  })

  .state('tabsController.whatShouldIEat', {
    url: '/page3',
    views: {
      'tab2': {
        templateUrl: 'templates/whatShouldIEat.html',
        controller: 'whatShouldIEatCtrl'
      }
    }
  })

  .state('personalFoodProfile', {
    url: '/page4',
        templateUrl: 'templates/personalFoodProfile.html',
        controller: 'personalFoodProfileCtrl'
  })

  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('login', {
    url: '/page5',
    templateUrl: 'templates/login.html',
    controller: 'loginCtrl'
  })

  .state('signup', {
    url: '/page6',
    templateUrl: 'templates/signup.html',
    controller: 'signupCtrl'
  })

  .state('chooseYourFoodPreferences', {
    url: '/page8',
    templateUrl: 'templates/chooseYourFoodPreferences.html',
    controller: 'chooseYourFoodPreferencesCtrl'
  })

  .state('chooseYourGoals', {
    url: '/page9',
    templateUrl: 'templates/chooseYourGoals.html',
    controller: 'chooseYourGoalsCtrl'
  })

  .state('chooseTheBestFit', {
    url: '/page10',
    templateUrl: 'templates/chooseTheBestFit.html',
    controller: 'chooseTheBestFitCtrl'
  })

$urlRouterProvider.otherwise('/page5')

  

});