import { NextResponse } from 'next/server';
import { getProfileImage } from '@/services/hero';
import { storageErrorResponse, storageHeaders } from '@/lib/storageResponse';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return NextResponse.redirect(await getProfileImage(), { status: 307, headers: storageHeaders });
  } catch (error) {
    return storageErrorResponse(error);
  }
}
