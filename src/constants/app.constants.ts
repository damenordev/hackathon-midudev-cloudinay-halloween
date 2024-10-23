export const APP_TITLE = 'Scary Movies Shorts'
export const APP_DESCRIPTION = 'Scary Movies Shorts is a platform for creating and sharing scary movies shorts with AI'
export const APP_IMAGE = '/favicon.svg'
export const APP_URL = import.meta.env.WEBSITE_URL || 'https://scary-movies-shorts.com'

export const ROUTES_PROTECTED = ['/story/config', '/story/chat']
export const ROUTES_REDIRECT = ['/']
export const ROUTES_API_PROTECTED = []

export const ROUTE_REDIRECT_UNAUTHORIZED = '/'
export const ROUTE_REDIRECT_AUTHORIZED = '/story/config'
