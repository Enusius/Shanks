(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('EventViewController', EventViewController);

	EventViewController.$inject = ['$scope', '$rootScope', '$stateParams', '$state', '$firebaseObject', 'ngToast'];

	function EventViewController($scope, $rootScope, $stateParams, $state, $firebaseObject, ngToast) {

		(function initializeController() {
			if ($stateParams.eventId === undefined || $stateParams.eventId == null || $stateParams.eventId == "") {
				$state.go('scheduler');
			}
			else {
				var ref = firebase.database().ref().child("events").child($stateParams.eventId);

				$rootScope.pageLoading = true;

				$firebaseObject(ref).$loaded(
					function (data) {
						$rootScope.pageLoading = false;
						$scope.event = data;
					},
					function (error) {
						$rootScope.pageLoading = false;
						ngToast.danger(error);
					}
				);
			}
		})();

		$scope.edit = function () {
			$state.go('editEvent', {eventId: $stateParams.eventId});
		};
	}
})();