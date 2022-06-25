const mongoose = require('mongoose');

const {Schema} = mongoose;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'created'
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: 'Project'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdAt: Number,
    updatedAt: Number,
},{timestamps: true});

module.exports = mongoose.models.Task || mongoose.model('Task', TaskSchema);