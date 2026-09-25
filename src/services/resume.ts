import 'server-only';
import { signStorageAsset } from '@/services/storage';

export const getResumeUrl = async (filename = 'resume.pdf', download = true): Promise<string> => {
  return signStorageAsset('assets', filename, download);
};
