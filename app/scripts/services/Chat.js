'use strict'

app.factory('Chat',function(FIREBASE_URL,$rootScope,$q,$firebaseArray,$filter,FileReader){

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
      console.log(userArray);
      return userArray;
    },

    uploadImage:function(url,uid){
      console.log("Called"+url)
      ref.child('Users/'+uid).update({dp:url})
      
    },

    addInterest:function(intrst,uid){
      var intr=[];
      for(var i=0;i<intrst.length;i++)
        intr.push(intrst[i].text);
      ref.child('Users/'+uid+'/').update({"interests":intr});
      /*ref.child('/Users/'+uid+'/interests').once(function(data){
        return data.val();
      })*/
    },

    loadInterest:function(uid){
      var interest=[]
      ref.child('Users/'+uid+"/interests").on('child_added',function(snapshot){
        interest.push({text:snapshot.val()});
        console.log(interest);
      });
      return interest;
    },

    load_msg:function(name,frm){
      var deferred = $q.defer();
      var sref=ref.child('/Chats/'+frm);
      var rref=ref.child('Chats/'+name);
      var s_msgArray=[];
      console.log("loading");
      sref.on('child_added',function(messages){
        s_msgArray.push({date:messages.val().date,from:messages.val().from,to:messages.val().to,message:messages.val().message,time:messages.val().time,timestamp:messages.val().timestamp});
      },function(error){
        deferred.reject(error);
      });

      rref.on('child_added',function(messages){
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