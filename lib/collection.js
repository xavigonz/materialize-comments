Conversation = new Mongo.Collection("conversation");

Conversation.allow({
    insert: function(){
        return true;
    },
    update: function(){
        return true;
    },
    remove: function(){
        return true;
    }
});

Meteor.methods({
    'insertConversation': function(conversation){
        check(conversation,ConversationSchema);
        var conversationId = Conversation.insert(conversation,function(error){
            if(error){
                throw Meteor.Error(error.reason);
            }
        });
        return {
            _id: conversationId
        }
    },
    'removeConversation': function(conversationId){
        Conversation.remove(conversationId,function(error,result){
            if(error){
                throw Meteor.Error(error.reason);
            }else{
                return result;
            }
        });
    },
    'updateConversation': function(conversation){
        Conversation.upsert({_id: conversation._id}, conversation,function(error,result){
            if(error){
                throw Meteor.Error(error.result);
            }else{
                return result;
            }
        });
    }
});