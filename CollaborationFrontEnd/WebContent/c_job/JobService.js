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
        
        applyJob: function(jobID){
        	console.log("Add Job ID")
                return $http.get(BASE_URL+'/addJob/'+jobID)
                        .then(
                                function(response){
                                	if(response.data.errorCode==404)
                                	{
                                		alert(response.data.errorMessage)
                                	}
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
                 return $http.post(BASE_URL+'/createjob/', job) //1
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
         
         updateJob: function(job, id){
          	console.log("calling fetchAllJobs ")
                  return $http.post(BASE_URL+'/updatejob/'+id, job)  //2
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
                      return $http.get(BASE_URL+'/job/'+id)
                              .then(
                                      function(response){
                                      	
                                      	$rootScope.selectedJob=response.data
                                          return response.data;
                                      }, 
                                     function(errResponse){
                                    	  console.error("error while get job");
                                    	  return $q.get(errResponse);
                                      }
                              );
              },      
}

}]);	