import { getResumeUrl } from "@/services/resume";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = await getResumeUrl();
    return NextResponse.json({ url });
  } catch (error) {
    console.error('Error getting resume URL:', error);
    return NextResponse.json(
      { error: 'Failed to get resume URL' }, 
      { status: 500 }
    );
  }
}