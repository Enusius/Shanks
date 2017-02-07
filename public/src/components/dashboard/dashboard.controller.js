(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('DashboardController', DashboardController);

	DashboardController.$inject = ['$scope', '$firebaseArray', '$firebaseObject', '$state', 'ngToast', '_'];

	function DashboardController($scope, $firebaseArray, $firebaseObject, $state, ngToast, _) {

		(function initializeController() {
			const eventRef = firebase.database().ref().child("events");
			const exerciseRef = firebase.database().ref().child("exercises");
			$scope.events = $firebaseArray(eventRef);
			$scope.exercises = $firebaseArray(exerciseRef);
		}());

		$scope.$watch("selectedExercise", function (newValue) {
			var workoutsWhereSelectedExerciseWasPerformed = _.filter($scope.events, function (event) {
				return _.find(event.trainingContent.exercises, function (exercise) {
						return exercise.exercise.name == newValue.name;
					}) !== undefined;
			});

			var liftedLoadByDate = calculateLiftedLoadWithDate(workoutsWhereSelectedExerciseWasPerformed, newValue);

			$scope.labels = _.map(liftedLoadByDate, function (el) {
				return el.date;
			});
			$scope.series = [newValue.name];
			$scope.data = [
				_.flatMap(liftedLoadByDate, function (el) {
					return el.liftedLoad;
				})
			];
		});

		var calculateLiftedLoadWithDate = function (workoutsWhereSelectedExerciseWasPerformed, selectedExercise) {
			var liftedLoadByDate = [];

			_.each(workoutsWhereSelectedExerciseWasPerformed, function (workout) {
				liftedLoadByDate.push(extractExerciceFromWorkouts(workout, selectedExercise));
			});

			return liftedLoadByDate
		};

		var extractExerciceFromWorkouts = function (workout, selectedExercise) {
			var workoutDate = workout.startsAt;

			var exerciseSets = _.flatMap(_.filter(workout.trainingContent.exercises, function (exercise) {
				return exercise.exercise.name == selectedExercise.name;
			}), function (exercise) {
				return exercise.sets
			});

			return {
				date: workoutDate,
				liftedLoad: calculateLiftedLoad(selectedExercise, exerciseSets)
			};
		};

		var calculateLiftedLoad = function (exercise, exerciseSets) {
			var liftedLoad = 0;

			if(exercise.type == 'reps') {
				_.each(exerciseSets, function (set) {
					liftedLoad += set.expectedReps * set.load;
				});
			}
			else
			{
				_.each(exerciseSets, function (set) {
					liftedLoad += set.duration * (set.load + 1) * set.expectedReps;
				});
			}

			return liftedLoad;
		};
	}
})();