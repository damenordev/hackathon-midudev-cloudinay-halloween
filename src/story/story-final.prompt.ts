import { getCurrentStoryPrompt, getStoryDetailImagesPrompt, getStoryParametersPrompt } from './story-prompt.utils'
import { getOutputFormatPrompt } from '@/utils'

import { getStoryAdditionalInstructionsPrompt } from './story-prompt.utils'
import { STORY_FINAL_DURATION, STORY_FINAL_IMAGES_COUNT } from './story.constants'
import type { ICurrentStory, IStoryParameters } from './story.types'

export interface IGetStoryFinalPromptParams extends IStoryParameters {
  story: ICurrentStory
  duration?: number
}

export const getStoryFinalPrompt = ({ duration = STORY_FINAL_DURATION, story, ...params }: IGetStoryFinalPromptParams) => `
Finaliza la historia de terror sin opciones adicionales.

${getCurrentStoryPrompt(story)}

${getStoryParametersPrompt(params)}    

**Instrucciones:**

- Mantén el tono y el estilo establecidos en la historia anterior.
- Proporciona un cierre satisfactorio a la trama, resolviendo los conflictos planteados.
- Genera **5 prompts detallados** para imágenes en **inglés**, coherentes con el desenlace y la historia.
- Crea un **resumen** de la historia para un video de **${duration} segundos**, narrado de manera similar a las secciones anteriores.
- No incluyas opciones de chat adicionales en el JSON de salida.

${getStoryDetailImagesPrompt({ numberOfImages: STORY_FINAL_IMAGES_COUNT, ...params })}

${getStoryAdditionalInstructionsPrompt()}


${getOutputFormatPrompt({
  text: 'Texto del desenlace de la historia',
  promptsImages: ['Prompt de imagen 1', 'Prompt de imagen 2', 'Prompt de imagen 3', 'Prompt de imagen 4', 'Prompt de imagen 5'],
  summary: `Resumen de la historia para un video de ${duration} segundos`,
})}

`
