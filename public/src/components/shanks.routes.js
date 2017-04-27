(function () {
	'use strict';

	angular
		.module('shanksApp')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/calendar');

		$stateProvider
			.state('calendar', {
				url: '/calendar',
				templateUrl: '/public/src/components/scheduler/calendar.template.html'
			})
			.state('viewEvent', {
				url: '/events/:eventId/view',
				templateUrl: '/public/src/components/workout/view/event.view.template.html',
				controller : 'EventViewController'
			})
			.state('newEvent', {
				url: '/events/new',
				templateUrl: '/public/src/components/workout/common/event-form/_event.form.template.html',
				controller : 'EventCreateController'
			})
			.state('editEvent', {
				url: '/events/:eventId/edit',
				templateUrl: '/public/src/components/workout/common/event-form/_event.form.template.html',
				controller : 'EventEditController'
			})
			.state('exercises', {
				url: '/exercises',
				templateUrl: '/public/src/components/exercise/list/exercise.list.template.html',
				controller : 'ExerciseListController'
			})
			.state('newExercise', {
				url: '/exercises/new',
				templateUrl: '/public/src/components/exercise/common/partials/_exercise.form.template.html',
				controller : 'ExerciseCreateController'
			})
			.state('viewExercise', {
				url: '/exercises/:exerciseId/view',
				templateUrl: '/public/src/components/exercise/view/exercise.view.template.html',
				controller : 'ExerciseViewController'
			})
			.state('editExercise', {
				url: '/exercises/:exerciseId/edit',
				templateUrl: '/public/src/components/exercise/common/partials/_exercise.form.template.html',
				controller : 'ExerciseEditController'
			})
			.state('weight', {
				url: '/weight',
				templateUrl: '/public/src/components/weight/weight-manager.template.html',
				controller : 'WeightManagerController'
			})
	}
})();