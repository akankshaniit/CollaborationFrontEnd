'use strict';
 
app.factory('FriendService', ['$http', '$q','$rootScope', function($http, $q,$rootScope){
	
	console.log("FriendService...")
	
	var BASE_URL='http://localhost:8080/CollaborationRestService'
    return {
         
		getMyFriends: function() {
			console.log("hiii....");
                    return $http.get(BASE_URL+'/myfriends')
                            .then(
                     
                                    function(response){
                                    	
                                        return response.data;
                                    }, 
                                   null
                            );
            },
             
            sendFriendRequest: function(friendID){
            	console.log("Add Friend ID")
                    return $http.get(BASE_URL+'/addFriend/'+friendID)
                            .then(
                                    function(response){
                                    	if(response.data.errorCode==404)
                                    	{
                                    		alert(response.data.errorMessage)
                                    	}
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while Sending friend request');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
            
            getMyFriendRequests: function(){
            	console.log("FriendService getMyFriendRequest method");
                return $http.get(BASE_URL+'/getMyFriendRequests/')
                        .then(
                        		
                                function(response){
                                	
                                    return response.data;
                                }, 
                                function(errResponse){
                                    console.error('Error while Feaching  friend Request');
                                    return $q.reject(errResponse);
                                }
                        );
        },
        
        checkFriendRequestStatus: function(){
       	 return $http.get(BASE_URL+'/friendreqeststatus/')  
       	                      .then(
       	                    		  function(response){
                                             return response.data;
                                         }, 
                                         
                                         function(errResponse){
                                             console.error('Error while checking friend request status');
                                             return $q.reject(errResponse);
                                         }
       	                      
       	                      );
          },
   
          acceptFriendRequest: function(friendID){
        	console.log("Starting of the method acceptFriendRequest")
             $http.put(BASE_URL+'/acceptFriend/'+friendID)
                    .then(
                            function(data){
                            	console.log(data);
                            	console.log("data updated....");
                               
                            }, 
                            function(errResponse){
                                console.error('Error while creating acceptFriendRequest');
                                return $q.reject(errResponse);
                            }
                    );
    },
         
    rejectFriendRequest: function(friendID){
    	console.log("Starting of the method rejectFriendRequest")
        return $http.put(BASE_URL+'/rejectFriend/'+friendID)
                .then(
                        function(response){
                            return response.data;
                        }, 
                        function(errResponse){
                            console.error('Error while rejectFriendRequest');
                            return $q.reject(errResponse);
                        }
                );
},
     
unFriend: function(friendID){
	console.log("Starting of the method unFriend")
    return $http.get(BASE_URL+'/getMyFriendRequests/'+friendID)
            .then(
                    function(response){
                        return response.data;
                    }, 
                    function(errResponse){
                        console.error('Error while unFriend ');
                        return $q.reject(errResponse);
                    }
            );
},
 
             
        //Not required because we are not deleting the record
            deleteFriend: function(id){
                    return $http.delete(BASE_URL+'/friend/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while deleting friend');
                                        return $q.reject(errResponse);
                                    }
                            );
            }
            
           
         
    };
    
   
    
    
          
 
}]);