export function parseStorageObjectUrl(value: string | null, projectUrl: string | undefined): { bucket: string; path: string } | null {
  if (!value || !projectUrl) return null;
  try {
    const url = new URL(value);
    const project = new URL(projectUrl);
    if (url.origin !== project.origin || url.username || url.password) return null;
    const match = url.pathname.match(/^\/storage\/v1\/object\/(?:public|authenticated|sign)\/([^/]+)\/(.+)$/);
    if (!match) return null;
    const bucket = decodeURIComponent(match[1]);
    const path = decodeURIComponent(match[2]);
    if (!bucket || bucket.includes('/') || /[\\\x00-\x1f]/.test(bucket + path)) return null;
    if ([bucket, ...path.split('/')].some(part => !part || part === '.' || part === '..')) return null;
    return { bucket, path };
  } catch {
    return null;
  }
}

export function getBadgeImageSrc(id: number, value: string | null, projectUrl: string | undefined): string | null {
  if (parseStorageObjectUrl(value, projectUrl)) return `/api/certifications/${id}/badge`;
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol === 'https:' && !url.username && !url.password &&
        ['images.credly.com', 'www.credly.com'].includes(url.hostname)) return value;
  } catch {
    return null;
  }
  return null;
}
