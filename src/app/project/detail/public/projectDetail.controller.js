(function() {
  'use strict';
  'use alasql';


  angular
    .module('vmsFrontend')
    .controller('ProjectDetailController', ProjectDetailController);

  /** @ngInject */
  function ProjectDetailController(
    $log,
    $state,
    $stateParams,
    vmsClient,
    project,
    PERMISSION_OPTIONS) {
    var vm = this;
    vm.permissionOptions = PERMISSION_OPTIONS;

    vm.projectId = $stateParams.id;

    angular.element(document).ready(getProject(vm.projectId));
    angular.element(document).ready(getProjectMembers(vm.projectId));

    vm.isGuest = function() {
      if (angular.isDefined(vm.project)) {
        return vm.meta.role.name == 'guest';
      }

      return false;
    };

    vm.isCreator = function() {
      $log.debug('isCreator()');
      if (angular.isDefined(vm.project)) {
        return vm.meta.role.name == 'creator';
      }

      return false;
    };

    vm.isMember = function() {
      if (angular.isDefined(vm.project)) {
        return vm.meta.role.name == 'member';
      }

      return false;
    }

    vm.attend = function() {
      var onSuccess = function(response) {
        $log.debug('attendProject() success');
        $state.reload();
      };
      var onFailure = function(response) {
        $log.debug('attendProject() failure');
      }

      vmsClient.attendProject(vm.projectId)
        .then(onSuccess)
        .catch(onFailure);
    }

    vm.psp = function(){

      var onSuccess = function(response) {
        console.log("try================");
        //console.log(response);
        console.log(response.data);
        
        //console.log(response.data.data.length);
        var tmp = [{
        name: "John Smith",
        email: "j.smith@example.com",
        dob: "1985-10-10"
    }, {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        dob: "1988-12-22"
    }, {
        name: "Jan Smith",
        email: "jan.smith@example.com",
        dob: "2010-01-02"
    }, {
        name: "Jake Smith",
        email: "jake.smith@exmaple.com",
        dob: "2009-03-21"
    }, {
        name: "Josh Smith",
        email: "josh@example.com",
        dob: "2011-12-12"
    }, {
        name: "Jessie Smith",
        email: "jess@example.com",
        dob: "2004-10-12"
    }];



    //var opts = [{sheetid:'One',header:true},{sheetid:'Two',header:false}];

    var data1 = [{a:1,b:10},{a:2,b:20}];
    var data2 = [{a:100,b:10},{a:200,b:20}];
    var opts = [{sheetid:'One',header:true},{sheetid:'Two',header:false}];
    var res = alasql('SELECT INTO XLSX("restest344b.xlsx",?) FROM ?',
                     [opts,[tmp,data2]]);
        //alasql('SELECT * INTO XLSX("john.xlsx",{headers:true}) FROM ?',[opts,[tmp,response.data.data[0]]]);
        //var res = alasql('SELECT INTO XLSX("restest344b.xlsx",?) FROM ?',[opts,[tmp,response.data.data[0]]]);
        console.log("done================");
        console.log(typeof(response.data));
          console.log("done twice================");
        $log.debug('psp() success');
        $state.reload();
      };
      var onFailure = function(response) {
        $log.debug('psp() failure');
      }
      window.alert(vm.projectId);
      project
        .getMembers(vm.projectId)
        .then(onSuccess)
        .catch(onFailure);
    }

    function getProject(id) {
      $log.debug("getProject()");

      var onSuccess = function(value) {
        vm.project = value.data;
        vm.meta = value.meta;
      };
      var onFailure = function(response) {
        $log.debug(response);
      };

      project
        .getById(id)
        .then(onSuccess)
        .catch(onFailure);
    }

    function getProjectMembers(id) {
      var onSuccess = function(response) {
        vm.membersList = response.data;
        $log.debug(response.data);
      };
      var onFailure = function(response) {
        $log.debug(response);
      };

      vmsClient.getProjectMembers(id)
        .then(onSuccess)
        .catch(onFailure);
    }
  }
})();
