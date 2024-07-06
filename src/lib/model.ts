// models/ImageModel.ts
import mongoose, { Schema, Document, Model } from "mongoose";

interface IImage extends Document {
  _id: mongoose.Types.ObjectId;
  imageUrl: string;
  width: number;
  height: number;
  croppedImageUrl?: string;
}

const ImageSchema: Schema<IImage> = new Schema({
  imageUrl: {
    type: String,
    required: true,
  },
  width: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  croppedImageUrl: {
    type: String,
    required: false,
  },
});

const ImageModel: Model<IImage> = mongoose.models.ImageModel || mongoose.model<IImage>("ImageModel", ImageSchema);
export default ImageModel;
