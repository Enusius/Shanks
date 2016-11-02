(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('EventAssistantController', EventAssistantController);

	EventAssistantController.$inject = ['$scope', '$rootScope', '$stateParams', '$state', '$firebaseObject', 'ngToast', '_'];

	function EventAssistantController($scope, $rootScope, $stateParams, $state, $firebaseObject, ngToast, _) {

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

						_.each($scope.event.trainingContent.exercises, function(exercise){
							exercise.currentSet = 0;
						});

						$scope.currentExercise = 0;
					},
					function (error) {
						$rootScope.pageLoading = false;
						ngToast.danger(error);
					}
				);
			}
		})();

		$scope.nextExercise = function()
		{
			$scope.currentExercise++;
		};

		$scope.previousExercise = function()
		{
			$scope.currentExercise--;
		};

		$scope.nextSet = function(exercise){
			exercise.currentSet++;
		};

		$scope.previousSet = function(exercise){
			exercise.currentSet--;
		};

		$scope.startTraining = function(exercise)
		{
			exercise.sets[exercise.currentSet]
		}

	}
})();