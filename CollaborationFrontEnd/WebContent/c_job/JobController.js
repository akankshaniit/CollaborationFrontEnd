'use strict';
app.controller(
		'JobController',
		[
				'$scope',
				'JobService',
				'$location',
				'$rootScope',
				'$cookieStore',
				'$http',
				function($scope, JobService, $location, $rootScope,
						$cookieStore, $http) {
					console.log("JobController...");
				//	var this = this;
					$scope.job = {
						id : '',
						title : '',
						description : '',
						date_time : '',
					    status : '',
						qualification : '',
						errorCode : '',
						errorMessage : '',
						
					};

					this.currentjob = {
							id : '',
							title : '',
							description : '',
							date_time : '',
						    status : '',
							qualification : '',
							errorCode : '',
							errorMessage : '',
						};
					
					$scope.jobs = []; // json array
	
                 $scope.getSelectedJob=getJob;
					
					$scope.orderByMe = function(x) {
						$scope.myOrderBy = x;
					}
					
					function getJob(id)
					{
						console.log("-getting Job"+id);
						
						JobService.getJob(id)
						.then(
						        function(d){
						        	$location.path("/view_job_details");
						        },
						        function(errResponse)
						        {
						        	console.error("error While fetching Job");
						        }
						);
					};
					
					//method definition
					$scope.fetchAllJobs = function() {
						console.log("fetchAllJobs...")
						JobService
								.fetchAllJobs()
								.then(
										function(d) {
											$scope.jobs = d;
											console.log($scope.jobs);
										},
										function(errResponse) {
											console
													.error('Error while fetching Jobs');
										});
					};
					
					 function applyJob(jobID)
			         {

			       	  console.log("->Apply for Job :"+jobID)
			             JobService.applyJob(jobID)
			                 .then(
			                              function(d) {
			                                   self.job = d;
			                                   
			                                  alert("Apply Job : " + self.job.errorMessage)
			                              },
			                               function(errResponse){
			                                   console.error('Error while sending friend request');
			                               }
			                      );
			         
			        	 
			         }
			          
					
					
					// this.fatchAllBlogs();

					this.createJob = function(job) {
						console.log("createJob...");
						JobService
								.createJob(job)
								.then(
										function(d) {
											alert("Thank you for Creating Job");
											$location.path("/")
										},
										function(errResponse) {
											console
													.error('Error while creating Job.');
										});
					};
					
					this.updateJob = function(job,id) {
						console.log("createJob...")
						JobService
								.updateJob(job)
								.then(
										this.fetchAllJobs,
										function(errResponse) {
											console
													.error('Error while updating Jobs.');
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
					
					 this.submit = function() {
							{
								console.log('Saving New Job', this.job);
								this.job.user_id=$rootScope.currentUser.id;
								this.createJob(this.job);
							}
							this.reset();
						};
						
						this.edit=function(id){
							console.log('id to be edited',id)
							for(i=0;i<this.blogs.length;i++)
								{
								if(self.jobs[i].id==id)
									{
									self.job=angular.copy(this.jobs[i]);
									break;
									}
								}
							
						};
						
						
					
					
					
					
} ]);