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
    link: {
        type: String
    }

});
const Email = mongoose.model("Email", emailSchema);
module.exports = Email;