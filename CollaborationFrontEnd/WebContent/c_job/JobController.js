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
					var self = this;
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

					self.currentjob = {
							id : '',
							title : '',
							description : '',
							date_time : '',
						    status : '',
							qualification : '',
							errorCode : '',
							errorMessage : '',
						};
					
					$scope.jobapplication = {
							id : '',
							user_id : '',
							job_id : '',
							dateApplied : '',
						    status : '',
							remark : '',
							errorCode : '',
							errorMessage : '',
							
						};

					
					$scope.jobs = []; // json array
	
					$rootScope.jobApplications = [];
					
                 $scope.jobdetails=[];
					
					$scope.orderByMe = function(x) {
						$scope.myOrderBy = x;
					}
					
					 self.getAppliedJobs=function(id)
					{
						console.log("-getting Job"+id);
						
						JobService.getJob(id)
						.then(
						        function(d){
						        	
						        	
						        },
						        function(errResponse)
						        {
						        	console.error("error While fetching Job");
						        }
						);
					};
					
					$scope.getByJobID= function(id){
						console.log("GetBY JobId");
						console.log("Job Id"+id);
						JobService
						       .getByJobID(id)
						       .then(
										function(d) {
											console.log(d);
										  $scope.jobdetails.push(d);
											
										},
										function(errResponse) {
											console
													.error('Error while creating User.');
										});
										
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
					
					
					$scope.fetchAllJobApplications = function() {
						console.log("fetchAllJobApplication...")
						JobService
								.fetchAlljobApplications()
								.then(
										function(d) {
											$rootScope.jobApplications = d;
											console.log($scope.jobApplications);
										},
										function(errResponse) {
											console
													.error('Error while fetching Jobs');
										});
					};
					
					
					
					
					this.applyJob = function(jobID) 
			         {

			       	  console.log("->Apply for Job :"+jobID)
			             JobService.applyJob(jobID)
			                 .then(
			                              function(d) {
			                                   $scope.job = d;
			                                   alert($scope.job.errorMessage);
			                                  
			                              },
			                               function(errResponse){
			                                   console.error('Error while Applying job ');
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
					
					this.updateJob = function(id) {
						console.log("updateJob..." +id)
						JobService
								.updateJob(id)
								.then(
										function(d){
										$scope.fetchAllJobs
										},
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
			  this.update = function() {
					{
						console.log('Update the Job details',
								id);
						this.updateJob($rootScope.id);
					}
					this.reset();
				};
					
					 this.submit = function() {
							{
								
								
								this.createJob($scope.job);
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
						
						 self.callForInterview=function(user_id,job_id){
								console.log("callForInterview......")
								var remarks= prompt("please enter Reason");
								JobService.
								      callForInterview(user_id,job_id,remarks)
								     .then(
									           function(d){
									        	   console.log(d);
									        	   $scope.job=d;
									        	  
									        	   $location.path("/manage_jobApplication");
									        	   alert($scope.job.errorMessage);
									           },
									           function(errResponse) {
													console
															.error('Error while rejecting Blog.');
												
						               } );
							    
							  };		
					
							  self.rejectJobApplication=function(user_id,job_id){
									console.log("rejectJobApplication......")
									var remarks= prompt("please enter Reason");
									JobService.
									      rejectJobApplication(user_id,job_id,remarks)
									     .then(
										           function(d){
										        	   console.log(d);
										        	   $scope.job=d;
										        	  
										        	   $location.path("/manage_jobApplication");
										        	   alert($scope.job.errorMessage);
										           },
										           function(errResponse) {
														console
																.error('Error while rejecting Blog.');
													
							               } );
								    
								  };		
						
					
					
					
} ]);