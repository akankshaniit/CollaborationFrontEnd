'use strict';

app.factory('BlogService',['$http', '$q','$rootScope',function($http, $q,$rootScope){
console.log("BlogService..........");


	var BASE_URL='http://localhost:8080/CollaborationRestService'
		
		 return {
        
        fetchAllBlogs: function() {
        	console.log("calling fetchAllBlogs ")
                return $http.get(BASE_URL+'/blogs')
                        .then(
                                function(response){
                                    return response.data;
                                }, 
                               null
                        );
        },
		
		
		createBlog: function(blog){
         	console.log("calling create blog")
                 return $http.post(BASE_URL+'/createblog/', blog) //1
                         .then(
                                 function(response){
                                     return response.data;
                                 }, 
                                 function(errResponse){
                                     console.error('Error while creating Blog');
                                     return $q.reject(errResponse);
                                 }
                         );
         },
         
         
         updateBlog: function(blog, id){
         	console.log("calling fetchAllBlogs ")
                 return $http.post(BASE_URL+'/updateblog/'+id, blog)  //2
                         .then(
                                 function(response){
                                     return response.data;
                                 }, 
                                 function(errResponse){
                                     console.error('Error while updating blog');
                                     return $q.reject(errResponse);
                                 }
                         );
         },
         accept: function(id) {
         	console.log("calling approve ")
                 return $http.get(BASE_URL+'/acceptblog/'+id)
                         .then(
                                 function(response){
                                     return response.data;
                                 }, 
                                 function(errResponse){
                                     console.error('Error while accept Blog');
                                     return $q.reject(errResponce);
                                 }
                         );
         },
         
         deleteBlog: function(id) {
           	console.log("calling deleteblog " +id)
                   return $http.delete(BASE_URL+'/deleteblog/'+id)
                           .then(
                                   function(response){
                                       return response.data;
                                   }, 
                                  function(errResponce){
                                 	  console.error("error while deleting blog");
                                 	  return $q.reject(errResponce);
                                   }
                           );
           }, 
           
         reject: function(id, reason) {
         	console.log("calling reject ")
                 return $http.get(BASE_URL+'/rejectblog/'+id+'/'+reason)
                         .then(
                                 function(response){
                                     return response.data;
                                 }, 
                                 function(errResponse){
                               	  console.error("error while rejecting blog");
                               	  return $q.reject(errResponse);
                                 }
                         );
         },
        
          getBlog: function(id) {
            	console.log("calling getblog ")
                    return $http.get(BASE_URL+'/blog/'+id)
                            .then(
                                    function(response){
                                    	
                                    	$rootScope.selectedBlog=response.data;
                                    	console.log($rootScope.selectedBlog);
                                        return response.data;
                                    }, 
                                   function(errResponse){
                                  	  console.error("error while get blog");
                                  	  return $q.get(errResponse);
                                    }
                            );
            }, 
            
            createComment:function(comment){
            	console.log("calling CreateComment...");
            	
            	 return $http.post(BASE_URL+'/addComment/', comment) //1
                 .then(
                         function(response){
                             return response.data;
                         }, 
                         function(errResponse){
                             console.error('Error while creating Comment');
                             return $q.reject(errResponse);
                         }
                 );	
            },
            fetchAllComments: function(id) {
            	console.log("calling fetchAllComments " +id)
            	
                    return $http.get(BASE_URL+'/comments/'+id)
                            .then(
                                    function(response){
                                        return response.data;
                                    }, 
                                   null
                            );
            },
    		
          
}

}]);	