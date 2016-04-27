'use strict'

app.factory('Chat',function(FIREBASE_URL,$rootScope,$q,$firebaseArray){

  var ref=new Firebase(FIREBASE_URL);
  var frm='';
  var Chat={
  
    send_msg:function(msg,to,frm){
      console.log(msg);
      ref.child('/Chats/'+frm).push({message:msg,date:'',to:to});
    },

    //load user list

    load_users:function(){
      var list=[];
      var userArray=$firebaseArray(ref.child('/Users'))
      return userArray;
    },

    load_msg:function(name){
      console.log(frm);
      var lref=ref.child('/Chats/'+frm);
      lref.orderByChild("to").equalTo(name).on('child_added',function(messages){
        console.log(messages.key())
      })
      //return msgArray;
    }
  };
  return Chat;
});