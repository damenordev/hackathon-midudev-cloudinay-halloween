import type { IStoryParameters } from './story.types'
import { getStoryParametersPrompt, getStoryDetailImagesPrompt, getStoryAdditionalInstructionsPrompt } from './story-prompt.utils'
import { getOutputFormatPrompt } from '@/utils'
import { STORY_INIT_IMAGES_COUNT, STORY_INIT_DURATION, STORY_CHAT_OPTIONS_COUNT } from './story.constants'

export const getStoryInitPrompt = ({ duration = STORY_INIT_DURATION, ...params }: IStoryParameters) => `
Escribe el comienzo de una historia de terror cautivadora diseñada para ser narrada en un video de **${duration} segundos**. La narración debe ser atmosférica, intrigante y dejar al espectador anticipando un evento aterrador sin revelarlo por completo. Debe ser una historia fácil de entender, con un hilo narrativo claro y una conclusión satisfactoria. 

${getStoryParametersPrompt(params)}
No escribas '...'.

Crea el parrafo inicial de la historia en ${STORY_INIT_IMAGES_COUNT} escenas. Las escenas no son frases separadas, sino que deben ser un parrafo narrado en partes.

Ejemplo: "El reloj siempre marca las 3:33 cuando lo escucho. Ese golpe suave en la puerta del sótano… nadie vive ahí abajo. Nadie ha vivido ahí en años… ¿verdad?"


${getStoryDetailImagesPrompt({ numberOfImages: STORY_INIT_IMAGES_COUNT, ...params })}

${getStoryAdditionalInstructionsPrompt()}

${getOutputFormatPrompt({
  title: 'Título breve y llamativo',
  text: 'Texto de la historia',
  chatOptions: Array.from({ length: STORY_CHAT_OPTIONS_COUNT }, (_, index) => `Opción ${index + 1}`),
  // promptsImages: Array.from({ length: STORY_INIT_IMAGES_COUNT }, (_, index) => `Prompt de imagen ${index + 1}`),
  date: 'Fecha de la historia',
  location: 'Ubicación de la historia',
  scenes: Array.from({ length: STORY_INIT_IMAGES_COUNT }, (_, index) => ({
    text: 'Texto de la historia',
    image: `Prompt de imagen ${index + 1}`,
    duration: '<Duracion de la escena en milisegundos>Number',
  })),
})}
`
