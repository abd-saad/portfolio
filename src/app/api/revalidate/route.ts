import { revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';
import { createStorageClient } from '@/lib/supabase/storage';

const ALLOWED_TAGS = new Set([
  'homepage',
  'skills',
  'experiences',
  'projects',
  'certifications',
  'social-links',
  'solutions',
  'blog',
]);

type RevalidationPayload = {
  event_id?: string;
};

export async function POST(request: Request) {
  let payload: RevalidationPayload;

  try {
    payload = (await request.json()) as RevalidationPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  if (!payload.event_id) {
    return NextResponse.json({ error: 'Missing event_id' }, { status: 400 });
  }

  const supabase = createStorageClient();
  const { data, error } = await supabase
    .from('cache_invalidation_events')
    .delete()
    .eq('id', payload.event_id)
    .select('cache_tag')
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: 'Unable to verify cache invalidation event' }, { status: 500 });
  }

  if (!data?.cache_tag || !ALLOWED_TAGS.has(data.cache_tag)) {
    return NextResponse.json({ error: 'Invalid or already-consumed event' }, { status: 401 });
  }

  revalidateTag(data.cache_tag, { expire: 0 });

  return NextResponse.json({ revalidated: true, tag: data.cache_tag });
}
