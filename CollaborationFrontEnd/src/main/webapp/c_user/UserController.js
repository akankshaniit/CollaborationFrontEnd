'use strict';

app
		.controller(
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
						//	var this = this;
							this.user = {
								id : '',
								name : '',
								password : '',
								mobile : '',
								address : '',
								
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
								
								isOnline : '',
								role : '',
								errorCode : '',
								errorMessage : '',
								imageUrl : ''
							};

							this.users = []; // json array

							$scope.orderByMe = function(x) {
								$scope.myOrderBy = x;
							}

							this.fetchAllUsers = function() {
								console.log("fetchAllUsers...")
								UserService
										.fetchAllUsers()
										.then(
												function(d) {
													this.users = d;
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
													alert("Thank you for registration")
													$location.path("/")
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
													this.user = d;
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

							this.authenticate = function(user) {
								console.log("authenticate...")
								UserService
										.authenticate(user)
										.then(

												function(d) {

													this.user = d;
													console
															.log("user.errorCode: "
																	+ this.user.errorCode)
													if (this.user.errorCode == "404")

													{
														alert(this.user.errorMessage)

														this.user.id = "";
														this.user.password = "";

													} else { // valid
																// credentials
														console
																.log("Valid credentials. Navigating to home page")
  
														if(this.user.role=="ROLE_ADMIN")	
															{
															console.log("You are admin")
															this.fetchAllUsers();
															}
														

														console
																.log('Current user : '
																		+ this.user)
														$rootScope.currentUser = this.user
														$cookieStore.put(
																'currentUser',
																this.user);

														$http.defaults.headers.common['Authorization'] = 'Basic '
																+ $rootScope.currentUser;
														$location
																.path('/chat_forum');

													}

												},
												function(errResponse) {

													console
															.error('Error while authenticate Users');
												});
							};

							this.logout = function() {
								console.log("logout")
								$rootScope.currentUser = {};
								$cookieStore.remove('currentUser');
								UserService.logout()
								$location.path('/');

							}

							// this.fetchAllUsers(); //calling the method

							// better to call fetchAllUsers -> after login ???

							this.login = function() {
								{
									console.log('login validation????????',
											this.user);
									this.authenticate(this.user);
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
