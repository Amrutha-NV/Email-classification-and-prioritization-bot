const mongoose = require('mongoose');
const schema = mongoose.Schema;

const emailSchema = new schema({
    from: {
        type: String,
        requried: true,
    },
    to: {
        type: String,
        requried: true,
    },
    subject: {
        type: String,
        requried: true,
    },
    body: {
        type: String,
        requried: true,
    },
    label: {
        type: String,
        requried: true,
    },
    urgent: {
        type: Boolean,
    },
    spam:{
        type: Boolean
    },
    link: {
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    gmail_message_id: {
        type: String,
    },
    gmail_thread_id: {
        type: String,
    },

    

});
const Email = mongoose.model("Email", emailSchema);
module.exports = Email;