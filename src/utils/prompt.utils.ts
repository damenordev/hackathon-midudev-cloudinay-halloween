import { IMAGE_STYLES } from "@/constants"
import type { TImageStyle } from "@/types"

export const getOutputFormatPrompt = (object: Record<string, any>) => `
**Formato de salida esperado (solo JSON):**

\`\`\`json
${JSON.stringify(object, null, 2)}
\`\`\`
`

export const additionalImageInstructionsPrompt = (numberOfImages: number, imageStyle: TImageStyle) => `
  - Generate **${numberOfImages} detailed prompts** for images in English, considering:
    - **Visual style:** ${IMAGE_STYLES[imageStyle]}
    - **Coherence with the story and provided parameters**
    - **Vivid and evocative descriptions that capture the essence of the scene**
    - **The images should not include text**
`

export const additionalImageCharactersInstructionsPrompt = () => `
  - For character images, in English, considering:
    - **Must maintain consistency with the provided image style**
    - **The background should be white**
    - **ID card style**
    - **Only the face and shoulders should be visible**
`