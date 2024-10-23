import { getOutputFormatPrompt } from '@/utils'
import { getStoryParametersPrompt, getCurrentStoryPrompt, getStoryAdditionalInstructionsPrompt } from './story-prompt.utils'
import { STORY_CHAT_OPTIONS_COUNT } from './story.constants'
import type { ICurrentStory, IStoryParameters } from './story.types'

export interface IGetStoryContinuationPromptParams extends IStoryParameters {
  choice: string
  story: ICurrentStory
}

export const getStoryContinuationPrompt = ({ choice, story, ...params }: IGetStoryContinuationPromptParams) => `
Continúa la historia de terror basada en la elección del usuario: "${choice}".

${getStoryParametersPrompt(params)}

${getCurrentStoryPrompt(story)}

**Instrucciones:**

- Mantén el tono y el estilo establecidos en la historia anterior.
- Integra la opción seleccionada de forma coherente y significativa en la narrativa.
- Genera nuevas opciones de chat que sean relevantes y ofrezcan caminos intrigantes para continuar.
- Evita repetir opciones anteriores y asegúrate de que cada nueva opción avance la trama.
- Mantén el suspenso y la intriga, fomentando el interés continuo del lector.

${getStoryAdditionalInstructionsPrompt()}

${getOutputFormatPrompt({
  text: 'Texto de la continuación de la historia',
  chatOptions: Array.from({ length: STORY_CHAT_OPTIONS_COUNT }, (_, index) => `Opción ${index + 1}`),
})}

`
