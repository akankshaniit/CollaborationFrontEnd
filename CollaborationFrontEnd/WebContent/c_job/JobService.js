'use strict';

app.factory('JobService',['$http', '$q','$rootScope',function($http, $q,$rootScope){
console.log("JobService..........")

	var BASE_URL='http://localhost:8080/CollaborationRestService'
		
		 return {
        
        fetchAllJobs: function() {
        	console.log("calling fetchAllJobs ")
                return $http.get(BASE_URL+'/jobs')
                        .then(
                                function(response){
                                    return response.data;
                                }, 
                               null
                        );
        },
        
        fetchAlljobApplications: function() {
        	console.log("calling fetchAllJobApplication ")
                return $http.get(BASE_URL+'/jobapp')
                        .then(
                                function(response){
                                    return response.data;
                                }, 
                               null
                        );
        },
        
        
        applyJob: function(jobID){
        	console.log("Add Job ID")
                return $http.post(BASE_URL+'/applyForJob/'+jobID)
                        .then(
                                function(response){
                                	
                                	
                                	
                                    return response.data;
                                }, 
                                function(errResponse){
                                    console.error('Error while Applying Job');
                                    return $q.reject(errResponse);
                                }
                        );
        },
        

        createJob: function(job){
         	console.log("calling create job")
                 return $http.post(BASE_URL+'/postAjob/', job) //1
                         .then(
                                 function(response){
                                     return response.data;
                                 }, 
                                 function(errResponse){
                                     console.error('Error while creating Job');
                                     return $q.reject(errResponse);
                                 }
                         );
         },
         
         updateJob: function( id){
          	console.log("calling Update Job ")
                  return $http.post(BASE_URL+'/updatejob/',id)  //2
                          .then(
                                  function(response){
                                      return response.data;
                                  }, 
                                  function(errResponse){
                                      console.error('Error while updating Job');
                                      return $q.reject(errResponse);
                                  }
                          );
          },
          
          accept: function(id) {
           	console.log("calling approve ")
                   return $http.get(BASE_URL+'/acceptjob/'+id)
                           .then(
                                   function(response){
                                       return response.data;
                                   }, 
                                   function(errResponse){
                                       console.error('Error while accept Job');
                                       return $q.reject(errResponce);
                                   }
                           );
           },
          
           deleteJob: function(id) {
              	console.log("calling deletejob ")
                      return $http.delete(BASE_URL+'/deletejob/'+id)
                              .then(
                                      function(response){
                                          return response.data;
                                      }, 
                                     function(errResponce){
                                    	  console.error("error while deleting Job");
                                    	  return $q.reject(errResponce);
                                      }
                              );
              }, 
        
              getJob: function(id) {
              	console.log("calling getjob ")
                      return $http.get(BASE_URL+'/jobapp/'+id)
                              .then(
                                      function(response){
                                      	
                                      	$rootScope.appliedJobs=response.data;
                                      	console.log($rootScope.appliedJobs);
                                          return response.data;
                                      }, 
                                     function(errResponse){
                                    	  console.error("error while get job");
                                    	  return $q.get(errResponse);
                                      }
                              );
              },      

              getByJobID:function(id){
              	console.log("Calling getByJobID");
              	 return $http.get(BASE_URL+'/job/'+id)
              	 .then(
                           function(response){
                        	   
                               return response.data;
                           }, 
                           function(errResponse){
                               console.error('Error while Getting ID');
                              
                           }
                   );
              },
              
              callForInterview: function(user_id, remarks) {
               	console.log("callForInterview service ")
                       return $http.put(BASE_URL+'/callForInterview/'+user_id+'/'+remarks)
                               .then(
                                       function(response){
                                           return response.data;
                                       }, 
                                       function(errResponse){
                                     	  console.error("error while calling Interview");
                                     	  return $q.reject(errResponse);
                                       }
                               );
               },
              
               rejectJobApplication: function(user_id, remarks) {
                  	console.log("rejectJobApplication service ")
                          return $http.put(BASE_URL+'/rejectJobApplication/'+user_id+'/'+remarks)
                                  .then(
                                          function(response){
                                              return response.data;
                                          }, 
                                          function(errResponse){
                                        	  console.error("error while rejecting JobApplivation");
                                        	  return $q.reject(errResponse);
                                          }
                                  );
                  },
                 
              
}
}]);	