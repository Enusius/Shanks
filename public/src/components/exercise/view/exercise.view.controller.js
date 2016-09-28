(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('ExerciseViewController', ExerciseViewController);

	ExerciseViewController.$inject = ['$scope', '$rootScope', '$stateParams', '$state', '$firebaseObject', 'ngToast'];

	function ExerciseViewController($scope, $rootScope, $stateParams, $state, $firebaseObject, ngToast) {

		(function initializeController() {
			if ($stateParams.exerciseId === undefined || $stateParams.exerciseId == null || $stateParams.exerciseId == "") {
				$state.go('exercises');
			}
			else {
				var ref = firebase.database().ref().child("exercises").child($stateParams.exerciseId);

				$rootScope.pageLoading = true;

				$firebaseObject(ref).$loaded(
					function (data) {
						$rootScope.pageLoading = false;
						$scope.exercise = data;
					},
					function (error) {
						$rootScope.pageLoading = false;
						ngToast.danger(error);
					}
				);
			}
		})();

		$scope.edit = function () {
			$state.go('editExercise', {exerciseId: $stateParams.exerciseId});
		};
	}
})();