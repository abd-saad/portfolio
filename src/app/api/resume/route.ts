import { getResumeUrl } from "@/services/resume";
import { NextResponse } from "next/server";
import { storageErrorResponse, storageHeaders } from '@/lib/storageResponse';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const mode = new URL(request.url).searchParams.get('mode') ?? 'download';
    if (mode !== 'preview' && mode !== 'download') {
      return NextResponse.json({ error: 'Invalid resume mode' }, { status: 400, headers: storageHeaders });
    }
    const url = await getResumeUrl('resume.pdf', mode === 'download');
    if (mode === 'preview') {
      return NextResponse.redirect(url, { status: 307, headers: storageHeaders });
    }
    return NextResponse.json({ url }, { headers: storageHeaders });
  } catch (error) {
    return storageErrorResponse(error);
  }
}
