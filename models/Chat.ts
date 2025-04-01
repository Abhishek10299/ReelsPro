import mongoose, { model, models, Schema } from "mongoose";

export interface IMessage {
  sender: mongoose.Types.ObjectId;
  content: string;
  timestamp: Date;
}

export interface IChat {
  participants: mongoose.Types.ObjectId[];
  messages: IMessage[];
  lastUpdated: Date;
}

const chatSchema = new Schema<IChat>({
  participants: [{ type: Schema.Types.ObjectId, ref: "User" }],
  messages: [
    {
      sender: { type: Schema.Types.ObjectId, ref: "User" },
      content: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  lastUpdated: { type: Date, default: Date.now },
});

const Chat = models?.Chat || model<IChat>("Chat", chatSchema);
export default Chat;
