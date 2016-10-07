(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('EventAssistantController', EventAssistantController);

	EventAssistantController.$inject = ['$scope', '$rootScope', '$stateParams', '$state', '$firebaseObject', 'ngToast'];

	function EventAssistantController($scope, $rootScope, $stateParams, $state, $firebaseObject, ngToast) {

		(function initializeController() {
			if ($stateParams.eventId === undefined || $stateParams.eventId == null || $stateParams.eventId == "") {
				ngToast.danger("Impossible de charger la page sans Id d'evenement");
			}
			else {
				var ref = firebase.database().ref().child("events").child($stateParams.eventId);

				$rootScope.pageLoading = true;

				$firebaseObject(ref).$loaded(
					function (data) {
						$rootScope.pageLoading = false;
						$scope.event = data;
						$scope.currentSet = $scope.event.trainingContent.exercises[0].sets[0];
					},
					function (error) {
						$rootScope.pageLoading = false;
						ngToast.danger(error);
					}
				);
			}
		})();

	}
})();