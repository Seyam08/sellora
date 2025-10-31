import { ClientSchema } from "@/models/Client";
import { sellerSchema } from "@/models/Seller";
import { InferSchemaType } from "mongoose";

export type ClientType = InferSchemaType<typeof ClientSchema>;
export type SellerType = InferSchemaType<typeof sellerSchema>;
