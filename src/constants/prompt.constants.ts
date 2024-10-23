const IMAGE_STYLE_COMIC_PROMPT =
  'Comic style, with a dark and eerie atmosphere fitting for Halloween. Use deep shadows and strong contrasts, with thick, expressive outlines. The color palette should include dark tones like purple, black, and deep blue, with accents of orange and red to create a haunting atmosphere. The style should be dynamic, with intense lines that convey movement and tension, evoking the classic mystery and terror of Halloween.'

const IMAGE_STYLE_COMIC_RETRO_PROMPT =
  'Retro comic style, inspired by the classic horror comics of the 1950s. Use bold, vintage colors like muted yellows, reds, and greens, with halftone textures and thick black outlines. The atmosphere should feel eerie and nostalgic, with exaggerated facial expressions and dramatic lighting. Focus on creating a sense of suspense and mystery typical of classic horror comics, with stylized characters and detailed, moody backgrounds that evoke the vintage horror aesthetic.'

const IMAGE_STYLE_CYBERPUNK_PROMPT =
  'Cyberpunk comic style, featuring a dark, dystopian atmosphere infused with elements of horror. Use vibrant neon lights in electric blue, pink, and green, contrasting sharply with deep shadows and gritty, rain-soaked city streets. The scene should include sleek, futuristic technology and towering skyscrapers that loom ominously in the background. Characters should be heavily enhanced with cybernetic features, depicted with exaggerated expressions of fear and tension. The style should employ sharp, angular lines and dynamic lighting effects to enhance the sense of movement and decay. Include eerie elements like ghostly figures or unsettling, distorted reflections in the neon lights to create a haunting atmosphere, evoking a blend of fear and fascination typical of cyberpunk settings.'

const IMAGE_STYLE_REALISTIC_PROMPT =
  'Realistic horror style, immersing the viewer in a chilling atmosphere through lifelike imagery. The scene should be meticulously detailed, with dramatic shadows and lighting that enhance the sense of unease. Use a muted color palette with strategic contrasts to highlight eerie elements. The environment should feel tangible and immersive, filled with unsettling details that evoke dread. Characters should be portrayed with realistic textures and expressions, capturing moments of terror and suspense. Incorporate haunting elements such as ghostly apparitions, distorted reflections, and ominous landscapes, creating a nightmarish atmosphere that grips the viewer and evokes a profound sense of fear and tension.'

export const IMAGE_STYLES = {
  comic: IMAGE_STYLE_COMIC_PROMPT,
  'comic-retro': IMAGE_STYLE_COMIC_RETRO_PROMPT,
  cyberpunk: IMAGE_STYLE_CYBERPUNK_PROMPT,
  realistic: IMAGE_STYLE_REALISTIC_PROMPT,
}

export const IMAGE_STYLES_OPTIONS = Object.keys(IMAGE_STYLES)
