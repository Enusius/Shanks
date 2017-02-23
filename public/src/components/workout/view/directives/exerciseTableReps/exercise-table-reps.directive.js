(function () {
	'use strict';

	angular
		.module('shanksApp')
		.directive('exerciseTableReps', function () {
			return {
				templateUrl: 'public/src/components/workout/view/directives/exerciseTableReps/_exercise-table-reps.view.template.html'
			};
		});
})();