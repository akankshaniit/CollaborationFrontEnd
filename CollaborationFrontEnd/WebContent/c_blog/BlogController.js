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
				//	var this = this;
					this.blog = {
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
					
					this.currentBlog = {
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

					$scope.blogs = []; // json array
					
					this.getSelectedBlog=getBlog;
					
					$scope.orderByMe = function(x) {
						$scope.myOrderBy = x;
					}
					
					function getBlog(id)
					{
						console.log("-getting Blog"+id);
						
						BlogService.getBlog(id)
						.then(
						        function(d){
						        	$location.path("/view_blog");
						        },
						        function(errResponse)
						        {
						        	console.error("error While fetching Blog");
						        }
						);
					};
					
					//method definition
					this.fetchAllBlogs = function() {
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
					
					// this.fatchAllBlogs();

					this.createBlog = function(blog) {
						console.log("createBlog...");
						BlogService
								.createBlog(blog)
								.then(
										function(d) {
											alert("Thank you for Creating Blog");
											$location.path("/")
										},
										function(errResponse) {
											console
													.error('Error while creating Blog.');
										});
					};

					this.updateBlog = function(blog,id) {
						console.log("createBlog...")
						BlogService
								.updateBlog(blog)
								.then(
										this.fetchAllBlogs,
										function(errResponse) {
											console
													.error('Error while updating Blog.');
										}
								)
					};
					
					
					this.accept=function(id){
						console.log("accept")
						JobService.
						    accept(id)
						    .then(
						           function(d){
						        	   this.job=d;
						        	   this.fetchAllBlogs
						        	   $location.path("/manage_job")
						        	   alert(self.job.errorMessage)
						           },
						           function(errResponse) {
										console
												.error('Error while Accepting Blog.');
									
						           
						           } );
						    
			  };
			  
			  
			  this.reject=function(id){
					console.log("reject")
					var reason= promt("please enter Reason");
					JobService.
					    reject(id,reason)
					     .then(
						           function(d){
						        	   this.job=d;
						        	   this.fetchAllBlogs
						        	   $location.path("/manage_job")
						        	   alert(self.job.errorMessage)
						           },
						           function(errResponse) {
										console
												.error('Error while rejecting Blog.');
									
			               } );
				    
				  };
				  
				  this.submit = function() {
						{
							console.log('Saving New Blog', this.blog);
							this.blog.user_id=$rootScope.currentUser.id;
							this.createBlog(this.blog);
						}
						this.reset();
					};
				  
					
					this.edit=function(id){
						console.log('id to be edited',id)
						for(i=0;i<this.blogs.length;i++)
							{
							if(self.blogs[i].id==id)
								{
								self.blog=angular.copy(this.blogs[i]);
								break;
								}
							}
						
					};
					
				} ]);