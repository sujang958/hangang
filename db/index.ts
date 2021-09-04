import Mongoose, { Document } from "mongoose"

interface ICommandModel extends Document {
    _id: string
    name: string
    registered: boolean
}

export const connect = async (uri: string): Promise<void> => {
    await Mongoose.connect(uri)
}

export const CommandSchema = new Mongoose.Schema<ICommandModel>({
    _id: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    registered: {
        required: true,
        type: Boolean,
        default: false,
    }
})

export const CommandModel = Mongoose.model<ICommandModel>('commands', CommandSchema)