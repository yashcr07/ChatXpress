'use strict';

app.factory('Auth', function($rootScope, FIREBASE_URL, $q, $firebaseAuth,$firebaseObject){
  var ref = new Firebase(FIREBASE_URL);
  var userAuth = $firebaseAuth(ref);
  var Auth = {
    register: function(user){
      var deferred = $q.defer();
      ref.createUser({
        email: user.email,
        password: user.pass
      },function(error,userData){
          if(error){
            deferred.reject(error.message)
          }
          else{
           var uref=ref.child('/Users/'+userData.uid)
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
      var deferred=$q.defer();
      if(Auth.user.profile && Auth.user.accept) {
          Auth.user.profile.$destroy();
          console.log("logging out");
          Auth.user.accept.$destroy();
           Auth.user.sessions.$destroy();
          angular.copy({}, Auth.user);
      }
      ref.unauth();
      return deferred.promise;
    },
    
    // Checks for existing usernames

    check:function(name){
      var deferred=$q.defer();
      var nameref=ref.child('Users/');
      var u_msg='';
      nameref.once("value",function(snapshot){
        snapshot.forEach(function(nameSnapshot){
          var key=nameSnapshot.key();
          console.log(key);
          if(key==name){
            console.log("User Exists")
            u_msg='Username not available';
            deferred.reject(u_msg);
            return false;
          }
          console.log(u_msg);
          u_msg='Available';
          // console.log(name);
          if(name==undefined)
            u_msg='';
          deferred.resolve(u_msg);
        }); 
      });
      return deferred.promise;
    },

    

    //checks authentication state

    resolveUser:function(){
      return userAuth.$getAuth();
    },

    loggedIn:function(){
      return !!Auth.user.provider;
    },

    user:{}
  };

  userAuth.$onAuth(function(authData){
    if(authData){
      angular.copy(authData,Auth.user);
      Auth.user.profile = $firebaseObject(ref.child('Users').child(authData.uid));
    }
  });

  return Auth;
});