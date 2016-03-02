'use strict';

app.factory('Auth',function(FIREBASE_URL,$rootScope,$q){
  var ref=new Firebase(FIREBASE_URL);

  var Auth={
    register: function(user){
      var deferred = $q.defer();
      ref.createUser({
        email: user.email,
        password: user.pass
      },function(error,userData){
          if(error){
            console.log("Error creating User");
          }
          else{
             var uref=new Firebase(FIREBASE_URL+'/Users/'+user.name)
             uref.set({name:user.name,likes:0,email:user.email,status:'',dp:''});
             console.log("Succesfully created user with uid:",userData.uid)
             var message="Account successfuly created Hooman!!";
             deferred.resolve();
          };
     
    });
      return deferred.promise;
  },
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

  return Auth;
});