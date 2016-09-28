(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('SchedulerController', SchedulerController);

	SchedulerController.$inject = ['$scope', '$firebaseArray', '$state'];

	function SchedulerController($scope, $firebaseArray, $state) {

		(function initializeController(){
			var ref = firebase.database().ref().child("events");
			$scope.events = $firebaseArray(ref);
		}());

		$scope.alertEventOnClick = function (date, jsEvent, view) {
			$scope.selectedEvent = $scope.events.$getRecord(date.$id);
		};

		$scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
			updateEvent(event);
		};

		$scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
			updateEvent(event);
		};

		function updateEvent(event) {
			var realEvent = $scope.events.$getRecord(event.$id);
			realEvent.start = event.start._d.toJSON();
			realEvent.end = event.end._d.toJSON();
			$scope.events.$save(realEvent);
		}

		$scope.scheduler = {
			eventSources: [$scope.events],
			config: {
				editable: true,
				header: {
					left: 'month agendaWeek agendaDay',
					center: 'title',
					right: 'today prev,next'
				}
				,
				eventClick: $scope.alertEventOnClick,
				eventDrop: $scope.alertOnDrop,
				eventResize: $scope.alertOnResize

			}
		};

		$scope.openNewEvent = function(){
			$state.go("newEvent");
		}
	}
})();