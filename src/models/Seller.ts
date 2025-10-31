import mongoose, { Schema } from "mongoose";

const sellerSchema = new Schema(
  {
    id: {
      type: String,
      required: [true, "Unique id is required!"],
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
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
    },
    shopName: {
      type: String,
      required: [true, "Shop name is required"],
      trim: true,
    },
    shopAddress: {
      type: String,
      trim: true,
    },
    bankAccount: {
      type: String,
      trim: true,
    },
    products: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Product",
        },
      ],
      default: [],
    },
    logoUrl: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Seller =
  mongoose.models.Seller ?? mongoose.model("Seller", sellerSchema);

// export type SellerType = InferSchemaType<typeof sellerSchema>;
