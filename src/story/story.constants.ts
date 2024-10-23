import { type IStoryParameterOption } from './story.types'

export const STORY_INIT_IMAGES_COUNT = 3
export const STORY_INIT_DURATION = 13
export const STORY_CHAT_OPTIONS_COUNT = 4
export const STORY_FINAL_IMAGES_COUNT = 4
export const STORY_FINAL_DURATION = 28

export const STORY_IMAGE_TYPE_OPTIONS: IStoryParameterOption[] = [
  { label: 'Realista', value: 'realistic' },
  { label: 'Cómic', value: 'comic' },
  { label: 'Pintura', value: 'painting' },
  { label: 'Arte Digital', value: 'digital_art' },
  { label: 'Pixel Art', value: 'pixel_art' },
  { label: 'Surrealista', value: 'surreal' },
  { label: 'Estilo de Videojuego', value: 'game_style' },
  { label: 'Animación', value: 'animation' },
  { label: 'Estilo Grunge', value: 'grunge' },
  { label: 'Retro', value: 'retro' },
]

export const STORY_ENVIRONMENT_OPTIONS: IStoryParameterOption[] = [
  { label: 'Casa Encantada', value: 'haunted_house' },
  { label: 'Bosque Oscuro', value: 'dark_forest' },
  { label: 'Hospital Abandonado', value: 'abandoned_hospital' },
  { label: 'Cementerio Espeluznante', value: 'creepy_cemetery' },
  { label: 'Pueblo Desolado', value: 'desolate_town' },
  { label: 'Cueva Tenebrosa', value: 'dark_cave' },
  { label: 'Ruinas Antiguas', value: 'ancient_ruins' },
  { label: 'Fábrica Abandonada', value: 'abandoned_factory' },
  { label: 'Isla Desierta', value: 'deserted_island' },
  { label: 'Parque de Atracciones Abandonado', value: 'abandoned_amusement_park' },
]

export const STORY_LOCATION_OPTIONS: IStoryParameterOption[] = [
  { label: 'Europa', value: 'europe' },
  { label: 'Asia', value: 'asia' },
  { label: 'América', value: 'america' },
  { label: 'Sudamérica', value: 'south_america' },
  { label: 'África', value: 'africa' },
  { label: 'Oceanía', value: 'oceania' },
]

export const STORY_HISTORICAL_ERA_OPTIONS: IStoryParameterOption[] = [
  { label: 'Medieval', value: 'medieval' },
  { label: 'Futurista', value: 'futuristic' },
  { label: 'Victoriana', value: 'victorian' },
  { label: 'Antigua', value: 'ancient' },
  { label: 'Moderna', value: 'modern' },
  { label: 'Simpsons', value: 'simpsons' },
  { label: 'Cyberpunk', value: 'cyberpunk' },
  { label: 'SteamPunk', value: 'steampunk' },
  { label: 'Era de los Dinosaurios', value: 'dinosaur_era' },
  { label: 'Era de los Robots', value: 'robot_age' },
]

export const STORY_HORROR_TYPE_OPTIONS: IStoryParameterOption[] = [
  { label: 'Sobrenatural', value: 'supernatural' },
  { label: 'Psicológico', value: 'psychological' },
  { label: 'Asesino', value: 'slasher' },
  { label: 'Cósmico', value: 'cosmic' },
  { label: 'Folk Horror', value: 'folk_horror' },
]
