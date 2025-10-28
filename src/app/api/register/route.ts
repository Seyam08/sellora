import { checkContentType, ContentReturn } from "@/lib/api/globalApiHelper";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const contentType = req.headers.get("content-type"); // get content type

    const content: ContentReturn = checkContentType(contentType); // check content type

    // extracting data if content type is json
    if (content === "json") {
      const extract = await req.json();
      console.log(extract);
      return NextResponse.json({ data: "json data" });
    }
    // extracting data if content type is form data
    if (content === "form-data") {
      const extract = await req.formData();
      console.log(extract);
      return NextResponse.json({ data: "form data" });
    }
    // if any other type of content then return error
    if (content === "invalid") {
      return NextResponse.json(
        { error: "invalid content type" },
        { status: 500 }
      );
    }
    // default case
    return NextResponse.json({ error: "No data found" }, { status: 400 });
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
