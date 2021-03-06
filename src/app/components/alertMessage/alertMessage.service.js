(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .factory('alertMessage', alertMessage);

  /** @ngInject */
  function alertMessage(
    $log
  ) {
    var service = {
      convertToValidationDanger: convertToValidationDanger,
      convertToDanger: convertToDanger
    };

    return service;

    function convertToValidationDanger(errors) {
      $log.debug("convertToValidationDanger()");

      var data = [];

      angular.forEach(errors, function(messages, fieldName) {
        var item = {
          field: fieldName,
          message: []
        };

        messages.forEach(function(message) {
          item.message.push('alert.danger.' + message);
        });

        this.push(item);
      }, data);

      var danger = {
        type: 'danger',
        data: data
      };

      return danger;
    }

    function convertToDanger(errors) {
      $log.debug("convertToDanger()");

      var message = [];

      errors.forEach(function(item) {
        message.push('alert.danger.' + item);
      });

      var danger = {
        type: 'danger',
        data: {
          message: message
        }
      };

      $log.debug(danger);

      return danger;
    }
  }
})();
