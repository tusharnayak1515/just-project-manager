const mongoose = require('mongoose');

const {Schema} = mongoose;

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tasks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Task'
        }
    ],
    status: {
        type: String,
        default: 'created'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Number,
    updatedAt: Number,
},{timestamps: true});

module.exports = mongoose.models.Project || mongoose.model('Project', ProjectSchema);