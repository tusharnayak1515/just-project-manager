const mongoose = require('mongoose');

const {Schema} = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    projects: [
        {
            type: Schema.Types.ObjectId,
            ref: "Project"
        }
    ],
    createdAt: Number,
    updatedAt: Number,
},{timestamps: true});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);