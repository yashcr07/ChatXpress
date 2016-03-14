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
            deferred.reject(error.message)
          }
          else{
             var uref=ref.child('/Users/'+user.name)
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
    
    check:function(name){
      var deferred=$q.defer();
      var nameref=ref.child('Users/');
      var u_msg='';
      nameref.once("value",function(snapshot){
        snapshot.forEach(function(nameSnapshot){
          var key=nameSnapshot.key();
          if(key==name){
            console.log("User Exists")
            debugger;
            u_msg='Username not available';
            console.log(u_msg);
            deferred.reject(u_msg);
          }
          u_msg='Available'
          deferred.resolve(u_msg);
        }); 
      });
      return deferred.promise;
    },
    user:{}
  };

  return Auth;
});