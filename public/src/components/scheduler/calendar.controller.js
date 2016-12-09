(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('CalendarController', CalendarController);

	CalendarController.$inject = ['$scope', '$firebaseArray', '$firebaseObject', '$state', 'ngToast', 'calendarConfig', '_'];

	function CalendarController($scope, $firebaseArray, $firebaseObject, $state, ngToast, calendarConfig, _) {

		(function initializeController() {
			const ref = firebase.database().ref().child("events");
			$scope.events = $firebaseArray(ref);
		}());


		$scope.$watch('events', function(events){
			_.each(events, function(event)
			{
				parseEventDateToDate(event);
			})
		}, true);

		function parseEventDateToDate(event) {
			event.startsAt = new Date(event.startsAt);
			event.endsAt = new Date(event.endsAt);
		}

		$scope.calendarView = 'week';
		$scope.viewDate = new Date();
		$scope.cellIsOpen = false;

		$scope.eventClicked = function (event) {
			$state.go('viewEvent', {eventId: event.$id});
		};

		$scope.eventEdited = function (event) {
			alert.show('Edited', event);
		};

		$scope.eventDeleted = function (event) {
			alert.show('Deleted', event);
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

		$scope.eventTimesChanged = function (event) {
			alert.show('Dropped or resized', event);
		};

		$scope.timespanClicked = function (date, cell) {

			if ($scope.calendarView === 'month') {
				if (($scope.cellIsOpen && moment(date).startOf('day').isSame(moment($scope.viewDate).startOf('day'))) || cell.events.length === 0 || !cell.inMonth) {
					$scope.cellIsOpen = false;
				} else {
					$scope.cellIsOpen = true;
					$scope.viewDate = date;
				}
			} else if ($scope.calendarView === 'year') {
				if (($scope.cellIsOpen && moment(date).startOf('month').isSame(moment($scope.viewDate).startOf('month'))) || cell.events.length === 0) {
					$scope.cellIsOpen = false;
				} else {
					$scope.cellIsOpen = true;
					$scope.viewDate = date;
				}
			}

		};

		$scope.addEvent = function() {
			$state.go("newEvent");
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