if (Meteor.isServer) {
    Meteor.publish('conversations', function (id) {
        return Conversation.find({commentableId:id});
    });
}