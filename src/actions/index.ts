import { signInWithTwitch, signOut } from './auth.actions'
import { generateInitialStory, generateContinueStory } from './story'
import { generateImage } from './generate-image.actions'
import { updateStory, createAudio, generateVideoTranscribed } from './story.actions'
import { generateEndStory } from './story'

export const server = {
  generateImage,
  signInWithTwitch,
  signOut,
  generateInitialStory,
  generateContinueStory,
  generateEndStory,
  updateStory,
  createAudio,
  generateVideoTranscribed,
}
