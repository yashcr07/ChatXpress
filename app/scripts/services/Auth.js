'use strict';

app.factory('Auth',function(FIREBASE_URL,$rootScope,$q){
  var ref=new Firebase(FIREBASE_URL);

  var Auth={
    register: function(user){
      ref.createUser({
        email: user.email,
        password: user.pass
      },function(error,userData){
          if(error){
            console.log("Error creating User");
          }
          else
            console.log("Succesfully created user with uid:",userData.uid)
        }
      )}
    ,
    login: function(user){
      var deferred = $q.defer();
      ref.authWithPassword({
        email:user.email,
        password:user.pass
      },function(error,authData){
        if(error){
          console.log("Error logging in user");
          deferred.reject(error);
        }
        else
          deferred.resolve();
      })
      return deferred.promise;
    },
    logout: function(){
      auth.$logout();
    },
    /*resolveUser: function(){
      return auth.getCurrentUser();
    },
    signedIn:function(){
      return !!Auth.user.provider;
    },*/
    user:{}
  };

  /*$rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    console.log('logged in');
    angular.copy(user, Auth.user);
  });
  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    console.log('logged out');
    angular.copy({}, Auth.user);
  });*/

  return Auth;
});