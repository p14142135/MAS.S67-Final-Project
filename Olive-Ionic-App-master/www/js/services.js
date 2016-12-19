angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('Camera', function($q) {

   return {
      getPicture: function(options) {
         var q = $q.defer();

         navigator.camera.getPicture(function(result) {
            q.resolve(result);
         }, function(err) {
            q.reject(err);
         }, options);

         return q.promise;
      }
   }

})

.factory('foodService', function() {
 var savedData = {}
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 }

})

.factory('healthService', function() {
 var savedData = {}
 function set(data) {
   savedData = data;
 }
 function get() {
  return savedData;
 }

 return {
  set: set,
  get: get
 }

})

// .factory('MyJsonService', function($resource) {
//   JSON.stringify($resource('/templates/myFile.json'));
//   return $resource('/templates/myFile.json', {myFile: '@file'});
// })

.service('BlankService', [function(){

}]);