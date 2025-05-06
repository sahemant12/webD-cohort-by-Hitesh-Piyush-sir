import mongoose, {Schema} from "mongoose";
import {AvailableTaskStatus, TaskStatusEnum} from "../utils/constants.js"

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
    },
    project: {
        type: Schema.Types.ObjectId,
        ref: "Project",
        required: [true, "project ref is required"],
    },
    assignedTo: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    assignedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    Status: {
        type: String,
        enum: AvailableTaskStatus,
        default: TaskStatusEnum.TODO,
    },
    attachments: {
        type: [
            {
                url: String,
                mimetype: String,
                size: Number,
            }
        ],
        default: [],
    }
}, {timestamps: true});

export const Task = mongoose.model("Task", taskSchema);