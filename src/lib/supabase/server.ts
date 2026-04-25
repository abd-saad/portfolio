import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { Database } from '@/types/supabase'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet: {
          name: string
          value: string
          options?: {
            path?: string
            expires?: Date
            maxAge?: number
            domain?: string
            secure?: boolean
            httpOnly?: boolean
            sameSite?: 'strict' | 'lax' | 'none'
          }
        }[]) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Handle any errors that may occur during cookie setting
            console.error('Error occurred while setting cookies')
          }
        },
        delete(name: string) {
          cookieStore.delete(name)
        },
    }}
  )
}