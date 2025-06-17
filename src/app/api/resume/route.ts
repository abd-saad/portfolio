import { supabase } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const { data } = await supabase.storage
    .from('assets')        // bucket name
    .getPublicUrl('resume.pdf'); // path and expiry (in seconds)

  console.log("data: ", data)

  // if (error || !data?.signedUrl) {
  //   return NextResponse.json({ error: error?.message || 'URL error' }, { status: 500 });
  // }

  return NextResponse.json({ url: data.publicUrl });
}