(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('ExerciseListController', ExerciseListController);

	ExerciseListController.$inject = ['$scope', '$rootScope', '$state', '$firebaseArray', 'ngToast'];

	function ExerciseListController($scope, $rootScope, $state, $firebaseArray, ngToast) {

		(function initializeController() {
			var ref = firebase.database().ref().child("exercises");
			$scope.exercises = $firebaseArray(ref);
		}());

		$scope.create = function () {
			$state.go("newExercise");
		};
	}
})();