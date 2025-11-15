const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema({
    googleId: {
        type: String,
        unique: true,
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
     displayName: {
        type: String
    },
    gmail_refresh_token: {
        type: String,
        required: false // It's false because we might get a user who hasn't authorized Gmail yet
    },
     gmail_history_id: {
        type: String
    },
    
    // Tracks whether the user has completed the users.watch setup and sync is active.
    gmail_sync_status: {
        type: Boolean,
        default: false 
    }
}, { 
    // Adds 'createdAt' and 'updatedAt' fields automatically
    timestamps: true 
});

const User = mongoose.model("User", userSchema);
module.exports = User;





