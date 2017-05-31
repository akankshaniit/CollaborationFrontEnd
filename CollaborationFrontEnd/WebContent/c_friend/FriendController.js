app.controller('FriendController', ['UserService','$scope', 'FriendService','$location',
   '$rootScope',function(UserService,$scope, FriendService,$location,$routeParams,$rootScope) {
	console.log("FriendController...")
          var self = this;
          $scope.friend={id:'',userID:'',friendID:'',status:'', isOnline:''};
          $scope.friends=[];
          
          $scope.user = {	id : '', name : '',	password : '',	mobile : '',
  				address : '',email : '', isOnline:'',role : '',
  				errorMessage : ''
  			};
  		$scope.users = [];
  		        
  		$scope.getMyFriendRequests = function(){
  		        	 console.log("Getting my Friend Request");
  		              FriendService.getMyFriendRequests()
  		                      .then(
  		                             function(d)
  		                             {
  		                            	 $scope.friends = d;
  		                            	 console.log($scope.friends);
  		                           
  		                            	 $location.path="/viewFriendRequest";
  		                            	 
  		                             },
  		                              function(errResponse){
  		                                   console.error('Error while updating Friend.');
  		                              } 
  		                  );
  		          };
  		 
          
         $scope.sendFriendRequest=sendFriendRequest
         
         function sendFriendRequest(friendID)
         {

       	  console.log("->sendFriendRequest :"+friendID)
             FriendService.sendFriendRequest(friendID)
                 .then(
                              function(d) {
                                   $scope.friend = d;
                                   
                                  alert("Friend Request : " + $scope.friend.errorMessage)
                              },
                               function(errResponse){
                                   console.error('Error while sending friend request');
                               }
                      );
         
        	 
         }
          
             
         $scope.getMyFriends = function(){
        	  console.log("Getting my friends")
              FriendService.getMyFriends()
                  .then(
                               function(d) {
                                    $scope.friends = d;
                                    console.log($scope.friends)
                                     	/* $location.path('/view_friend');*/
                                    console.log("friends"+$scope.friends);
                               },
                                function(errResponse){
                                    console.error('Error while fetching Friends');
                                }
                       );
          };
            
       
         $scope.updateFriendRequest = function(friend, id){
              FriendService.updateFriendRequest(friend, id)
                      .then(
                             $scope.fetchAllFriends, 
                              function(errResponse){
                                   console.error('Error while updating Friend.');
                              } 
                  );
          };
 
        $scope.acceptFriendRequest = function(id){
        	 console.log("Accept request....");
              FriendService.acceptFriendRequest(id)
                      .then(
                              $scope.getMyFriendRequests(), 
                              function(errResponse){
                                   console.error('Error while acceptFriendRequest');
                              } 
                  );
          };
          
          $scope.rejectFriendRequest = function(id){
        	  console.log("reject friend request....");
              FriendService.rejectFriendRequest(id)
                      .then(
                              $scope.fetchAllFriends, 
                              function(errResponse){
                                   console.error('Error while rejectFriendRequest');
                              } 
                  );
          };
          
        $scope.unFriend = function(id){
              FriendService.unFriend(id)
                      .then(
                              $scope.fetchAllFriends, 
                              function(errResponse){
                                   console.error('Error while unFriend ');
                              } 
                  );
          };
          
          $scope.fetchAllUsers = function() {
				UserService.fetchAllUsers().then(function(d) {
					$scope.users = d;
				}, function(errResponse) {
					console.error('Error while fetching Users');
				});
			};
            
 
        
 
          $scope.checkFriendRequestStatus=function(){
        	console.log("checkFriendRequestStatus....."); 
        	FriendService
        	             .checkFriendRequestStatus()
        	            		 .then(
        	                              self.fetchAllFriends, 
        	                              function(errResponse){
        	                                   console.error('Error while Checking Friend Request Status.');
        	                              } 
        	            		 
        	             
        	             );
          };
     
 
      }]);