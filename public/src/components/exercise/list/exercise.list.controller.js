(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('ExerciseListController', ExerciseListController);

	ExerciseListController.$inject = ['$scope', '$state', '$firebaseArray'];

	function ExerciseListController($scope, $state, $firebaseArray) {

		(function initializeController() {
			var ref = firebase.database().ref().child("exercises");
			$scope.exercises = $firebaseArray(ref);
		}());

		$scope.create = function () {
			$state.go("newExercise");
		};
	}
})();