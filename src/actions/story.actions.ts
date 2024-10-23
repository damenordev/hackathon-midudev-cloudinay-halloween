import { defineAction } from 'astro:actions'

import { supabase } from '@/utils'

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

// const handleCreateAudio = async () => {
//   const text =
//     'Susquehanna, 1927. La niebla se aferraba a los árboles como un espectro. Un escalofrío recorrió mi espalda, un presagio de la oscuridad que acechaba entre los pinos. No estaba solo.'
//   try {
//     const { audioContent, audioPath } = await createAudioByText(text)
//     await writeFile(audioPath, audioContent, 'binary')
//     const id = crypto.randomUUID()
//     const { secure_url } = await cloudinary.uploader.upload(audioPath, {
//       resource_type: 'video',
//       public_id: id,
//       overwrite: true,
//       invalidate: true,
//     })
//     return { audioUrl: secure_url }
//   } catch (error) {
//     console.log({ error })
//   }
// }

// export const createAudio = defineAction({
//   accept: 'json',
//   handler: handleCreateAudio,
// })

// const getProgress = async (renderId: string, bucketName: string) => {
//   const result = await fetch('http://localhost:3000/api/lambda/progress', {
//     method: 'POST',
//     body: JSON.stringify({ id: renderId, bucketName }),
//   })
//   const { data } = await result.json()
//   return data
// }

// export const handleGenerateVideoTranscribed = async () => {
//   // const response = await fetch('http://localhost:3000/api/lambda/render', {
//   //   method: 'POST',
//   //   headers: {
//   //     'Content-Type': 'application/json',
//   //   },
//   //   body: JSON.stringify({ id: 'MyComp', inputProps: { title: 'Esto es una prueba desde Astro' } }),
//   // })
//   // const {
//   //   data: { renderId, bucketName },
//   // } = await response.json()

//   // let isDone = false
//   // let progressResult
//   // while (!isDone) {
//   //   const response = await getProgress(renderId, bucketName)
//   //   if (response.type === 'done') {
//   //     isDone = true
//   //     progressResult = response
//   //   }
//   // }

//   try {
//     const videoUrl = 'https://s3.eu-west-3.amazonaws.com/remotionlambda-euwest3-j1uiwen9ju/renders/5z127pip6l/out.mp4'
//     const public_id = 'prueba'

//     const responseUpload = await cloudinary.uploader.upload(videoUrl, {
//       resource_type: 'video',
//       raw_convert: 'google_speech:es-ES',
//       overwrite: true,
//       // invalidate: true,
//       public_id,
//     })
//     // const video = await cloudinary.video(public_id, {
//     //   transformation: [{ overlay: { resource_type: 'subtitles', public_id: `${public_id}.transcript` } }, { flags: 'layer_apply' }],
//     // })
//     // console.log({ video })
//     return { responseUpload }
//   } catch (error) {
//     console.log({ error })
//   }
// }

// export const generateVideoTranscribed = defineAction({
//   accept: 'json',
//   handler: handleGenerateVideoTranscribed,
// })
