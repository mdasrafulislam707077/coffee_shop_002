import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest, res) {
  const formData = await req.formData();
  const query = formData.get("query");

  // prodects

  const result = await axios.post("http://127.0.0.1:9000/getProdect/", {
    query: query,
    prodects: JSON.parse(formData.get("prodects"))["prodects"],
  });
  if (result?.data?.success) {
    return NextResponse.json({ success: true });
  } else {
    return NextResponse.json({ success: false });
  }
}
