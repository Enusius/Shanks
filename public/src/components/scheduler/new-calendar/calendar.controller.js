(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('CalendarController', CalendarController);

	CalendarController.$inject = ['$scope', '$firebaseArray', '$firebaseObject', '$state', 'ngToast', 'calendarConfig'];

	function CalendarController($scope, $firebaseArray, $firebaseObject, $state, ngToast, calendarConfig) {

		(function initializeController() {
			const ref = firebase.database().ref().child("events");
			$scope.events = $firebaseArray(ref);
		}());

		//These variables MUST be set as a minimum for the calendar to work
		$scope.calendarView = 'month';
		$scope.viewDate = new Date();
		$scope.cellIsOpen = true;

		$scope.eventClicked = function (event) {
			alert.show('Clicked', event);
		};

		$scope.eventEdited = function (event) {
			alert.show('Edited', event);
		};

		$scope.eventDeleted = function (event) {
			alert.show('Deleted', event);
		};

		$scope.eventTimesChanged = function (event) {
			alert.show('Dropped or resized', event);
		};

		$scope.toggle = function ($event, field, event) {
			$event.preventDefault();
			$event.stopPropagation();
			event[field] = !event[field];
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
			$scope.events.push({
				title: 'New event',
				startsAt: moment().startOf('day').toDate(),
				endsAt: moment().endOf('day').toDate(),
				color: calendarConfig.colorTypes.important,
				draggable: true,
				resizable: true
			});
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