(function () {
	'use strict';

	angular
		.module('shanksApp')
		.config(['ngToastProvider', function (ngToastProvider) {
			ngToastProvider.configure({
				animation: 'fade',
				horizontalPosition: 'left',
				verticalPosition: 'bottom',
				maxNumber: 5,
				dismissButton: true
			});
		}])
		.run(['$rootScope', function ($rootScope) {
			$rootScope.isPageLoading = function () {
				return $rootScope.pageLoading;
			}
		}]);
})();