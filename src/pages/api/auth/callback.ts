import type { APIRoute } from 'astro'

import { ROUTE_REDIRECT_AUTHORIZED } from '@/constants'
import { supabase, SUPABASE_COOKIE_ACCESS_TOKEN, SUPABASE_COOKIE_REFRESH_TOKEN } from '@/utils'

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  const authCode = url.searchParams.get('code')

  if (!authCode) return new Response('No code provided', { status: 400 })

  const { data, error } = await supabase.auth.exchangeCodeForSession(authCode)

  if (error) return new Response(error.message, { status: 500 })

  const { access_token, refresh_token } = data.session

  cookies.set(SUPABASE_COOKIE_ACCESS_TOKEN, access_token, {
    path: '/',
    secure: true,
    httpOnly: true,
  })

  cookies.set(SUPABASE_COOKIE_REFRESH_TOKEN, refresh_token, {
    path: '/',
    secure: true,
    httpOnly: true,
  })

  return redirect(ROUTE_REDIRECT_AUTHORIZED)
}
