import { ClientSchema } from "@/models/Client";
import { sellerSchema } from "@/models/Seller";
import { InferSchemaType } from "mongoose";

export type ClientType = Omit<
  InferSchemaType<typeof ClientSchema>,
  "DefaultTimestampProps" | "createdAt" | "updatedAt" | "orderHistory"
>;
export type ClientResponseType = Omit<ClientType, "password">;
export type SellerType = InferSchemaType<typeof sellerSchema>;
