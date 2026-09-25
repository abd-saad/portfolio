import 'server-only';
import { createStorageClient } from '@/lib/supabase/storage';

export class StorageAssetError extends Error {
  constructor(public readonly status: number) {
    super(status === 404 ? 'Asset not found' : 'Unable to load asset');
  }
}

export async function signStorageAsset(bucket: string, path: string, download = false): Promise<string> {
  const { data, error } = await createStorageClient().storage
    .from(bucket)
    .createSignedUrl(path, 300, { download });

  if (error || !data?.signedUrl) {
    const missing = error && (
      ('statusCode' in error && String(error.statusCode) === '404') ||
      error.message === 'Object not found' ||
      ('code' in error && error.code === 'NoSuchKey')
    );
    // Do not propagate provider errors, which could contain request URLs or tokens.
    throw new StorageAssetError(missing ? 404 : 500);
  }
  return data.signedUrl;
}
