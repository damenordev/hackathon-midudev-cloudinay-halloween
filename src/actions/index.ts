import { signInWithTwitch, signOut } from './auth.actions'
import { generateInitialStory, generateContinueStory } from './story'
import { generateImage } from './generate-image.actions'
import { updateStory } from './story.actions'

export const server = {
  generateImage,
  signInWithTwitch,
  signOut,
  generateInitialStory,
  generateContinueStory,
  updateStory,
}
