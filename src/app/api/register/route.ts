import { checkContentType, ContentReturn } from "@/lib/api/globalApiHelper";
import { connectDB } from "@/lib/mongoConnection";
import { ErrorResponse, SuccessResponse } from "@/types/api/ResponseTypes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // db connection
    await connectDB();

    const contentType = req.headers.get("content-type"); // get content type

    const content: ContentReturn = checkContentType(contentType); // check content type

    // extracting data if content type is json
    if (content === "json") {
      const extract = await req.json();
      // console.log(extract);
      return NextResponse.json({ data: "json data" });
    }
    // extracting data if content type is form data
    if (content === "form-data") {
      const extract = await req.formData();
      // console.log(extract);

      const response: SuccessResponse<string> = {
        message: "success",
        data: "124",
      };

      return NextResponse.json(response);
    }
    // if any other type of content then return error
    if (content === "invalid") {
      return NextResponse.json(
        { errors: { message: "invalid content type" } } satisfies ErrorResponse,
        { status: 500 }
      );
    }
    // default case
    return NextResponse.json(
      { errors: { message: "Failed to get data!" } } satisfies ErrorResponse,
      { status: 400 }
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
