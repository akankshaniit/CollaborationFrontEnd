//var app = angular.module("myApp", [ "ngRoute","ngCookies","ngFileUpload" ]);
var app = angular.module("myApp", ["ngRoute","ngCookies","myApp.controllers",
	  "myApp.services"]);
app.config(function($routeProvider) {
	
	$routeProvider
	.when("/", {
		templateUrl : "c_home/home.html"
			
	})
	.when("/about", {
		
		templateUrl : "c_about/about.html",
		
	})

	.when("/login", {
		templateUrl : "c_user/login.html",
		controller : "UserController"
	})

	.when("/register", {
		templateUrl : "c_user/register.html",
		controller : "UserController"
	})
	
	.when("/my_profile", {
		templateUrl : "c_user/my_profile.html",
		controller : "UserController"
	})
	
	
	
	.when("/upload_profile", {
		templateUrl : "c_upload/upload.html",
		controller : "UserController"
	})
	
	.when("/manage_users", {
		templateUrl : "c_admin/manage_users.html",
		controller : "UserController"
	})
	
	
	
	/**
	 * Blog related mapping
	 */

	.when('/create_blog', {
		templateUrl : 'c_blog/create_blog.html',
		controller : 'BlogController'
	})

	.when('/list_blog', {
		templateUrl : 'c_blog/list_blog.html',
		controller : 'BlogController'
	})

	.when('/view_blog', {
		templateUrl : 'c_blog/view_blog.html',
		controller : 'BlogController'
	})
	
	/**
	 * Friend related mapping
	 */

	.when('/add_friend', {
		templateUrl : 'c_friend/add_friend.html',
		controller : 'FriendController'
	})

	.when('/search_friend', {
		templateUrl : 'c_friend/search_friend.html',
		controller : 'FriendController'
	})

	.when('/view_friend', {
		templateUrl : 'c_friend/view_friend.html',
		controller : 'FriendController'
	})
	
	.when('/viewFriendRequest', {
		templateUrl : 'c_friend/viewFriendRequest.html',
		controller : 'FriendController'
	})
	
	.when('/checkRequestStatus', {
		templateUrl : 'c_friend/checkRequestStatus',
		controller : 'FriendController'
	})
	
	.when('/chat', {
		templateUrl : 'c_chat/chat.html',
		controller : 'chatcontroller'
	})
	
	.when('/chat_forum', {
		templateUrl : 'c_chat_forum/chat_forum.html',
		controller : 'ChatForumController'
	})

	/**
	 * Job related mappings
	 */
	.when('/job', {
		templateUrl : 'c_job/job.html',
		controller : 'JobController'
	})

	.when('/search_job', {
		templateUrl : 'c_job/search_job.html',
		controller : 'JobController'
	})

	.when('/view_applied_jobs', {
		templateUrl : 'c_job/view_applied_jobs.html',
		controller : 'JobController'
	})
	
	.when('/view_job_details', {
		templateUrl : 'c_job/view_job_details.html',
		controller : 'JobController'
	})

	.when('/post_job', {
		templateUrl : 'c_job/post_job.html',
		controller : 'JobController'
	})
	
	
	.otherwise({
		redirectTo : 'c_home/home.html'
	});
	
	
	
});
angular.module("myApp.controllers", []);
angular.module("myApp.services", []);