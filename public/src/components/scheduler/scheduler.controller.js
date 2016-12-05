(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('SchedulerController', SchedulerController);

	SchedulerController.$inject = ['$scope', '$firebaseArray', '$firebaseObject', '$state', 'ngToast'];

	function SchedulerController($scope, $firebaseArray, $firebaseObject, $state, ngToast) {

		(function initializeController() {
			const ref = firebase.database().ref().child("events");
			$scope.events = $firebaseArray(ref);
		}());

		$scope.alertEventOnClick = function (date, jsEvent, view) {
			$scope.selectedEvent = $scope.events.$getRecord(date.$id);
		};

		$scope.alertOnDrop = function (event, delta, revertFunc, jsEvent, ui, view) {
			updateEvent(event);
		};

		$scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
			updateEvent(event);
		};

		function updateEvent(event) {
			const realEvent = $scope.events.$getRecord(event.$id);
			realEvent.start = event.start._d.toJSON();
			realEvent.end = event.end._d.toJSON();
			$scope.events.$save(realEvent);
		}

		$scope.scheduler = {
			eventSources: [$scope.events],
			config: {
				editable: true,
				header: {
					left: 'month agendaWeek',
					center: 'title',
					right: 'today prev,next'
				}
				,
				eventClick: $scope.alertEventOnClick,
				eventDrop: $scope.alertOnDrop,
				eventResize: $scope.alertOnResize

			}
		};

		$scope.deleteEvent = function (eventId) {
			const ref = firebase.database().ref().child("events").child(eventId);

			$firebaseObject(ref).$remove().then(function (ref) {
				ngToast.success("Séance supprimé !");
				$scope.selectedEvent = null;
			}, function (error) {
				ngToast.danger("Une erreur est survenue. Veuillez reesayer");
			});
		};

		$scope.openNewEvent = function () {
			$state.go("newEvent");
		};
	}
})();