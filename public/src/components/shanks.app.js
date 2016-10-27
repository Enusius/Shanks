(function () {
	'use strict';

	angular
		.module('shanksApp', ['ngAnimate', 'ui.router', 'ui.calendar', 'firebase', 'ui.bootstrap', 'ngToast'])
		.constant('_', window._)
		.run(function ($rootScope) {
			$rootScope._ = window._;
		});
})();