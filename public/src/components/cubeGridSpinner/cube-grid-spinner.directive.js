(function () {
	'use strict';

	angular
		.module('shanksApp')
		.directive('cubeGridSpinner', function () {
			return {
				restrict: 'E',
				templateUrl: 'components/cubeGridSpinner/cube-grid-spinner.template.html'
			};
		});

})();