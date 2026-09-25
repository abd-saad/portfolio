import { signStorageAsset } from '@/services/storage';

export const getProfileImage = async (): Promise<string> => {
  return signStorageAsset('assets', 'profile.jpg');
};
