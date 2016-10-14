(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('ExerciseCreateController', ExerciseCreateController);

	ExerciseCreateController.$inject = ['$scope', '$stateParams', '$state', '$firebaseArray', '$firebaseObject', 'ngToast'];

	function ExerciseCreateController($scope, $stateParams, $state, $firebaseArray, $firebaseObject, ngToast) {

		(function initializeController() {
			$scope.exercise = {
				name: "My Awesome Exercise",
				description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae cupiditate dignissimos id laudantium, quibusdam saepe."
			};
		})();

		$scope.save = function () {

			var ref = firebase.database().ref().child("exercises");
			$scope.exercises = $firebaseArray(ref);

			$scope.exercises
				.$add($scope.exercise)
				.then(function (ref) {
					$state.go('viewExercise', {eventId: $firebaseObject(ref).$id});
					ngToast.success("Sauvegarde reussi!");
				})
				.catch(function () {
					ngToast.danger("Une erreur est survenue. Veuillez reesayer");
				});
		};

		$scope.cancel = function () {
			$state.go('exercises');
		};
	}
})();