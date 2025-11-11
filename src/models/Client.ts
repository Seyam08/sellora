import mongoose, { Schema } from "mongoose";

export const ClientSchema = new Schema(
  {
    id: {
      type: String,
      required: [true, "Unique id is required!"],
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Please provide a Username!"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: String,
    email: {
      type: String,
      required: [true, "Please provide a unique email"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      unique: true,
    },
    address: String,
    orderHistory: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Order",
        },
      ],
      default: [],
    },
    avatar: {
      _id: false,
      type: {
        url: { type: String, trim: true, required: false },
        publicId: { type: String, trim: true, required: false },
      },
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Client =
  mongoose.models.Client ?? mongoose.model("Client", ClientSchema);

// type ClientType = InferSchemaType<typeof ClientSchema>;
