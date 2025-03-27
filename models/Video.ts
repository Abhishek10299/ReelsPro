import mongoose, { model, models, Schema } from "mongoose";

export const VIDEO_DIMENSIONS = {
  width: 1080,
  hight: 1920,
} as const;

export interface IVideo {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  thumbanilUrl: string;
  controls?: boolean;
  transformation?: { hight: number; width: number; quality?: number };
  createdAt?: Date;
  updatedAt?: Date;
}

const videoSchema = new Schema<IVideo>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    videoUrl: { type: String, required: true },
    thumbanilUrl: { type: String, required: true },
    controls: { type: String, default: true },
    transformation: {
      hight: { type: String, default: VIDEO_DIMENSIONS.hight },
      width: { type: String, default: VIDEO_DIMENSIONS.hight },
      quality: { type: Number, min: 1, max: 100 },
    },
  },
  { timestamps: true }
);

const Video = models?.Video || model<IVideo>("Video", videoSchema);

export default Video;