(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('EventAssistantController', EventAssistantController);

	EventAssistantController.$inject = ['$scope', '$rootScope', '$stateParams', '$state', '$firebaseObject', '$interval', 'ngToast', '_'];

	function EventAssistantController($scope, $rootScope, $stateParams, $state, $firebaseObject, $interval, ngToast, _) {

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

						_.each($scope.event.trainingContent.exercises, function (exercise) {
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

		$scope.nextExercise = function () {
			$scope.currentExercise++;
		};

		$scope.previousExercise = function () {
			$scope.currentExercise--;
		};

		$scope.nextSet = function (exercise) {
			exercise.currentSet++;
		};

		$scope.previousSet = function (exercise) {
			exercise.currentSet--;
		};

		$scope.startTraining = function (exercise) {
			snapShot(exercise);
			startPreTrainingTimer();

			var trainingInterval = $interval(function () {
				switch ($scope.period) {
					case 'active' :
						exercise.sets[exercise.currentSet].restAfter = exercise.sets[exercise.currentSet].originalRestAfter;
						exercise.sets[exercise.currentSet].rest = exercise.sets[exercise.currentSet].originalRest;
						exercise.sets[exercise.currentSet].duration--;
						if (exercise.sets[exercise.currentSet].duration == 0)
							$scope.period = 'passive';
						break;
					case 'passive' :
						exercise.sets[exercise.currentSet].duration = exercise.sets[exercise.currentSet].originalDuration;
						exercise.sets[exercise.currentSet].rest--;
						if (exercise.sets[exercise.currentSet].rest == 0) {
							$scope.period = 'active';

							exercise.sets[exercise.currentSet].performedReps++;

							if (exercise.sets[exercise.currentSet].performedReps == exercise.sets[exercise.currentSet].expectedReps) {
								$scope.period = 'rest';
							}
						}
						break;
					case 'rest' :
						exercise.sets[exercise.currentSet].rest = exercise.sets[exercise.currentSet].originalRest;
						exercise.sets[exercise.currentSet].restAfter--;

						if (exercise.sets[exercise.currentSet].restAfter < 0) {
							$scope.period = 'active';

							if (exercise.currentSet >= exercise.sets.length - 1) {
								$interval.cancel(trainingInterval);
								$scope.period = 'undefined';
								exercise.sets[exercise.currentSet].restAfter = exercise.sets[exercise.currentSet].originalRestAfter;
							}
							else {
								exercise.currentSet++;
								exercise.sets[exercise.currentSet].originalDuration = exercise.sets[exercise.currentSet].duration;
								exercise.sets[exercise.currentSet].originalRest = exercise.sets[exercise.currentSet].rest;
								exercise.sets[exercise.currentSet].originalRestAfter = exercise.sets[exercise.currentSet].restAfter;
								exercise.sets[exercise.currentSet].performedReps = 0;
							}
						}
						break;
				}
			}, 1000);
		};

		var snapShot = function (exercise) {
			exercise.sets[exercise.currentSet].originalDuration = exercise.sets[exercise.currentSet].duration;
			exercise.sets[exercise.currentSet].originalRest = exercise.sets[exercise.currentSet].rest;
			exercise.sets[exercise.currentSet].originalRestAfter = exercise.sets[exercise.currentSet].restAfter;
			exercise.sets[exercise.currentSet].performedReps = 0;
		};

		var startPreTrainingTimer = function () {
			$scope.timeRemainingBeforeTraining = 5;

			$scope.period = 'pre-training';
			var initialisationInterval = $interval(function () {
				$scope.timeRemainingBeforeTraining--;
				if ($scope.timeRemainingBeforeTraining == 1) {
					$scope.period = 'active';
					$interval.cancel(initialisationInterval);
				}
			}, 1000);
		};

	}
})();