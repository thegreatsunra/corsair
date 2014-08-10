/* ====================================
 *  app.js
 * ===================================== */

'use strict';

angular.module('myUIRouterApp', [
  'ui.router',
  'home'
])
.provider('greeter', function() {
  var salutation = 'Hello';
  this.setSalutation = function(s) {
    salutation = s;
  };

  function Greeter() {
    this.greet = function(a) {
      return salutation + ' ' + a;
    };
  }

  this.$get = function() {
    return new Greeter();
  };
})
.config(function($urlRouterProvider, greeterProvider) {
  $urlRouterProvider
    .otherwise('/user/notifications');
  greeterProvider.setSalutation('Ahoy');
});
