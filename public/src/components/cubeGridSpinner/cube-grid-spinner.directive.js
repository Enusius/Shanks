(function () {
	'use strict';

	angular
		.module('shanksApp')
		.directive('cubeGridSpinner', function () {
			return {
				restrict: 'E',
				templateUrl: '/public/src/components/cubeGridSpinner/cube-grid-spinner.template.html'
			};
		});

})();