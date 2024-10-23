import { IMAGE_STYLES } from '@/constants'

export type TImageStyle = keyof typeof IMAGE_STYLES

export interface IStoryInitialParams {
  theme: string
  era: string
  location: string
  language: string
  imageStyle: TImageStyle 
}