'use strict';
 
app.service('UserService', ['$http', '$q','$rootScope', function($http, $q,$rootScope){
	
	console.log("UserService...")
	
	var BASE_URL='http://localhost:8080/CollaborationRestService'
		
    return {
         
            fetchAllUsers: function() {
            	console.log("calling fetchAllUsers ")
                    return $http.get(BASE_URL+'/listAllUsersNotFriends')
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                   null
                            );
            },
            
            getByID:function(id){
            	console.log("Calling getByID");
            	 return $http.get(BASE_URL+'/user/'+id)
            	 .then(
                         function(response){
                             return response.data;
                         }, 
                         function(errResponse){
                             console.error('Error while Getting ID');
                            
                         }
                 );
            },
            
            
            myProfile: function() {
            	console.log("calling myProfile ")
                    return $http.get(BASE_URL+'/myProfile')
                            .then(
                                    function(response){
                               
                                        return response.data;
                                    }, 
                                   null
                            );
            },
            
            accept: function(id) {
            	console.log("calling approve ")
                    return $http.get(BASE_URL+'/accept/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while accept registration');
                                       
                                    }
                            );
            },
            
            reject: function(id, reason) {
            	console.log("calling reject ")
                    return $http.get(BASE_URL+'/reject/'+id+'/'+reason)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    null
                            );
            },
             
            createUser: function(user){
            	console.log("calling create user")
                    return $http.post(BASE_URL+'/createuser/', user) //1
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while creating user');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
            updateUser: function(user, id){
            	console.log("calling fetchAllUsers ")
                    return $http.post(BASE_URL+'/updateUser/', user)  //2
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                    function(errResponse){
                                        console.error('Error while updating user');
                                        return $q.reject(errResponse);
                                    }
                            );
            },
             
              
            logout: function(){
            	console.log('User Service logout....')
                return $http.get(BASE_URL+'/logout')
                        .then(
                                function(response){
                                    return response.data;
                                }, 
                              null
                        );
        },
        
        
            
            validate: function(user){
            	   console.log("Calling the method authenticate with the user :"+user)
          		  
                return $http.post(BASE_URL+'/validate',user)
              
                        .then(
                        		
                        		 
                                function(response){
                                console.log("data returned: "+response.data);
                                
                                    return response.data;   //user json object
                              
                                    
                                }, 
                               null
                              
                        );
        }
         
    };
 
}]);