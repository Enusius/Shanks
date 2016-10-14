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
					},
					function (error) {
						$rootScope.pageLoading = false;
						ngToast.danger(error);
					}
				);
			}
		})();

		$scope.save = function () {
			$scope.event
				.$save()
				.then(function () {
					ngToast.success("Sauvegarde reussi!");
				})
				.catch(function () {
					ngToast.danger("Une erreur est survenue. Veuillez reesayer");
				});
		};

	}
})();