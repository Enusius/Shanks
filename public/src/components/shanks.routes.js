(function () {
	'use strict';

	angular
		.module('shanksApp')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/scheduler');

		$stateProvider
			.state('scheduler', {
				url: '/scheduler',
				templateUrl: '/public/src/components/scheduler/scheduler.template.html',
				controller : 'SchedulerController'
			})
			.state('calendar', {
				url: '/calendar',
				templateUrl: '/public/src/components/scheduler/new-calendar/calendar.template.html',
				controller : 'SchedulerController'
			})
			.state('newEvent', {
				url: '/events/new',
				templateUrl: '/public/src/components/scheduler/event/new/event.new.template.html',
				controller : 'EventCreateController'
			})
			.state('viewEvent', {
				url: '/events/:eventId/view',
				templateUrl: '/public/src/components/scheduler/event/view/event.view.template.html',
				controller : 'EventViewController'
			})
			.state('editEvent', {
				url: '/events/:eventId/edit',
				templateUrl: '/public/src/components/scheduler/event/edit/event.edit.template.html',
				controller : 'EventEditController'
			})
			.state('assistantEvent', {
				url: '/events/:eventId/assistant',
				templateUrl: '/public/src/components/scheduler/event/assistant/event.assistant.template.html',
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
	}
})();