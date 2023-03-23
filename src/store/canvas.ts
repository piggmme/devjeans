import type {fabric} from 'fabric'
import {writable} from 'svelte/store'

import glassesImg from '../assets/costume/glasses.png'
import laptopImg from '../assets/costume/laptop.png'
import hairImg from '../assets/costume/hair.png'
import coffeeImg from '../assets/costume/coffee.png'
import gogglesImg from '../assets/costume/goggles.png'
import hairbandImg from '../assets/costume/hairband.png'
import headphonesImg from '../assets/costume/headphones.png'
import basketballImg from '../assets/costume/basketball.png'
import basketballVestImg from '../assets/costume/basketballVest.png'

export const background = writable('#F9BB01')

export const canvas = writable<fabric.Canvas | null>()
export const width = writable(600)

const defaultCostume = {
  glasses: false,
  hair: false,
  laptop: false,
  coffee: false,
  goggles: false,
  hairband: false,
  headphones: false,
  basketball: false,
  basketballVest: false,
}

export type CostumeKeys = keyof typeof defaultCostume

export const costumeInfo = {
  glasses: {
    title: '안경',
    src: glassesImg,
  },
  hair: {
    title: '앞머리',
    src: hairImg,
  },
  laptop: {
    title: '노트북',
    src: laptopImg,
  },
  coffee: {
    title: '커피',
    src: coffeeImg,
  },
  goggles: {
    title: '고글',
    src: gogglesImg,
  },
  headphones: {
    title: '헤드폰',
    src: headphonesImg,
  },
  hairband: {
    title: '농구 머리띠',
    src: hairbandImg,
  },
  basketballVest: {
    title: '농구 조끼',
    src: basketballVestImg,
  },
  basketball: {
    title: '농구 공',
    src: basketballImg,
  },
}

export const hasCostume = writable(defaultCostume)

export const toggleCostume = (target: keyof typeof defaultCostume) => {
  hasCostume.update((prev) => ({
    ...prev,
    [target]: !prev[target],
  }))
}
