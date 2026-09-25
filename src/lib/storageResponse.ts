import 'server-only';
import { NextResponse } from 'next/server';
import { captureException } from '@sentry/nextjs';
import { StorageAssetError } from '@/services/storage';

export const storageHeaders = { 'Cache-Control': 'no-store' };

export function storageErrorResponse(error: unknown) {
  const status = error instanceof StorageAssetError ? error.status : 500;
  if (status !== 404) {
    // Report only a sanitized error; never log signed URLs or provider payloads.
    captureException(new Error('Storage asset request failed'));
  }
  return NextResponse.json(
    { error: status === 404 ? 'Asset not found' : 'Unable to load asset' },
    { status, headers: storageHeaders },
  );
}

// Buffer before responding so upstream failures still produce sanitized, uncached errors.
export async function storageImageResponse(url: string) {
  const response = await fetch(url, { cache: 'no-store' });
  if (!response.ok) throw new StorageAssetError(response.status === 404 ? 404 : 500);
  const contentType = response.headers.get('content-type')?.split(';')[0].trim().toLowerCase();
  if (!contentType || !['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'].includes(contentType)) {
    throw new StorageAssetError(500);
  }
  return new Response(await response.arrayBuffer(), {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
