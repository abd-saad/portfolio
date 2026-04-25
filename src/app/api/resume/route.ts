import { getResumeUrl } from "@/services/resume";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = getResumeUrl();
    return NextResponse.json({ url });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Failed to get resume URL';
    console.error('Error getting resume URL:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
