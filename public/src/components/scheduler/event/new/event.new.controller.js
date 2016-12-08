(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('EventCreateController', EventCreateController);

	EventCreateController.$inject = ['$scope', '$stateParams', '$state', '$firebaseArray', '$firebaseObject', 'ngToast'];

	function EventCreateController($scope, $stateParams, $state, $firebaseArray, $firebaseObject, ngToast) {

		(function initializeController() {
			$scope.event = {
				title: 'new workout',
				start: new Date().toJSON(),
				end: new Date().toJSON(),
				startsAt: new Date().toJSON(),
				endsAt: new Date().toJSON(),
				trainingContent: {
					exercises: []
				}
			};
		})();

		$scope.toggleCalendar = function($event, field, event) {
			$event.preventDefault();
			$event.stopPropagation();
			event[field] = !event[field];
		};

		$scope.save = function () {
			const ref = firebase.database().ref().child("events");
			$scope.events = $firebaseArray(ref);

			$scope.events
				.$add($scope.event)
				.then(function (ref) {
					$state.go('viewEvent', {eventId: $firebaseObject(ref).$id});
					ngToast.success("Sauvegarde reussi!");
				})
				.catch(function () {
					ngToast.danger("Une erreur est survenue. Veuillez reesayer");
				});
		};

		$scope.cancel = function () {
			$state.go('scheduler', {eventId: $stateParams.eventId});
		};
	}
})();