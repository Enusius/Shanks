(function () {
	'use strict';

	angular
		.module('shanksApp', ['ngAnimate', 'ui.router', 'firebase', 'mwl.calendar','ui.bootstrap', 'ngToast'])
		.constant('_', window._)
		.run(function ($rootScope) {
			$rootScope._ = window._;
		});
})();