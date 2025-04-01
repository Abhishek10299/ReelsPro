import { model, models, Schema } from "mongoose";

export interface IFriendRequest {
  sender: Schema.Types.ObjectId;
  receiver: Schema.Types.ObjectId;
  status: "pending" | "pending" | "rejected";
  timestamp: Date;
}

const friendSchema = new Schema<IFriendRequest>({
  sender: { type: Schema.Types.ObjectId, ref: "User", require: true },
  receiver: { type: Schema.Types.ObjectId, ref: "User", require: true },
  status: {
    type: String,
    enum: ["pending", "pending", "rejected"],
    default: "pending",
  },
  timestamp: { type: Date, default: Date.now },
});

const Friend = models?.Friend || model<IFriendRequest>("Friend", friendSchema);
export default Friend;
