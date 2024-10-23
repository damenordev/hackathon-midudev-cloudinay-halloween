import { defineMiddleware } from 'astro:middleware'

import { ROUTES_PROTECTED, ROUTES_REDIRECT, ROUTE_REDIRECT_AUTHORIZED, ROUTE_REDIRECT_UNAUTHORIZED, ROUTES_API_PROTECTED } from './constants'
import { onRouteProtected, SUPABASE_COOKIE_ACCESS_TOKEN, SUPABASE_COOKIE_REFRESH_TOKEN } from './utils'

export const onRequest = defineMiddleware(async ({ locals, url, cookies, redirect, ...apiContext }, next) => {
  const access_token = cookies.get(SUPABASE_COOKIE_ACCESS_TOKEN)?.value
  const refresh_token = cookies.get(SUPABASE_COOKIE_REFRESH_TOKEN)?.value
  const pathname = url.pathname

  // if (ROUTES_REDIRECT.includes(pathname) && (access_token || refresh_token)) return redirect(ROUTE_REDIRECT_AUTHORIZED)
  if (ROUTES_PROTECTED.includes(url.pathname)) return onRouteProtected({ ...apiContext, locals, cookies, url, redirect, access_token, refresh_token, next })

  // if (ROUTES_API_PROTECTED.includes(url.pathname)) {
  //   if (!access_token || !refresh_token) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  //   const { error } = await supabase.auth.setSession({ access_token, refresh_token })
  //   if (error) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  // }

  return next()
})
