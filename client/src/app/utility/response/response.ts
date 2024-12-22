import { NextResponse } from "next/server";
export default function HttpResponse(data) {
  return new NextResponse(JSON.stringify(data), {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
    },
  });
}
