(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('EventEditController', EventEditController);

	EventEditController.$inject = ['$scope', '$rootScope', '$stateParams', '$state', '$firebaseObject', 'ngToast'];

	function EventEditController($scope, $rootScope, $stateParams, $state, $firebaseObject, ngToast) {

		(function initializeController() {
			if ($stateParams.eventId === undefined || $stateParams.eventId == null || $stateParams.eventId == "") {
				ngToast.danger("Impossible de charger la page sans Id d'evenement");
			}
			else {
				const ref = firebase.database().ref().child("events").child($stateParams.eventId);

				$rootScope.pageLoading = true;

				$firebaseObject(ref).$loaded(
					function (data) {
						$rootScope.pageLoading = false;
						parseEventDateToDate(data);
						$scope.event = data;

					},
					function (error) {
						$rootScope.pageLoading = false;
						ngToast.danger(error);
					}
				);
			}
		})();

		$scope.toggleCalendar = function($event, field, event) {
			$event.preventDefault();
			$event.stopPropagation();
			event[field] = !event[field];
		};

		function parseEventDateToDate(event) {
			event.startsAt = new Date(event.startsAt);
			event.endsAt = new Date(event.endsAt);
		}

		function parseEventDateToString(event) {
			event.startsAt = event.startsAt.toJSON();
			event.endsAt = event.endsAt.toJSON();
		}

		function parseEventDate(event) {
			event.startsAt = event.startsAt.toJSON();
			event.endsAt = event.endsAt.toJSON();
		}

		$scope.save = function () {

			parseEventDateToString($scope.event);

			$scope.event
				.$save()
				.then(function () {
					$state.go('viewEvent', {eventId: $stateParams.eventId});
					ngToast.success("Sauvegarde reussi!");
				})
				.catch(function () {
					ngToast.danger("Une erreur est survenue. Veuillez reesayer");
				});
		};

		$scope.cancel = function () {
			$state.go('viewEvent', {eventId: $stateParams.eventId});
		};
	}
})();