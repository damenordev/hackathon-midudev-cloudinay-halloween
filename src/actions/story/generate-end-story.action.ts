import { defineAction } from "astro:actions"
import { z } from "astro:content"

import { additionalImageCharactersInstructionsPrompt, additionalImageInstructionsPrompt, fetcher, getOutputFormatPrompt, supabase } from "@/utils"
import { API_URL } from "@/constants"

export interface IStoryEndInput {
  storyId: string
  optionSelected: number
}

export interface IStoryEndResponse {
  paragraphs: string[]
  resume: string
  images: string[]
}

const getLanguageByCode = (languageCode: string) => {
  if (languageCode === 'es') return 'Español'
  if (languageCode === 'en') return 'English'
  return 'Español'
}

const handleGenerateEndStory = async ({ storyId, optionSelected }: IStoryEndInput) => {
  const { data: story } = await supabase.from('stories').select('*').eq('id', storyId).single()

  if (!story) throw new Error('Story not found')
    
  const numberOfImages = 6
  const lang = getLanguageByCode(story.language)

  const prompt = `
  - End the story with the following parameters:
    - **Era:** ${story.era}
    - **Location:** ${story.location}
    - **Theme:** ${story.theme}
    - **IMPORTANT: Language of values JSON without promptImages:** ${lang}
    - **IMPORTANT: Generate a summary of the story for a 50-second audio, it should be narrated by a human and should not have dialogues. It should be pleasant and immersive.**
    - **IMPORTANT: Do not use character names in the summary.**
    - **IMPORTANT: In the summary include these two last paragraphs created for the ending of the story.**
    - Currrent StoryData: ${JSON.stringify(story)}
  
  ${additionalImageInstructionsPrompt(numberOfImages, story.imageStyle)}
  
  ${getOutputFormatPrompt({
      paragraphs: [
        `<paragraphMax120charsIn${lang}>`,
        `<paragraphMax120charsIn${lang}>`,
      ],
      resume: `<textToEndResumeHistoryForAudio50SecondsIn${lang}>`,
      images: [
        '<imagePrompt>',
        '<imagePrompt>',
        '<imagePrompt>',
        '<imagePrompt>',
        '<imagePrompt>',
        '<imagePrompt>',
      ]
    })}
  `.trim()
    
  try {
    const storyData = story.data
    const { data } = await fetcher<{ data: IStoryEndResponse }>(`${API_URL}/ai/generate`, { method: 'POST', data: { prompt } })

    const lastScene = storyData.scenes[storyData.scenes.length - 1]
    lastScene.optionSelected = optionSelected
    storyData.scenes[storyData.scenes.length - 1] = lastScene

    const dataToUpdate = { ...storyData, resume: data.resume, scenes: [...storyData.scenes, { paragraphs: data.paragraphs }], end: true }

    return { dataToUpdate, images: data.images }
  } catch (error) {
    if (error instanceof Error) throw new Error(`Failed to generate end story: ${error.message}`)
    throw new Error('Failed to generate end story: Unknown error')
  }
}

const generateEndStorySchema = z.object({
  storyId: z.string(),
  optionSelected: z.number(),
})

export const generateEndStory = defineAction({
  accept: 'json',
  input: generateEndStorySchema,
  handler: handleGenerateEndStory, 
})
