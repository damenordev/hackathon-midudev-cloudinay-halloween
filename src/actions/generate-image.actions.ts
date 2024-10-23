import { defineAction } from 'astro:actions'
import { z } from 'astro:content'

import { cloudinary, fetcher, supabase } from '@/utils'
import { API_URL } from '@/constants'
export interface IGenerateImageInput {}

const handleGenerateImage = async ({ prompt, storyId, imageName }: { prompt: string, storyId: string, imageName: string }) => {
  try {
    const { data } = await fetcher<{ data: { imageUrl: string } }>(`${API_URL}/ai/generate-image`, { method: 'POST', data: { prompt } })
    
    if (!data.imageUrl) throw new Error('Failed to generate image')
      
    const { data: { user } } = await supabase.auth.getUser()
    const folder = `stories/${user?.id}/${storyId}`

    const { secure_url } = await cloudinary.uploader.upload(data.imageUrl, { folder, public_id: imageName })

    return { imageUrl: secure_url, imageName }
  } catch (error) {
    if (error instanceof Error) throw new Error(`Failed to generate image: ${error.message}`)
    throw new Error('Failed to generate image: Unknown error')
  }
}

const generateImageSchema = z.object({
  prompt: z.string(),
  storyId: z.string(),
  imageName: z.string(),
})

export const generateImage = defineAction({
  accept: 'json',
  handler: handleGenerateImage,
  input: generateImageSchema,
})
