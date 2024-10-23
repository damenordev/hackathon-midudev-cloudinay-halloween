import type { APIContext, MiddlewareNext } from 'astro'

import { ROUTE_REDIRECT_UNAUTHORIZED } from '@/constants'

import { supabase, SUPABASE_COOKIE_ACCESS_TOKEN, SUPABASE_COOKIE_REFRESH_TOKEN } from './supabase.utils'

interface IOnRouteProtectedArgs extends APIContext {
  access_token: string | undefined
  refresh_token: string | undefined
  next: MiddlewareNext
}

export const onRouteProtected = async ({ locals, cookies, redirect, access_token, refresh_token, next }: IOnRouteProtectedArgs) => {
  if (!access_token || !refresh_token) return redirect(ROUTE_REDIRECT_UNAUTHORIZED)
  const { data, error } = await supabase.auth.setSession({ access_token, refresh_token })

  if (error) {
    cookies?.delete(SUPABASE_COOKIE_ACCESS_TOKEN, { path: '/' })
    cookies?.delete(SUPABASE_COOKIE_REFRESH_TOKEN, { path: '/' })
    return redirect(ROUTE_REDIRECT_UNAUTHORIZED)
  }

  locals.email = data.user?.email!
  cookies?.set(SUPABASE_COOKIE_ACCESS_TOKEN, data?.session?.access_token!, { sameSite: 'strict', path: '/', secure: true })
  cookies?.set(SUPABASE_COOKIE_REFRESH_TOKEN, data?.session?.refresh_token!, { sameSite: 'strict', path: '/', secure: true })
  return next()
}
