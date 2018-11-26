var app = angular.module('topicsApp', []);

app.controller('TopicsController', function ($scope, $window) {

    var auth2;

    $scope.topics = {};

    $window.appStart = function () {
        console.log('appStart()');
        gapi.load('auth2', initSigninV2);
    };

    var initSigninV2 = function () {
        console.log('initSigninV2()');
        auth2 = gapi.auth2.getAuthInstance();
        auth2.isSignedIn.listen(signinChanged);
        auth2.currentUser.listen(userChanged);

        if (auth2.isSignedIn.get() == true) {
            auth2.signIn();
        }
    };

    var signinChanged = function (isSignedIn) {
        console.log('signinChanged() = ' + isSignedIn);
        if (isSignedIn) {
            console.log('the user must be signed in to print this');
            var googleUser = auth2.currentUser.get();
            var authResponse = googleUser.getAuthResponse();
            var profile = googleUser.getBasicProfile();

            $scope.topics.email = profile.getEmail();

            $scope.$digest();
        } else {
            console.log('the user must not be signed in if this is printing');
            $scope.topics.email = {};
            $scope.$digest();
        }
    };

    var userChanged = function (user) {
        console.log('userChanged()');
    };

    $scope.signOut = function () {
        console.log('signOut()');
        auth2.signOut().then(function () {
            signinChanged(false);
        });
        console.log(auth2);
    };

    $scope.disconnect = function () {
        console.log('disconnect()');
        auth2.disconnect().then(function () {
            signinChanged(false);
        });
        console.log(auth2);
    };
});

