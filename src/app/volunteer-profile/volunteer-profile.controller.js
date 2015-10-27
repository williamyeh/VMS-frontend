(function() {
    'use strict';

    angular
        .module('vmsFrontend')
        .controller('ProfileController', ProfileController);

    /** @ngInject */

    function ProfileController($uibModal, vmsClient, $log) {

        var vm = this;

        vm.open = function() {
            var modal = $uibModal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                controllerAs: 'vm'
            });
        }

        angular.element(document).ready(getProfile());

        function getProfile() {
            vmsClient.getProfile(function(response) {
                $log.debug("success");
                $log.debug(response);

                vm.profile = response;
            }, function(response) {
                $log.debug('error');
                $log.debug(response);
            })
        }

        /**vm.profile = {
            projects: {
                "href": "https://vms.app/api/users/me/projects"
            },
            processes: {
                "participating_number": 3,
                "participated_number": 8,
                "href": "https://vms.app/api/users/me/proccesses"
            },
            avatar_url: "/assets/images/profile-default-avatar.png",
            introduction: "I'm a genius. I work on Data science/analytics and have excellent skills with Matlab and Ruby programming. My hobbies is sporting.",
            username: "jimlin",
            first_name: "Lin",
            last_name: "Jim",
            birth_year: "1990/05/05",
            gender: "男",
            city: {
                "id": 1,
                "name_zh_tw": "臺北市",
                "name_en": "Taipei City"
            },
            address: "128 Academia Road, Section2, Nankang Dist.",




            phone_number: "0912345678",
            email: "jimlin@citi.sinica.edu.tw",
            emergency_contact: "Jeremy Lin",
            emergency_phone: "0919119119",

            experience: [{
                "id": 1,
                "name": "Academia Sinica",
                "job_title": "Research Assistant",
                "start_year": 2014,
                "end_year": null
            }],
            // education: {
            //     background: "Master's degree, Computer science",
            //     school: "NCKU",
            //     schoolDate: "2012-2014"
            // },
            education: [{
                "id": 1,
                "school": "National Cheng Kung University",
                "degree": 5,
                "field_of_study": "Computer Science",
                "start_year": 2012,
                "end_year": 2014
            }],
            skills: [{
                "name": "Swimming",
                "id": 82
            }, {
                "name": "Programming",
                "id": 73
            }],
            equipment: [{
                "name": "Car",
                "id": 21
            }, {
                "name": "Scooter",
                "id": 28
            }, {
                "name": "Camera",
                "id": 43
            }]

        };**/





    }

})();

angular.module('vmsFrontend').controller('ModalInstanceCtrl', function($uibModalInstance) {

    var vm = this;
    vm.remind = "提醒您，帳號刪除後無法再還原，如果您確定要刪除帳號。";

    vm.ok = function() {
        // alert(vm.password); //testing ng-model password
        $uibModalInstance.close();
    };

    vm.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
});
