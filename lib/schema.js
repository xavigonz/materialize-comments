ConversationSchema = new SimpleSchema({
    commentableId: {
        type: String
    },
    parentId: {
        type: String,
        optional: true
    },
    content: {
        type: String
    },
    userId: {
        type: String
    },
    createdAt: {
        type: Date
    },
    replies: {
        type: [String],
        optional: true
    }
});