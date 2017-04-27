var app = angular.module('warsawStories',['ngRoute'])

app.directive('navbarWhite', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/navbar_white.html'
  };
});
app.directive('navbarTransparent', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/navbar_transparent.html'
  };
});
app.directive('landing', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/landing.html'
  };
});
app.directive('trips', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/trips/trips.html'
  };
});
app.directive('rentGuide', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/rentguide.html'
  };
});
app.directive('blogStories', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/blogstories/index.html'
  };
});
app.directive('contactForm', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/contact/contact_form.html'
  };
});
app.directive('foot', function(){
  return {
    restrict: 'E',
    templateUrl: '/templates/footer.html'
  };
});

app.config(['$routeProvider', function($routeProvider){
  $routeProvider

  .when('/main' , {
    templateUrl: './templates/main.html'
  })
  .when('/', {
    redirectTo: '/main'
  })
  .when('/blogstories', {
    templateUrl: './templates/blogstories/blog.html',
    controller: 'BlogStoriesController',
    controllerAs: 'blogStoriesCtrl'
  })
  .when('/blogstories/:storyId', {
    templateUrl: './templates/blogstories/article.html',
    controller: 'BlogStoriesController',
    controllerAs: 'blogStoriesCtrl'
  })
  .when('/trips', {
    templateUrl: './templates/trips/tripsy.html',
    controller: 'TripsPhotosController',
    controllerAs: 'tripsPhotosCtrl'
  })
  .when('/trips/:photoId', {
    templateUrl: './templates/trips/trip.html',
    controller: 'TripsPhotosController',
    controllerAs: 'tripsPhotosCtrl'
  })
  .when('/contact', {
    templateUrl: './templates/contact/index.html'
  })
  .otherwise({
    redirectTo: '/main'
  });
}])

//--------------------------
// TRIPS
//--------------------------
// Kontroler do rodzajow wycieczek.
app.controller('TripsPhotosController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
  var controller = this;
  $http({method: 'GET', url: '/jsondata/trips.json'}).success(function(data){
    $scope.photos = data;
    $scope.details = $routeParams.photoId;
  });
}])

//=========================
//BLOG STORIES
//=========================

//Kontroler do artykułow na blogu.
app.controller('BlogStoriesController', ['$scope', '$http','$routeParams', function($scope, $http, $routeParams) {
  var controller = this;
  $http({method: 'GET', url: '/jsondata/blogstories.json'}).success(function(data){
    $scope.stories = data;
    $scope.details = $routeParams.storyId;
  });
}]);

//=========================
//RENT GUIDE
//=========================

//Kontroler do scrolla do sekcji.
app.controller('ScrollController', ['$scope', '$location', '$anchorScroll', function($scope, $location, $anchorScroll) {
  $scope.gotoGuide = function() {
    // set the location.hash to the id of
    // the element you wish to scroll to.
    $location.hash('guide');

    // call $anchorScroll()
    $anchorScroll();
  };
}]);

//=========================
//JQUERY
//=========================
$(document).ready(function() {
    $(window).scroll( function(){

        $('.fadeInBlock').each( function(i){

            var bottom_of_object = $(this).position().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            /*Adjust the "200" to either have a delay or that the content starts fading a bit before you reach it*/
            bottom_of_window = bottom_of_window + 200;

            if( bottom_of_window > bottom_of_object ){

                $(this).animate({'opacity':'1'},400);

            }
        });

    });
});
