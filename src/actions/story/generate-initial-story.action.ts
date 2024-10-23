import { defineAction } from "astro:actions"
import { z } from "astro:content"

import type { TImageStyle } from "@/types" 
import { additionalImageCharactersInstructionsPrompt, additionalImageInstructionsPrompt, fetcher, getOutputFormatPrompt, supabase } from "@/utils"
import { API_URL } from "@/constants"

export interface IStoryCharacter {
  name: string
  description: string
  imagePrompt: string
  isInitialKnown?: boolean
}

export interface IStoryInitialInput {
  theme: string
  era: string
  location: string
  language: string
  imageStyle: TImageStyle 
}

export interface IStoryInitialResponse extends IStoryInitialInput {
  title: string
  cover: string
  prologue: string
  paragraphs: string[]
  options: string[]
  characters: {
    protagonist: IStoryCharacter
    antagonist: IStoryCharacter
    secondaryCharacters: IStoryCharacter[]
  }
  locationDetails: {
    name: string
    description: string
    imagePrompt: string
  }
}

export const getLanguageByCode = (languageCode: string) => {
  if (languageCode === 'es') return 'Español'
  if (languageCode === 'en') return 'English'
  return 'Español'
}

const handleGenerateInitialStory = async ({ theme, era, location, language, imageStyle }: IStoryInitialInput) => {
  const numberOfImages = 2
  const lang = getLanguageByCode(language)
  
  const prompt = `
  - Create a horror story based on the following parameters, making it interesting, captivating, and leaving all options to continue the story intriguing:
    - **Era:** ${era}
    - **Location:** ${location}
    - **Theme:** ${theme}
    - **IMPORTANT: Language of values JSON without promptImages:** ${lang}
    - Max 3 secondary characters and optionals
    - 2 paragraphs

  ${additionalImageInstructionsPrompt(numberOfImages, imageStyle)}
  ${additionalImageCharactersInstructionsPrompt()}
  
  ${getOutputFormatPrompt({
    title: `<titleMax40charsIn${lang}>`,
    cover: '<imageCoverPrompt>',
    prologue: `<prologueMax160charsIn${lang}>`,
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
      characters: {
        protagonist: {
          name: `<nameOfProtagonistIn${lang}>`,
          description: `<descriptionOfProtagonistIn${lang}>`,
          imagePrompt: `<imagePromptOfProtagonistIn${lang}>`,
        },
        antagonist: {
          name: `<nameOfAntagonistIn${lang}>`,
          description: `<descriptionOfAntagonistIn${lang}>`,
          imagePrompt: `<imagePromptOfAntagonistIn${lang}>`,
          isInitialKnown: '<booleanIsInitialKnownInitialStory>',
        },
        secondaryCharacters: [
          {
            name: `<nameOfAntagonistIn${lang}>`,
            description: `<descriptionOfAntagonistIn${lang}>`,
            imagePrompt: `<imagePromptOfAntagonistIn${lang}>`,
          }
        ],
      },
      locationDetails: {
        name: `<nameOfLocationIn${lang}>`,
        description: `<descriptionOfLocationIn${lang}>`,
        imagePrompt: '<imagePromptOfLocation>',
      },
    })}
    `.trim()
    
  try {
    const { data } = await fetcher<{ data: IStoryInitialResponse }>(`${API_URL}/ai/generate`, { method: 'POST', data: { prompt } })

    const { data: { user } } = await supabase.auth.getUser()
    
    const { paragraphs, options, ...rest } = data
    const dataToInsert = { ...rest, scenes: [{paragraphs, options}], theme, era, location, language, imageStyle  }

    const slug = `${rest.title.toLowerCase().replace(/ /g, '-')}`

    const { data: storyData, error } = await supabase.from('stories').insert({ slug, userId: user?.id, data: dataToInsert }).select('*').single()
    if (error) throw new Error(`Error inserting story: ${error.message}`)
    return storyData
  } catch (error) {
    if (error instanceof Error) throw new Error(`Failed to generate initial story: ${error.message}`)
    throw new Error('Failed to generate initial story: Unknown error')
  }
}

const generateInitialStorySchema = z.object({
  theme: z.string(),
  era: z.string(),
  location: z.string(),
  language: z.string(),
  imageStyle: z.string() as z.ZodType<TImageStyle>,
})

export const generateInitialStory = defineAction({
  accept: 'form',
  input: generateInitialStorySchema,
  handler: handleGenerateInitialStory,
})
