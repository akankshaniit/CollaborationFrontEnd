'use strict';
app.controller(
		'BlogController',
		[
				'$scope',
				'BlogService',
				'$location',
				'$rootScope',
				'$cookieStore',
				'$http',
				function($scope, BlogService, $location, $rootScope,
						$cookieStore, $http) {
					console.log("BlogController...");
					var self = this;
					self.blog = {
						id : '',
						title : '',
						user_id : '',
						date_time : '',
						status : '',
					    reason : '',
						description : '',
						errorCode : '',
						errorMessage : '',
						
					};
					
					
					self.currentBlog = {
							id : '',
							title : '',
							user_id : '',
							date_time : '',
							status : '',
						    reason : '',
							description : '',
							errorCode : '',
							errorMessage : '',
						};
					
					self.comment={
						id : '',
						content : '',
						user_id : '',
						blog_id : '',
						commentedAt : '',
					
						errorCode : '',
						errorMessage : '',
					};

					$scope.blogs = []; // json array
					
					$scope.comments = [];
					
					
					self.getSelectedBlog=getBlog;
					
					$scope.orderByMe = function(x) {
						$scope.myOrderBy = x;
					}
					
					function getBlog(id)
					{
						console.log("-getting Blog"+id);
						
						BlogService.getBlog(id)
						.then(
						        function(d){
						        	self.blog=d;
						        	$location.path("/view_blog");
						        },
						        function(errResponse)
						        {
						        	console.error("error While fetching Blog");
						        }
						);
					};
					
					//method definition
					self.fetchAllBlogs = function() {
						console.log("fetchAllBlogs...")
						BlogService
								.fetchAllBlogs()
								.then(
										function(d) {
											$scope.blogs = d;
											console.log($scope.blogs);
										},
										function(errResponse) {
											console
													.error('Error while fetching Blogs');
										});
					};
					
					// self.fatchAllBlogs();

					self.createBlog = function(blog) {
						console.log("createBlog...");
						BlogService
								.createBlog(blog)
								.then(
										function(d) {
											console.log(d);
											alert("Thank you for Creating Blog");
											$location.path("/")
										},
										function(errResponse) {
											console
													.error('Error while creating Blog.');
										});
					};

					self.updateBlog = function(blog,id) {
						console.log("createBlog...")
						BlogService
								.updateBlog(blog)
								.then(
										self.fetchAllBlogs,
										function(errResponse) {
											console
													.error('Error while updating Blog.');
										}
								)
					};
					
					
					self.accept=function(id){
						console.log("accept")
						JobService.
						    accept(id)
						    .then(
						           function(d){
						        	   self.blog=d;
						        	   self.fetchAllBlogs
						        	   $location.path("/manage_job")
						        	   alert(self.job.errorMessage)
						           },
						           function(errResponse) {
										console
												.error('Error while Accepting Blog.');
									
						           
						           } );
						    
			  };
			  
			  
			  self.reject=function(id){
					console.log("reject")
					var reason= prompt("please enter Reason");
					BlogService.
					    reject(id,reason)
					     .then(
						           function(d){
						        	   console.log(d);
						        	   self.blog=d;
						        	   self.fetchAllBlogs();
						        	   $location.path("/list_blog");
						        	   alert(self.blog.errorMessage);
						           },
						           function(errResponse) {
										console
												.error('Error while rejecting Blog.');
									
			               } );
				    
				  };
				  
				  self.submit = function() {
						{
							console.log('Saving New Blog', self.blog);
							self.blog.user_id=$rootScope.currentUser.id;
							self.createBlog(self.blog);
						}
						self.reset();
					};
				  
					
					self.edit=function(id){
						console.log('id to be edited',id)
						for(i=0;i<self.blogs.length;i++)
							{
							if(self.blogs[i].id==id)
								{
								self.blog=angular.copy(self.blogs[i]);
								break;
								}
							}
						
					};
					
					self.deleteBlog=function(id){
						console.log("delete"+id)
						BlogService.
						 deleteBlog(id)
						     .then(
							           function(d){
							        	   console.log(d);
							        	   self.blog=d;
							        	   self.fetchAllBlogs();
							        	   $location.path("/list_blog");
							        	   alert(self.blog.errorMessage);
							           },
							           function(errResponse) {
											console
													.error('Error while rejecting Blog.');
										
				               } );
					    
						
					};
					
					
					self.createComment = function(comment) {
						console.log("createComment...");
						
						self.comment.blog_id = $rootScope.selectedBlog.id;
						self.comment.user_id = $rootScope.currentUser.id;
						console.log("blog id : "+ self.comment.blog_id );
						console.log("user id : "+ self.comment.user_id );
						console.log("content : "+ self.comment.content );
						console.log("createComment...");
						BlogService
								.createComment(self.comment)
								.then(
										function(d) {
											self.fetchAllComments($rootScope.selectedBlog.id);
											alert("Thank you for ur Comment");
											$location.path("/view_blog")
										},
										function(errResponse) {
											console
													.error('Error while creating Blog.');
										});
					};
					
					self.fetchAllComments = function(id) {
						console.log("fetchAllComments...")
						BlogService
								.fetchAllComments(id)
								.then(
										function(d) {
											$scope.comments = d;
											console.log($scope.comments);
										},
										function(errResponse) {
											console
													.error('Error while fetching Commentss');
										});
					};
					
					
					
				} ]);