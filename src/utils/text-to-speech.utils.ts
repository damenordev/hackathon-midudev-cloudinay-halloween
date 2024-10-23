import textToSpeech from '@google-cloud/text-to-speech'

import { GOOGLE_TEXT_TO_SPEECH_API_KEY } from '@/constants'

const textToSpeechClient = new textToSpeech.TextToSpeechClient({ apiKey: GOOGLE_TEXT_TO_SPEECH_API_KEY })

export const createAudioByText = async (text: string) => {
  const config = {
    input: { text },
    voice: { languageCode: 'es-ES', name: 'es-ES-Studio-C' },
    audioConfig: { audioEncoding: 'MP3' as const },
  }
  const [response] = await textToSpeechClient.synthesizeSpeech(config)
  const id = crypto.randomUUID()
  const audioPath = `./public/audios/${id}.mp3`
  return { audioPath, audioContent: response.audioContent as string }
}
