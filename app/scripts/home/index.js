/* ====================================
 *  home/index.js
 * ===================================== */

'use strict';

angular.module('home', [
  'ui.router',
  'ui.bootstrap'
])
.config(function($stateProvider) {
  $stateProvider
    .state('user', {
      url: '/user',
      template: '<div ui-view=""></div>',
      abstract: true
    })
    .state('user.notifications', {
      url: '/notifications',
      controller: 'HomeController',
      templateUrl: '/scripts/home/notifications.html'
    })
    .state('user.account', {
      url: '/account',
      templateUrl: '/scripts/home/account.html',
      controller: function($scope) {
        console.log('loading user.account controller');
      },
      resolve: {
        currentUser: function(UserService) {
          return UserService.getCurrentUser();
        }
      }
    })
    .state('user.account.views', {
      url: '/views',
      views: {
        profile: {
          template: '<h3>Profile</h3>',
          controller: function($scope, currentUser) {
            $scope.user = currentUser;
          }
        },
        password: {
          template: '<h3>Password</h3>'
        },
        dropbox: {
          template: '<h3>Dropbox</h3>'
        }
      }
    });
})
.controller('HomeController', function($scope, $modal, $log, greeter) {


  $scope.items = ['item1', 'item2', 'item3'];

  $scope.open = function (size, view) {

    var modalInstance = $modal.open({
      templateUrl: view,
      controller: ModalInstanceController,
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };



  console.log(greeter.greet('Dane'));
})
.service('UserService', function($timeout) {
  var user = {
    email: 'dane@averyfakeemailaddress.com',
    name: 'Dane'
  };
  this.getCurrentUser = function() {
    return $timeout(function() {
      return user;
    }, 250);
  };
});

var ModalInstanceController = function($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

};
