(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('EventCreateController', EventCreateController);

	EventCreateController.$inject = ['$scope', '$stateParams', '$state', '$firebaseArray', '$firebaseObject', 'ngToast', 'moment', 'calendarConfig'];

	function EventCreateController($scope, $stateParams, $state, $firebaseArray, $firebaseObject, ngToast, moment, calendarConfig) {

		(function initializeController() {
			$scope.event = {
				title: 'new workouts',
				startsAt: moment().toDate(),
				endsAt: moment().toDate(),
				draggable: true,
				resizable: true,
				color: calendarConfig.colorTypes.info,
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

		function parseEventDate(event) {
			event.startsAt = event.startsAt.toJSON();
			event.endsAt = event.endsAt.toJSON();
		}

		$scope.save = function () {
			const ref = firebase.database().ref().child("events");
			$scope.events = $firebaseArray(ref);

			parseEventDate($scope.event);

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
			$state.go('calendar', {eventId: $stateParams.eventId});
		};
	}
})();