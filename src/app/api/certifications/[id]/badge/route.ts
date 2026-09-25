import { NextResponse } from 'next/server';
import { createPublicClient } from '@/lib/supabase/public';
import { parseStorageObjectUrl } from '@/helper/storageUrl';
import { signStorageAsset, StorageAssetError } from '@/services/storage';
import { storageErrorResponse, storageHeaders } from '@/lib/storageResponse';

export const dynamic = 'force-dynamic';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    if (!/^\d+$/.test(id) || !Number.isSafeInteger(Number(id))) throw new StorageAssetError(404);
    const { data, error } = await createPublicClient()
      .from('certifications').select('badge_image_url').eq('id', Number(id)).maybeSingle();
    if (error) throw new StorageAssetError(500);
    const asset = parseStorageObjectUrl(data?.badge_image_url ?? null, process.env.NEXT_PUBLIC_SUPABASE_URL);
    if (!asset) throw new StorageAssetError(404);
    const url = await signStorageAsset(asset.bucket, asset.path);
    return NextResponse.redirect(url, { status: 307, headers: storageHeaders });
  } catch (error) {
    return storageErrorResponse(error);
  }
}
