import { defineAction } from 'astro:actions'
import { z } from 'astro:content'

import { cloudinary, createAudioByText, supabase, writeFile } from '@/utils'
import { API_URL_LAMBDA } from '@/constants'

const handleUpdateStory = async ({ storyId, data }: { storyId: string; data: any }) => {
  try {
    const { data: storyData, error } = await supabase.from('stories').update({ data }).eq('id', storyId).select('*')
    if (error) throw new Error(`Failed to update story: ${error.message}`)
    return storyData
    // return {data, storyId}
  } catch (error) {
    if (error instanceof Error) throw new Error(`Failed to update story: ${error.message}`)
    throw new Error('Failed to update story: Unknown error')
  }
}

export const updateStory = defineAction({
  accept: 'json',
  handler: handleUpdateStory,
})

const handleCreateAudio = async ({ prompt, storyId }: { prompt: string; storyId: string }) => {
  try {
    const { audioContent, audioPath } = await createAudioByText(prompt)
    await writeFile(audioPath, audioContent, 'binary')
    const {
      data: { user },
    } = await supabase.auth.getUser()
    const folder = `stories/${user?.id}/${storyId}`
    const { secure_url } = await cloudinary.uploader.upload(audioPath, {
      public_id: 'audio',
      overwrite: true,
      invalidate: true,
      folder,
      resource_type: 'video',
    })
    return { audioUrl: secure_url }
  } catch (error) {
    if (error instanceof Error) throw new Error(`Failed to create audio: ${error.message}`)
    throw new Error('Failed to create audio')
  }
}

const handleCreateAudioSchema = z.object({
  prompt: z.string(),
  storyId: z.string(),
})

export const createAudio = defineAction({
  accept: 'json',
  handler: handleCreateAudio,
})

const getProgress = async (renderId: string, bucketName: string) => {
  try {
    const result = await fetch(`${API_URL_LAMBDA}/progress`, {
      method: 'POST',
      body: JSON.stringify({ id: renderId, bucketName }),
    })
    if (!result.ok) {
      throw new Error('Error en la respuesta del servidor')
    }
    const { data } = await result.json()
    return data
  } catch (error) {
    console.error('Error al obtener el progreso:', error)
    throw new Error('Fallo al obtener el progreso')
  }
}

export const handleGenerateVideoTranscribed = async ({ storyId }: { storyId: string }) => {
  try {
    const response = await fetch(`${API_URL_LAMBDA}/render`, {
      // const response = await fetch('http://localhost:3000/api/lambda/render', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 'MyComp', inputProps: { storyId } }),
    }).catch(error => {
      console.error('Error generating video transcribed:', error)
      throw new Error('Failed to generate video transcribed')
    })
    if (!response.ok) throw new Error('Failed to generate video transcribed')
    const {
      data: { renderId, bucketName },
    } = await response.json()

    let isDone = false
    let progressResult
    while (!isDone) {
      try {
        const response = await getProgress(renderId, bucketName)
        console.log({ response })
        if (response.type === 'done' || response.type === 'error') {
          isDone = true
          progressResult = response
        }
      } catch (error) {
        console.error('Error al obtener el progreso:', error)
        isDone = true
        progressResult = { type: 'error', message: 'Error al obtener el progreso' }
        break
      }
    }

    const {
      data: { user },
    } = await supabase.auth.getUser()
    console.log({ progressResult })
    const videoUrl = progressResult.url
    const public_id = 'video'
    const folder = `stories/${user?.id}/${storyId}`

    const responseUpload = await cloudinary.uploader.upload(videoUrl, {
      resource_type: 'video',
      raw_convert: 'google_speech:es-ES',
      overwrite: true,
      invalidate: true,
      folder,
      public_id,
      // transformation: [{ overlay: { resource_type: 'subtitles', public_id: `${folder}/${public_id}.transcript` } }, { flags: 'layer_apply' }],
    })

    const videoTransformated = await cloudinary.url(responseUpload.public_id, {
      fallback_content: "Your browser does not support HTML5 video tags",
      transformation: [{ overlay: { resource_type: 'subtitles', public_id: `${folder}/${public_id}.transcript` } }, { flags: 'layer_apply' }],
    })

    // const video = await cloudinary.video(responseUpload.public_id, {
    //   transformation: [{ overlay: { resource_type: 'subtitles', public_id: `${public_id}.transcript` } }, { flags: 'layer_apply' }],
    // })
    return { responseUpload, videoTransformated }
  } catch (error) {
    if (error instanceof Error) throw new Error(`Failed to generate video transcribed: ${error.message}`)
    throw new Error('Failed to generate video transcribed: Unknown error')
  }
}

const handleGenerateVideoTranscribedSchema = z.object({
  storyId: z.string(),
})

export const generateVideoTranscribed = defineAction({
  accept: 'json',
  input: handleGenerateVideoTranscribedSchema,
  handler: handleGenerateVideoTranscribed,
})
