import { defineAction, type ActionAPIContext } from 'astro:actions'

import { supabase, SUPABASE_CALLBACK_URL, SUPABASE_COOKIE_ACCESS_TOKEN, SUPABASE_COOKIE_REFRESH_TOKEN } from '@/utils'

const handleSignInWithTwitch = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'twitch', options: { redirectTo: SUPABASE_CALLBACK_URL } })
  if (error) return { error: error.message }
  return data
}

export const signInWithTwitch = defineAction({
  accept: 'form',
  handler: handleSignInWithTwitch,
})

const handleSignOut = async (input: FormData, { cookies }: ActionAPIContext) => {
  const { error } = await supabase.auth.signOut()
  cookies.delete(SUPABASE_COOKIE_ACCESS_TOKEN, { path: '/' })
  cookies.delete(SUPABASE_COOKIE_REFRESH_TOKEN, { path: '/' })
  return { success: true }
}

export const signOut = defineAction({
  accept: 'json',
  handler: handleSignOut,
})
