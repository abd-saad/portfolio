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
