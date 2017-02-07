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
				templateUrl: '/public/src/components/scheduler/calendar.template.html',
				controller : 'CalendarController'
			})
			.state('newEvent', {
				url: '/events/new',
				templateUrl: '/public/src/components/workout/new/event.new.template.html',
				controller : 'EventCreateController'
			})
			.state('viewEvent', {
				url: '/events/:eventId/view',
				templateUrl: '/public/src/components/workout/view/event.view.template.html',
				controller : 'EventViewController'
			})
			.state('editEvent', {
				url: '/events/:eventId/edit',
				templateUrl: '/public/src/components/workout/edit/event.edit.template.html',
				controller : 'EventEditController'
			})
			.state('assistantEvent', {
				url: '/events/:eventId/assistant',
				templateUrl: '/public/src/components/workout/assistant/event.assistant.template.html',
				controller : 'EventAssistantController'
			})
			.state('exercises', {
				url: '/exercises',
				templateUrl: '/public/src/components/exercise/list/exercise.list.template.html',
				controller : 'ExerciseListController'
			})
			.state('newExercise', {
				url: '/exercises/new',
				templateUrl: '/public/src/components/exercise/new/exercise.new.template.html',
				controller : 'ExerciseCreateController'
			})
			.state('viewExercise', {
				url: '/exercises/:exerciseId/view',
				templateUrl: '/public/src/components/exercise/view/exercise.view.template.html',
				controller : 'ExerciseViewController'
			})
			.state('editExercise', {
				url: '/exercises/:exerciseId/edit',
				templateUrl: '/public/src/components/exercise/edit/exercise.edit.template.html',
				controller : 'ExerciseEditController'
			})
			.state('dashboard', {
				url: '/dashboard',
				templateUrl: '/public/src/components/dashboard/dashboard.template.html',
				controller : 'DashboardController'
			})
	}
})();