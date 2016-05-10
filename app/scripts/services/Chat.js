'use strict'

app.factory('Chat',function(FIREBASE_URL,$rootScope,$q,$firebaseArray,$filter){

  var ref=new Firebase(FIREBASE_URL);
  var s_msgArray=[];
  var Chat={
  
    send_msg:function(msg,to,frm){
      var s_msgArray=[];
      var time = new Date();
      var date = $filter('date')(time,'yyyyMMdd');
      var t=(time.getHours()<10?'0':'') + time.getHours()+ ":" + (time.getMinutes()<10?'0':'') + time.getMinutes();
      ref.child('/Chats/'+frm).push({message:msg,date:date,to:to,time:t,from:frm,timestamp:Firebase.ServerValue.TIMESTAMP});

    },

    load_users:function(){
      var userArray=$firebaseArray(ref.child('/Users'))
      return userArray;
    },

    //Senders msgs

    load_msg:function(name,frm){
      var deferred = $q.defer();
      var sref=ref.child('/Chats/'+frm);
      var rref=ref.child('Chats/'+name);
      var s_msgArray=[];
      console.log("loading");
      sref.on('child_added',function(messages){
          //console.log(messages.val())
            s_msgArray.push({date:messages.val().date,from:messages.val().from,to:messages.val().to,message:messages.val().message,time:messages.val().time,timestamp:messages.val().timestamp});
      },function(error){
        deferred.reject(error);
      });

      rref.on('child_added',function(messages){
        //console.log("load after send 2")
            s_msgArray.push({date:messages.val().date,from:messages.val().from,to:messages.val().to,message:messages.val().message,time:messages.val().time,timestamp:messages.val().timestamp});
          deferred.resolve(s_msgArray);
      },function(err){
        console.log(err);
      });
      
      return deferred.promise;
    }
  };
  return Chat;
});