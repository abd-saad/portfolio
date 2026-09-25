import { signStorageAsset } from '@/services/storage';

export const getResumeUrl = async (filename = 'resume.pdf'): Promise<string> => {
  return signStorageAsset('assets', filename, true);
};
