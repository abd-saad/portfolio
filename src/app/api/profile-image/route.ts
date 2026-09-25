import { getProfileImage } from '@/services/hero';
import { storageErrorResponse, storageImageResponse } from '@/lib/storageResponse';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    return await storageImageResponse(await getProfileImage());
  } catch (error) {
    return storageErrorResponse(error);
  }
}
