app.controller("chatcontroller", ['chatservice','$scope', '$location', '$rootScope', function($scope,$rootScope ,chatservice) 
{
    $scope.messages = [];
    $scope.message = "";
    $scope.max = 140;
    
    $scope.addMessage = function() 
    {
    	console.log($rootScope.currentUser.name+' : '+$scope.message)
      chatservice.send($rootScope.currentUser.name+' : '+$scope.message);
      $scope.message = "";
    };
    
    chatservice.receive()
    .then(null, null, function(message) 
    {
    	
      $scope.messages.push(message);
    });
}]);