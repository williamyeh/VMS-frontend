(function() {
  'use strict';

  angular
    .module('vmsFrontend')
    .controller('CreateProjectController', CreateProjectController);

  /** @ngInject */
  function CreateProjectController($log, $state, vmsClient, PERMISSION_OPTIONS) {
    var vm = this;
    vm.permissionOptions = PERMISSION_OPTIONS;
    vm.hyperlinks = [
      {
        name: '',
        link: ''
      }
    ];

    vm.create = function() {
      var value = {
        data: {
          type: 'projects',
          attributes: vm.project
        }
      };
      var onSuccess = function(response) {
        $log.debug('project create successfully');
        $log.debug(response);

        $log.debug('= projectId =');
        $log.debug(response.data.data.id);

        $state.go('projectDetail', {
          id: response.data.data.id
        });
      };
      var onFailure = function(response) {
        $log.error('project create failure');
        $log.error(response);
      };

      vmsClient.addProject(value).then(onSuccess).catch(onFailure);
    };
  }
})();
