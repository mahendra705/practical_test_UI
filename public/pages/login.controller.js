// Login Controller ===============
app.controller('LoginController', function ($scope, userFctry, localStorageService, $location) {

    //Init Function it calls on page load
    function Init() {
        localStorageService.clearAll();   //Clear cheche
    }

    //It calls when user click on login button
    $scope.submit = function () {

        var params = {
            name: $scope.userName,
            password: $scope.userPwd
        };

        //call login api 
        userFctry.api.userLogin(params,
            function (response) {
                if (response != null) {
                    if (response.success == true) {
                        var userObj = {
                            userName: response.username,
                            token: response.token
                        }
                        localStorageService.set('userDetails', userObj);     //set response data in local storage
                        $location.path('/video');                           //Redirect to videos screen
                    }
                    else {
                        alert(response.message);
                    }
                }
                else {
                    alert('Error in Logging');
                }
            });
    }

    Init();
});