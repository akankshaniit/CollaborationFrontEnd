'use strict';

app.controller(
				'UserController',
				[
						'$scope',
						'UserService',
						'$location',
						'$rootScope',
						'$cookieStore',
						'$http',
						function($scope, UserService, $location, $rootScope,
								$cookieStore, $http) {
							console.log("UserController...")
						//var this = this;
							this.user = {
								id : '',
								name : '',
								password : '',
								mobile : '',
								address : '',
								email : '',
								
								isOnline : '',
								role : '',
								
								errorCode : '',
								errorMessage : '',
								imageUrl : ''
							};

							this.currentUser = {
								id : '',
								name : '',
								password : '',
								mobile : '',
								address : '',
								email : '',
								
								isOnline : '',
								role : '',
								errorCode : '',
								errorMessage : '',
								imageUrl : ''
							};

							$scope.users = []; // json array

							$scope.orderByMe = function(x) {
								$scope.myOrderBy = x;
							}

							$scope.fetchAllUsers = function() {
								console.log("fetchAllUsers...");
								UserService
										.fetchAllUsers()
										.then(
												function(d) {
													$scope.users = d;
												//	console.log($scope.users);
													
												},
												function(errResponse) {
													console
															.error('Error while fetching Users');
												});
							};

							// this.fatchAllUsers();

							this.createUser = function(user) {
								console.log("createUser...")
								UserService
										.createUser(user)
										.then(
												function(d) {
													alert("Thank you for registration");
													$location.path("/");
												},
												function(errResponse) {
													console
															.error('Error while creating User.');
												});
							};

							this.myProfile = function() {
								console.log("myProfile...")
								UserService
										.myProfile()
										.then(
												function(d) {
													user = d;
													$location
															.path("/myProfile")
												},
												function(errResponse) {
													console
															.error('Error while fetch profile.');
												});
							};

							this.accept = function(id) {
								console.log("accept...")
								UserService
										.accept(id)
										.then(
												function(d) {
													this.user = d;
													this.fetchAllUsers
													$location
															.path("/manage_users")
													alert(this.user.errorMessage)

												},

												function(errResponse) {
													console
															.error('Error while updating User.');
												});
							};

							this.reject = function(id) {
								console.log("reject...")
								var reason = prompt("Please enter the reason");
								UserService.reject(id, reason).then(
										function(d) {
											this.user = d;
											this.fetchAllUsers
											$location.path("/manage_users")
											alert(this.user.errorMessage)

										}, null);
							};

							this.updateUser = function(currentUser) {
								console.log("updateUser...")
								UserService.updateUser(currentUser).then(
										this.fetchAllUsers, null);
							};

							this.update = function() {
								{
									console.log('Update the user details',
											$rootScope.currentUser);
									this.updateUser($rootScope.currentUser);
								}
								this.reset();
							};

							this.validate = function(user) {
								console.log("authenticate...");
								UserService
										.validate(user)
										.then(

												function(data) {
														console.log(data);
														console.log("akku-niyu:"+user);
													user = data;
													console.log(user);
													console
															.log("user.errorCode: "
																	+user.errorCode)
													if (user.errorCode == "404")

													{
														alert(user.errorMessage);

														user.email = "";
														user.password = "";

													} else { // valid
																// credentials
														console
																.log("Valid credentials. Navigating to home page");
  
														if(user.role=="Admin")	
															{
															console.log("You are admin");
															$scope.fetchAllUsers();
															console.log("i m tired...");
															}
														

														console.log('Current user : '+user);
														$rootScope.currentUser = user;
														console.log($rootScope.currentUser);
														$cookieStore.put('currentUser',$rootScope.currentUser);
														console.log($rootScope.currentUser.role);
														$http.defaults.headers.common['Authorization'] = 'Basic' + $rootScope.currentUser;								
														$location.path('/');
													}

												},
												function(errResponse) {

													console
															.error('Error while authenticate Users');
												});
							};

							this.logout = function() {
								console.log("user Controller logout")
								$rootScope.currentUser = {};
								$cookieStore.remove('currentUser');
								UserService.logout();
								console.log("silence.....");
								console.log($rootScope.currentUser);
								$location.path('/');

							}

							// this.fetchAllUsers(); //calling the method

							// better to call fetchAllUsers -> after login ???

							this.login = function() {
								{
									alert("Please wait Login is in progress");
									console.log('login validation????????',
											this.user);
									this.validate(this.user);
									
								}

							};

							this.submit = function() {
								{
									console.log('Saving New User', this.user);
									this.createUser(this.user);
								}
								this.reset();
							};

							this.reset = function() {
								this.user = {
									id : '',
									name : '',
									password : '',
									mobile : '',
									address : '',
									
									isOnline : '',
									errorCode : '',
									errorMessage : ''
								};
								$scope.myForm.$setPristine(); // reset Form
							};

						} ]);
