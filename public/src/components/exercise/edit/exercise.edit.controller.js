(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('ExerciseEditController', ExerciseEditController);

	ExerciseEditController.$inject = ['$scope', '$rootScope', '$stateParams', '$state', '$firebaseObject', 'ngToast'];

	function ExerciseEditController($scope, $rootScope, $stateParams, $state, $firebaseObject, ngToast) {

		(function initializeController() {
			if ($stateParams.exerciseId === undefined || $stateParams.exerciseId == null || $stateParams.exerciseId == "") {
				ngToast.danger("Impossible de charger la page sans Id d'evenement");
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

		$scope.save = function () {
			$scope.exercise
				.$save()
				.then(function () {
					$state.go('viewExercise', {exerciseId: $stateParams.exerciseId});
					ngToast.success("Sauvegarde reussi!");
				})
				.catch(function () {
					ngToast.danger("Une erreur est survenue. Veuillez reesayer");
				});
		};

		$scope.cancel = function () {
			$state.go('viewExercise', {exerciseId: $stateParams.exerciseId});
		};
	}
})();