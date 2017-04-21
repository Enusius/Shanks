(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('EventFormController', EventFormController);

	EventFormController.$inject = ['$scope', '$uibModal'];

	function EventFormController($scope, $uibModal) {

		$scope.addExercise = function () {

			const modalInstance = $uibModal.open({
				animation: 'true',
				ariaLabelledBy: 'modal-title',
				ariaDescribedBy: 'modal-body',
				templateUrl: '/public/src/components/workout/common/select-exercise/_select-exercise.form.template.html',
				controller: 'SelectExerciseFormController',
				size: 'sm',
				resolve: {}
			});

			modalInstance.result.then(function (selectedExercise) {
				if ($scope.event.trainingContent === undefined) {
					$scope.event.trainingContent = {
						exercises: []
					}
				}

				$scope.event.trainingContent.exercises.push({
					exercise: selectedExercise
				});

			}, function () {
				$log.info('modal-component dismissed at: ' + new Date());
			});
		};

		$scope.removeExerciseFromIndex = function (exerciseIndex) {
			$scope.event.trainingContent.exercises.splice(exerciseIndex, 1);
		};

		$scope.addSet = function (exercise, nb) {
			if (exercise.sets === undefined || exercise.sets === null)
				exercise.sets = [];

			if (exercise.sets.length > 0) {
				for(let i = 0; i < nb; i++) {
					exercise.sets.push(angular.copy(exercise.sets[exercise.sets.length - 1]));
				}
			}
			else {
				switch (exercise.exercise.type) {
					case "reps" :
						exercise.sets.push(
							{
								expectedReps: 1,
								performedReps: 1,
								load: 0,
								restAfter: 0
							}
						);
						break;
					case "duration" :
						exercise.sets.push(
							{
								expectedReps: 1,
								performedReps: 1,
								duration: 1,
								rest: 0,
								load: 0,
								restAfter: 0
							}
						);
						break;
				}
			}

		};

		$scope.removeSetFromIndex = function (exercise, setIndex) {
			exercise.sets.splice(setIndex, 1);
		};
	}
})();