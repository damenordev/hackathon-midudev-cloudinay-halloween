export interface IStoryParameterOption {
  label: string
  value: string
}

export interface IStoryParameters {
  imageType: string
  environment: string
  location: string
  historicalEra: string
  horrorType: string
  language: string
  duration?: number
}

export interface ICurrentStory {
  title: string
  text: string
  scenes: {
    text: string
    optionSelected: string
  }[]
}

export interface IStoryInitResponse {
  title: string
  text: string
  chatOptions: string[]
  promptsImages: string[]
}

export interface IStoryContinuationResponse {
  text: string
  chatOptions: string[]
}

export interface IStoryFinalResponse {
  text: string
  promptsImages: string[]
  summary: string
}
