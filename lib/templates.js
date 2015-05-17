if (Meteor.isClient) {
    var lastConversationEditClick = moment();

    Template.conversation.helpers({
        'getConversations': function () {
            Meteor.subscribe('conversations', this.commentableId);
            return Conversation.find({parentId: {$exists: false}}).fetch();
        }
    });

    Template.conversation.events({
        'click #conversationSubmit': function (e) {
            e.preventDefault();
            var newConversation = {
                commentableId: this.commentableId,
                content: $('#newConversationContent').html(),
                userId: Meteor.userId(),
                createdAt: new Date(),
                replies: []
            };

            Meteor.call('insertConversation', newConversation, function (error, result) {
                if (!error) {
                    $('#newConversationContent').html('');
                }
            });
        }
    });

    Template.conversations.helpers({
        'canEdit': function () {
            return this.userId===Meteor.userId();
        },
        'userName': function(){
            Meteor.subscribe('allUsers');
            var user = Meteor.users.findOne(this.userId);
            var displayName;

            if (user) {
                if (user.emails && user.emails[0]) {
                    displayName = user.emails[0].address;
                }

                if (user.username) {
                    displayName = user.username;
                }

                return displayName;
            }
        },
        'getReplies': function () {
            return Conversation.find({parentId:this._id}).fetch();
        }
    });

    Template.conversations.events({
        'click #conversationRemove': function (e) {
            e.preventDefault();
            if(this.parentId){
                var parent = Conversation.findOne({_id:this.parentId});
                parent.replies.pop(this._id);
                Meteor.call('updateConversation', parent);
            }
            Meteor.call('removeConversation', this._id);
        },
        'click #conversationEdit': function (e) {
            e.preventDefault();
            if(moment().diff(lastConversationEditClick,'seconds')>0){
                if($('#conversationContent-'+this._id).attr('contenteditable')==='false'){
                    $('#conversationContent-'+this._id).attr('contenteditable','true');
                    $('#conversationEditIcon-'+this._id).removeClass('mdi-content-create').addClass('mdi-content-save');
                }else if($('#conversationContent-'+this._id).attr('contenteditable')==='true'){
                    this.content = $('#conversationContent-'+this._id).html()
                    Meteor.call('updateConversation', this);
                    $('#conversationContent-'+this._id).attr('contenteditable','false');
                    $('#conversationEditIcon-'+this._id).removeClass('mdi-content-save').addClass('mdi-content-create');
                }
            }
            lastConversationEditClick = moment()
        },
        'click #conversationReply': function (e) {
            e.preventDefault();
            $('#divReply-'+this._id).html(UI.toHTML(Template['reply']));
        },
        'click #replyCancel': function (e) {
            e.preventDefault();
            $('#divReply-'+this._id).empty();
        },
        'click #replySubmit': function (e) {
            e.preventDefault();

            var parent = this;

            var newConversation = {
                commentableId: parent.commentableId,
                parentId: parent._id,
                content: $('#replyContent').html(),
                userId: Meteor.userId(),
                createdAt: new Date(),
                replies: []
            };

            Meteor.call('insertConversation', newConversation, function (error, result) {
                if (!error) {
                    parent.replies.push(result._id);
                    Meteor.call('updateConversation', parent);
                }
            });

            $('#divReply-'+this._id).empty();
        }
    });



}