(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('EventViewController', EventViewController);

	EventViewController.$inject = ['$scope', '$rootScope', '$stateParams', '$state', '$firebaseObject', 'ngToast'];

	function EventViewController($scope, $rootScope, $stateParams, $state, $firebaseObject, ngToast) {

		(function initializeController() {
			if ($stateParams.eventId === undefined || $stateParams.eventId === null || $stateParams.eventId === "") {
				$state.go('scheduler');
			}
			else {
				const ref = firebase.database().ref().child("events").child($stateParams.eventId);

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

		$scope.delete = function () {
			const ref = firebase.database().ref().child("events").child($stateParams.eventId);

			$rootScope.pageLoading = true;

			$firebaseObject(ref).$remove().then(function(ref) {
				$state.go('calendar');
				$rootScope.pageLoading = false;
				ngToast.success("Séance supprimé !");
			}, function(error) {
				ngToast.danger("Une erreur est survenue. Veuillez reesayer");
				$rootScope.pageLoading = false;
			});
		};
	}
})();