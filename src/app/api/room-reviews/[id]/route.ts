import { getRoomReviews } from "@/libs/apis";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const roomId = params.id;

  try {
    const roomReviews = await getRoomReviews(roomId);
    return NextResponse.json(roomReviews, { status: 200 });
  } catch (error: any) {
    console.error("Failed to load room reviews", error);
    return new Response("Failed to load room reviews", { status: 400 });
  }
}
