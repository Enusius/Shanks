(function () {
	'use strict';

	angular
		.module('shanksApp')
		.controller('WeightManagerController', WeightManagerController);

	WeightManagerController.$inject = ['$scope', '$firebaseArray', '$firebaseObject', '$state', 'ngToast', '_'];

	function WeightManagerController($scope, $firebaseArray, $firebaseObject, $state, ngToast, _) {

		(function initializeController() {
			const ref = firebase.database().ref().child("weight");
			$scope.weightHistory = $firebaseArray(ref);
		}());

		$scope.addEntry = function () {
			$scope.weightHistory
				.$add({
					date: $scope.entry.date.toDateString(),
					weight: $scope.entry.weight
				})
				.then(function (ref) {
					ngToast.success("Sauvegarde reussi!");
				})
				.catch(function () {
					ngToast.danger("Une erreur est survenue. Veuillez reesayer");
				});
		};

		$scope.getData = function () {
			return $scope.weightHistory
				.sort(function (a, b) {
					return new Date(a.date) - new Date(b.date);
				}).map(function (entry) {
					return entry.weight;
				});
		};

		$scope.getLabels = function () {
			return $scope.weightHistory
				.sort(function (a, b) {
					return new Date(a.date) - new Date(b.date);
				}).map(function (entry) {
					return entry.date.toLocaleString();
				});
		};

		$scope.getSeries = function () {
			return ['Weight History'];
		}
	}
})();