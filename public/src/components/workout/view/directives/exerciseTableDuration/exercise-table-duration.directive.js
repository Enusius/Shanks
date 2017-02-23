(function () {
	'use strict';

	angular
		.module('shanksApp')
		.directive('exerciseTableDuration', function () {
			return {
				templateUrl: 'public/src/components/workout/view/directives/exerciseTableDuration/_exercise-table-duration.view.template.html'
			};
		});
})();