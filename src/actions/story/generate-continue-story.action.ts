import { defineAction } from "astro:actions"
import { z } from "astro:content"

import { fetcher, getOutputFormatPrompt, supabase } from "@/utils"
import { API_URL } from "@/constants"

export interface IStoryContinueInput {
  storyId: string
  isLastScene: boolean
  optionSelected: number
}

export interface IStoryContinueResponse {
  paragraphs: string[]
  options: string[]
  isLastScene: boolean
}

const getLanguageByCode = (languageCode: string) => {
  if (languageCode === 'es') return 'Español'
  if (languageCode === 'en') return 'English'
  return 'Español'
}

const handleGenerateContinueStory = async ({ storyId, isLastScene, optionSelected }: IStoryContinueInput) => {
  const { data: story } = await supabase.from('stories').select('*').eq('id', storyId).single()

  if (!story) throw new Error('Story not found')
    
  const numberOfImages = 2
  const lang = getLanguageByCode(story.language)

  const prompt = `
  - Continue the story with the following parameters:
    - **Era:** ${story.era}
    - **Location:** ${story.location}
    - **Theme:** ${story.theme}
    - **IMPORTANT: Language of values JSON without promptImages:** ${lang}
    - **Is last scene:** ${isLastScene}
    - Currrent StoryData: ${JSON.stringify(story)}
    - 2 paragraphs
    - **IMPORTANT: Always generate 4 options even if it's the last scenario.**
  
  ${getOutputFormatPrompt({
      paragraphs: [
        `<paragraphMax120charsIn${lang}>`,
        `<paragraphMax120charsIn${lang}>`,
      ],
      options: [
        `<textToContinueMax40charsIn${lang}>`,
        `<textToContinueMax40charsIn${lang}>`,
        `<textToContinueMax40charsIn${lang}>`,
        `<textToContinueMax40charsIn${lang}>`,
      ],
      isLastScene,
    })}
  `.trim()
    
  try {
    const storyData = story.data
    const { data } = await fetcher<{ data: IStoryContinueResponse }>(`${API_URL}/ai/generate`, { method: 'POST', data: { prompt } })

    const { paragraphs, options, isLastScene } = data

    const lastScene = storyData.scenes[storyData.scenes.length - 1]
    lastScene.optionSelected = optionSelected
    storyData.scenes[storyData.scenes.length - 1] = lastScene

    const dataToUpdate = { ...storyData,  scenes: [...storyData.scenes, { paragraphs, options, isLastScene }] }
    return dataToUpdate
  } catch (error) {
    if (error instanceof Error) throw new Error(`Failed to generate continue story: ${error.message}`)
    throw new Error('Failed to generate continue story: Unknown error')
  }
}

const generateContinueStorySchema = z.object({
  storyId: z.string(),
  isLastScene: z.boolean(),
  optionSelected: z.number(),
})

export const generateContinueStory = defineAction({
  accept: 'json',
  input: generateContinueStorySchema,
  handler: handleGenerateContinueStory, 
})
