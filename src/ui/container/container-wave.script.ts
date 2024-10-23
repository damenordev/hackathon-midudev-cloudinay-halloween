export interface IInitContainerWaveArgs {
  main: HTMLElement
  selectMonster: HTMLElement
  groundText: HTMLElement
  groundGroup: HTMLElement
  groundWave: HTMLElement
}

export const initContainerWave = ({
  main,
  selectMonster,
  groundText,
  groundGroup,
  groundWave,
}: IInitContainerWaveArgs) => {

  const monsterBkgd = {
    ghost: '#FF7B00',
    ghoul: '#096B00',
    'marshmallow monster': '#009DFF',
    vampire: '#c1121f',
    werewolf: '#FF3700',
    skeleton: '#8F8F8F',
  }

  selectMonster?.addEventListener('change', (e: any) => {
    // groundText.textContent = `${e.target.value}`

    //update background based on current option
    const lowercase = e.target.value.toLowerCase()

    const colors = (monsterColors: any) => {
      for (let color in monsterColors) {
        if (color === lowercase) {
          main.style.background = `radial-gradient(circle at 50% 100%, ${monsterColors[color]} 0, ${monsterColors[color]} .25rem,transparent), radial-gradient(circle at 50% 70%, white 0, white 10rem, #632c90 10.1rem, #632c90 20rem, #532881 20.1rem, #532881 30rem, #3d2673 30.1rem, #3d2673 40rem, #272163 40.1rem) no-repeat center center fixed`
        }
      }
    }

    colors(monsterBkgd)

    if (e.target.value === 'Ghost') {
      ghost()
    } else if (e.target.value === 'Ghoul') {
      ghoul()
    } else if (e.target.value === 'Marshmallow Monster') {
      marshmallow()
    } else if (e.target.value === 'Vampire') {
      vampire()
    } else if (e.target.value === 'Werewolf') {
      werewolf()
    } else if (e.target.value === 'Skeleton') {
      skeleton()
    }
  })

  const ghost = () => {
    groundText.textContent = 'Fantasmas'
    groundText.style.fontFamily = 'Walter Turncoat'
    groundWave.style.fontSize = '4.25rem'
    groundGroup.style.animationName = 'ghost'
    groundGroup.style.animationDuration = '4s'
  }

  const ghoul = () => {
    groundText.textContent = 'Ghoul'
    groundText.style.fontFamily = 'Rock Salt'
    groundWave.style.fontSize = '4.25rem'
    groundGroup.style.animationName = 'ghoul'
    groundGroup.style.animationDuration = '4s'
  }

  const marshmallow = () => {
    groundText.textContent = 'Malvaviscos'
    groundText.style.fontFamily = 'Sniglet'
    groundGroup.style.animationName = 'marshmallow'
    groundWave.style.fontSize = '2.25rem'
    groundGroup.style.animationDuration = '4s'
  }

  const vampire = () => {
    groundText.textContent = 'Vampiros'
    groundText.style.fontFamily = 'Nosifer'
    groundGroup.style.animationName = 'vampire'
    groundGroup.style.animationDuration = '6s'
    groundWave.style.fontSize = '2.25rem'
  }

  const werewolf = () => {
    groundText.textContent = 'Lobos'
    groundText.style.fontFamily = 'Cinzel'
    groundGroup.style.animationName = 'werewolf'
    groundGroup.style.animationDuration = '4s'
  }

  const skeleton = () => {
    groundText.textContent = 'Esqueletos'
    groundText.style.fontFamily = 'Sue Ellen Francisco'
    groundWave.style.fontSize = '4.25rem'
    groundGroup.style.animationName = 'skeleton'
    groundGroup.style.animationDuration = '.5s'
  }

}