angular.module('app.controllers', [])

  
.controller('logConsumptionCtrl', ['$scope', 'Camera', '$http','$window','foodService','$state',// The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, Camera, $http, $window, foodService,$state) {

	$scope.takePicture = function (options) {
	
      var options = {
         quality : 75,
         targetWidth: 300,
         targetHeight: 175,
         sourceType: 1,
         saveToPhotoAlbum: true,
         destinationType: navigator.camera.DestinationType.DATA_URL,
         encodingType: navigator.camera.EncodingType.JPEG
         // destinationType: Camera.DestinationType.FILE_URI
      };

      Camera.getPicture(options).then(function(imageData) {
      	 
         //$scope.imgURI = "data:image/jpeg;base64,"+imageData;
         $scope.imgURI = imageData;
         //let base64Image = 'data:image/jpeg;base64,' + imageData;
         console.log("getting picture from the camera"+imageData);
         // $scope.placeholder = document.getElementById("placeholderImage2");
         // $scope.placeholder.src = imageData;
         $scope.placeholder2 = "data:image/jpeg;base64,"+imageData;


         //$scope.
         //$scope.image = Camera.getPicture(imageData);
         //refreshMedia.refresh();
     //     var options = new FileUploadOptions();
	    // options.fileKey = "file";
	    // options.fileName = fileURI.substr(fileURI.lastIndexOf('/') + 1);
	    // options.mimeType = "image/jpeg";
	    // options.params = {}; // if we need to send parameters to the server request
	    // var ft = new FileTransfer();
	    // ft.upload(fileURI, encodeURI("http://host/upload"), win, fail, options);
 
      }, function(err) {
         console.log(err);
      });
		
   };

   	$scope.pickPicture = function (options) {
	
      var options = {
         quality : 75,
         targetWidth: 300,
         targetHeight: 175,
         sourceType: 0,
         destinationType: navigator.camera.DestinationType.DATA_URL,
         encodingType: navigator.camera.EncodingType.JPEG,
         correctOrientation: true

      };

      Camera.getPicture(options).then(function(imageData) {
      	 console.log("getting picture from the camera");
         $scope.imgURI = imageData;
         console.log("image data is:"+imageData);
         // var placeholder = document.getElementById("placeholderImage2");
         // placeholder.src = imageData;
         $scope.placeholder2 = "data:image/jpeg;base64,"+imageData;
         //$scope.image = $scope.foodImg;
         //console.log("food imah"+$scope.foodImg);

         //refreshMedia.refresh();
 
      }, function(err) {
         console.log(err);
      });
		
   };

   $scope.getBase64Image = function(img) {
		    // Create an empty canvas element
		    var canvas = document.createElement("canvas");
		    canvas.width = img.width;
		    canvas.height = img.height;

		    // Copy the image contents to the canvas
		    var ctx = canvas.getContext("2d");
		    ctx.drawImage(img, 0, 0);

		    // Get the data-URL formatted image
		    // Firefox supports PNG and JPEG. You could check img.src to
		    // guess the original format, but be aware the using "image/jpg"
		    // will re-encode the image.
		    var dataURL = canvas.toDataURL("image/png");

		    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
	};


	$scope.getFileContentAsBase64 = function(path,callback){
    window.resolveLocalFileSystemURL(path, gotFile, fail);
            
    function fail(e) {
          alert('Cannot found requested file');
    }

    function gotFile(fileEntry) {
           fileEntry.file(function(file) {
              var reader = new FileReader();
              reader.onloadend = function(e) {
                   var content = this.result;
                   callback(content);
              };
              // The most important point, use the readAsDatURL Method from the file plugin
              reader.readAsDataURL(file);
           });
    }
}

$scope.saveToFile = function(imageUrl) {

      function makeid() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i=0; i < 5; i++) {
          text += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return text;
      }

      var name = imageUrl.substr(imageUrl.lastIndexOf('/') + 1);
      var namePath = imageUrl.substr(0, imageUrl.lastIndexOf('/') + 1);
      var newName = makeid() + name;

      $cordovaFile.copyFile(namePath, name, cordova.file.dataDirectory, newName)
        .then(function(info){
          //
        }, function(e){
          //
        });
  },



    $scope.saveFood = function () {
	
     	
        console.log("in save food");

        //var selectedImage = document.getElementById("foodImage");

		// var c = document.getElementById("myCanvas");
		// var ctx = c.getContext("2d");
		// var selectedImage = angular.element(document.getElementById("foodImage"));  //HTTPImageElement
		// ctx.drawImage(selectedImage, 10, 10);
		// alert(c.toDataURL());
		//console.log("u is:"+document.getElementById("foodImage").src);

		//var path = document.getElementById("foodImage").src;
		//save the above image instead of cache to gallery
		//$scope.saveToFile(path);
		// $scope.getFileContentAsBase64(path,function(base64Image){
		//   //window.open(base64Image);
		//   console.log(base64Image); 
		//   // Then you'll be able to handle the myimage.png file as base64
		// });
		//var dataUrl = $cordovaFile.readAsDataURL(path);
		//console.log(dataUrl);
		var path = $scope.imgURI;

		$scope.result = "";
		$http.defaults.headers.post["Content-Type"] = 'application/x-www-form-urlencoded; charset=UTF-8';
		var req = {
		        method : 'POST',
		        //url : 'http://54.145.236.33/api/classifier',
		        url: 'http://54.85.15.53/api/classifier',
		        headers: {'Content-Type' : 'applicat	ion/x-www-form-urlencoded; charset=UTF-8'}, 
				data : {"image":  path}
		}

		$http(req).success(function(data, status, headers,config){
			console.log("sucess!"+status);
			console.log("sucess!"+data);
			foodService.set(data);
			$state.go('chooseTheBestFit', {foods: data});
			//$window.location.href = '/page10';
		}).error(function(data, status, headers,config){
			console.log("blah"+status);
			console.log("blah"+path);
		});

		

		// $http.post('http://54.145.236.33/api/classifier',document.getElementById("foodImage").src)
		// .success(function(data, status, headers,config){
		//   console.log('data success');
		//   console.log(data); // for browser console
		//   $scope.result = data; // for UI
		// })
		// .error(function(data, status, headers,config){
		//   console.log('data error'+status+data);
		// })
		// .then(function(result){
		//   // things = result.data;2
		// });
		
   };

}])
   
