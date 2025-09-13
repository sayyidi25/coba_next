// app/api/checkout/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("Checkout payload:", body); // akan tampil di terminal dev server
  // Di sini bisa panggil payment gateway, simpan order ke DB, dll.
  // Kita return sukses mock:
  return NextResponse.json({ success: true, message: "Checkout mock success" });
}
