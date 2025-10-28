import { NextResponse } from "next/server";

export function GET(_: Request) {
  return NextResponse.json({
    message: "Hello users! This response is from Sellora!!!",
  });
}