.controller('whatShouldIEatCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('personalFoodProfileCtrl', ['$scope', '$stateParams','$http','healthService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, $http,healthService) {

		$scope.ate = healthService.get();
		var req = {
		        method : 'GET',
		        //url : 'http://54.145.236.33/api/classifier',
		        url: 'http://54.85.15.53/api/nutrients?label='+$scope.ate,
		}

		$http(req).success(function(data, status, headers,config){
			console.log("sucess!"+status);
			console.log("sucess!"+JSON.stringify(data));
			$scope.label = data[0].label;
			var nutrients = data[0].nutrients;
			var moreNutrients = nutrients[0].nutrients;
			$scope.sugar = moreNutrients[0].value;
			$scope.fat = moreNutrients[1].value;
			$scope.carbs = moreNutrients[2].value;
			$scope.energy = moreNutrients[3].value;
			// $scope.myJsonContents = MyJsonService.get({file: 'myFile'});
			// console.log("json filee"+JSON.stringify($scope.myJsonContents));
			//$scope.sugar = data[0].nutrients[0];
			//console.log("label is"+$scope.label);
			//console.log("sugarr is"+moreNutrients[0].value);
		}).error(function(data, status, headers,config){
			console.log("blah"+status);
			console.log("blah"+path);
		});


}])
      
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('chooseYourFoodPreferencesCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('chooseYourGoalsCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])

.controller('chooseTheBestFitCtrl', ['$scope', '$stateParams','foodService','$state','healthService', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams, foodService,$state,healthService) {
		$scope.foodChoices = foodService.get();
		$scope.foodNames = [];
		$scope.foodPercents = [];
		var i = 0;
		//var array = $scope.foodChoices.split(',');
		angular.forEach($scope.foodChoices,function(value,index){
			$scope.foodNames[i] = value[0];
			$scope.foodPercents[i]=value[1];
			i++;
		})

		$scope.chooseMatch = function() {
			console.log("entering choose Match");
			healthService.set($scope.choice);
		    $state.go('personalFoodProfile', {selectedFood: $scope.choice});
		};
		

}])
 