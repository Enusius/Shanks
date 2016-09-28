(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('SelectExerciseFormController', SelectExerciseFormController);

	SelectExerciseFormController.$inject = ['$scope', '$uibModalInstance', '$firebaseArray'];

	function SelectExerciseFormController($scope, $uibModalInstance, $firebaseArray) {

		(function initializeController() {
			var ref = firebase.database().ref().child("exercises");
			$scope.exercises = $firebaseArray(ref);
		}());

		$scope.ok = function () {
			$uibModalInstance.close($scope.selectedExercise);
		};

		$scope.cancel = function () {
			$uibModalInstance.dismiss('cancel');
		};
	}
})();