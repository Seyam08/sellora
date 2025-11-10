import { generateUniqueId } from "@/helper/getRandomId";
import { uploadImage } from "@/lib/api/cloudinary/upload-image";
import {
  checkContentType,
  ContentReturn,
  getZodFormError,
} from "@/lib/api/globalApiHelper";
import {
  checkClientEmailExists,
  checkClientPhoneNumberExists,
  checkClientUsernameExists,
} from "@/lib/api/register/checkCredentialsExists";
import { connectDB } from "@/lib/mongoConnection";
import { Client } from "@/models/Client";
import { ZodClientSchema } from "@/schemas/client.schema";
import { ClientResponseType, ClientType } from "@/types/api/RegisterTypes";
import { ErrorResponse, SuccessResponse } from "@/types/api/ResponseTypes";
import { ImageUrl } from "@/types/globalTypes";
import bcrypt from "bcrypt";
import { UploadApiResponse } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // db connection
    await connectDB();

    const contentType = req.headers.get("content-type"); // get content type

    const content: ContentReturn = checkContentType(contentType); // check content type

    let data;
    // extracting data if content type is json
    if (content === "json") {
      data = await req.json();
    }
    // extracting data if content type is form data
    if (content === "form-data") {
      const formData = await req.formData();
      data = Object.fromEntries(formData.entries());
    }
    // if any other type of content then return error
    if (content === "invalid") {
      return NextResponse.json(
        { errors: { message: "invalid content type" } } satisfies ErrorResponse,
        { status: 400 }
      );
    }
    // parse data for validation
    const validateData = ZodClientSchema.safeParse(data);

    // if validation failed
    if (validateData.success === false) {
      const { formErrors, fieldErrors } = z.flattenError(validateData.error);
      const extractedFormError = getZodFormError(formErrors);

      const errorRes: ErrorResponse<object> = {
        errors: {
          message: "Register validation failed",
          error: {
            unrecognizedField: extractedFormError,
            ...fieldErrors,
          },
        },
      };
      return NextResponse.json(errorRes, { status: 422 });
    }

    const existEmail = await checkClientEmailExists(validateData.data.email);
    const existUsername = await checkClientUsernameExists(
      validateData.data.username
    );
    const existPhone = await checkClientPhoneNumberExists(
      validateData.data.phoneNumber
    );

    if (existEmail) {
      const errorRes: ErrorResponse<object> = {
        errors: {
          message: "Email already exist!",
          error: {
            email: validateData.data.email,
          },
        },
      };
      return NextResponse.json(errorRes, { status: 422 });
    }
    if (existUsername) {
      const errorRes: ErrorResponse<object> = {
        errors: {
          message: "Username already exist!",
          error: {
            username: validateData.data.username,
          },
        },
      };
      return NextResponse.json(errorRes, { status: 422 });
    }
    if (existPhone) {
      const errorRes: ErrorResponse<object> = {
        errors: {
          message: "Phone number already exist!",
          error: {
            phoneNumber: validateData.data.phoneNumber,
          },
        },
      };
      return NextResponse.json(errorRes, { status: 422 });
    }

    const hashedPassword = await bcrypt.hash(validateData.data?.password, 10);

    let imageUrl: ImageUrl | undefined;

    if (validateData.data?.avatar) {
      const image = validateData.data?.avatar;
      // upload the image
      const uploadResult: UploadApiResponse = await uploadImage(
        image,
        "sellora-client-avatar"
      );

      // console.log("Image Result: ", uploadResult);
      imageUrl = {
        url: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      };
    }

    const validateClient: ClientType = {
      id: generateUniqueId("client"),
      username: validateData.data?.username,
      email: validateData.data?.email,
      password: hashedPassword,
      name: validateData.data?.name,
      phoneNumber: validateData.data?.phoneNumber,
      address: validateData.data?.address,
      avatar: imageUrl,
    };

    const savedClient = await Client.create(validateClient);

    const responseData: ClientResponseType = {
      id: savedClient.id,
      username: savedClient.username,
      name: savedClient.name,
      email: savedClient.email,
      phoneNumber: savedClient.phoneNumber,
      address: savedClient.address,
      avatar: savedClient.avatar,
    };

    return NextResponse.json(
      {
        message: "success",
        data: responseData,
      } satisfies SuccessResponse<ClientResponseType>,
      {
        status: 200,
      }
    );
  } catch (error) {
    // if (error instanceof Error) {
    //   return NextResponse.json(
    //     {
    //       errors: {
    //         message: error.message,
    //       },
    //     } satisfies ErrorResponse,
    //     { status: 500 }
    //   );
    // } else {
    //   return NextResponse.json(
    //     {
    //       errors: {
    //         message: "Internal server error!",
    //       },
    //     } satisfies ErrorResponse,
    //     { status: 500 }
    //   );
    // }
    return NextResponse.json(
      {
        errors: {
          message: "Internal server error!",
        },
      } satisfies ErrorResponse,
      { status: 500 }
    );
  }
}
