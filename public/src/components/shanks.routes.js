(function () {
	'use strict';

	angular
		.module('shanksApp')
		.config(config);

	config.$inject = ['$stateProvider', '$urlRouterProvider'];

	function config($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/scheduler');
		//
		// Now set up the states
		$stateProvider
			.state('inspiration', {
				url: '/inspiration',
				templateUrl: 'components/inspiration/main-content.template.html'
			})
			.state('scheduler', {
				url: '/scheduler',
				templateUrl: 'components/scheduler/scheduler.template.html',
				controller : 'SchedulerController'
			})
			.state('newEvent', {
				url: '/events/new',
				templateUrl: 'components/scheduler/event/new/event.new.template.html',
				controller : 'EventCreateController'
			})
			.state('viewEvent', {
				url: '/events/:eventId/view',
				templateUrl: 'components/scheduler/event/view/event.view.template.html',
				controller : 'EventViewController'
			})
			.state('editEvent', {
				url: '/events/:eventId/edit',
				templateUrl: 'components/scheduler/event/edit/event.edit.template.html',
				controller : 'EventEditController'
			})
			.state('exercises', {
				url: '/exercises',
				templateUrl: 'components/exercise/list/exercise.list.template.html',
				controller : 'ExerciseListController'
			})
			.state('newExercise', {
				url: '/exercises/new',
				templateUrl: 'components/exercise/new/exercise.new.template.html',
				controller : 'ExerciseCreateController'
			})
			.state('viewExercise', {
				url: '/exercises/:exerciseId/view',
				templateUrl: 'components/exercise/view/exercise.view.template.html',
				controller : 'ExerciseViewController'
			})
			.state('editExercise', {
				url: '/exercises/:exerciseId/edit',
				templateUrl: 'components/exercise/edit/exercise.edit.template.html',
				controller : 'ExerciseEditController'
			})
	}
})();