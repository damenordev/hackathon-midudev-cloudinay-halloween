import type { ICurrentStory, IStoryParameters } from './story.types'

export const getStoryParametersPrompt = ({ imageType, environment, location, historicalEra, horrorType, language }: IStoryParameters) => `
**Parámetros a considerar:**

- **Estilo de imagen:** ${imageType}
- **Ambiente:** ${environment}
- **Ubicación:** ${location}
- **Época histórica:** ${historicalEra}
- **Tipo de horror:** ${horrorType}
- **Idioma:** ${language}
`

export interface IGetStoryDetailImagesPromptParams extends IStoryParameters {
  numberOfImages: number
}

export const getStoryDetailImagesPrompt = ({ imageType, numberOfImages }: IGetStoryDetailImagesPromptParams) => `
**Instrucciones para los prompts de imagen:**

- Genera **${numberOfImages} prompts detallados** para imágenes en inglés, teniendo en cuenta:
  - **Estilo visual:** ${imageType}
  - **Coherencia con la historia y los parámetros proporcionados**
  - **Descripciones vívidas y evocadoras que capturen la esencia de la escena**
  - **Las imagenes no deben incluir texto**

**Ejemplo de prompt de imagen:**
> A cinematic, wide-shot of a lone figure standing at the edge of a foggy, Japanese forest at twilight. The figure, dressed in traditional samurai armor, casts a long shadow as they gaze into the eerie, mist-filled distance.
`

export const getStoryAdditionalInstructionsPrompt = () => `
**Notas adicionales:**

- Asegura la coherencia y consistencia entre todos los parámetros proporcionados.
- Evita clichés y busca incorporar elementos únicos que sorprendan y enganchen al espectador.
- Prioriza la originalidad y el impacto emocional, creando una experiencia memorable.
- Mantén un tono y estilo apropiados para el género seleccionado.
`

export const getCurrentStoryPrompt = (story: ICurrentStory) => `
**Historia hasta el momento:**

- **Título:** ${story.title}
- **Texto completo:** ${story.text} ${story.scenes.map(scene => `(Opción seleccionada: "${scene.optionSelected}") ${scene.text}`).join(' ')}
`
