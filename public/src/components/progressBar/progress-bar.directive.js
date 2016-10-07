(function () {
	'use strict';

	angular
		.module('shanksApp')
		.directive('progressBar', function ($interval) {

			function _link(scope, element, attrs) {
				var timeoutId;

				function updateTime() {
					scope.value--;
					if (scope.value == 0) {
						scope.value = scope.initialValue;
						$interval.cancel(timeoutId);
					}
				}

				scope.$watch('value', function(){
					if(scope.initialValue === undefined && scope.value !== undefined)
						scope.initialValue = angular.copy(scope.value);

					scope.classValue = ' p' + Math.round(((scope.value / scope.initialValue) * 100)) + ' ' + attrs.class;
				});

				scope.startTimer = function () {
					if(attrs.active !== undefined && attrs.active == "true") {
						timeoutId = $interval(function () {
							updateTime(); // update DOM
						}, 1000);
					}
				};

				scope.stopTimer = function () {
					$interval.cancel(timeoutId);
				};

				scope.reset = function () {
					scope.value = scope.initialValue;
				}
			}

			return {
				restrict: 'E',
				scope: {
					value: '=timerValue'
				},
				templateUrl: 'components/progressBar/progress-bar.template.html',
				link: _link
			};
		});

})();