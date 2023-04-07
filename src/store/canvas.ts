import {fabric} from 'fabric'
import {get, writable} from 'svelte/store'

import {getRandomInt} from 'src/lib/getRandom'
import {backgrounds} from 'src/const/colors'

import glassesImg from 'src/assets/costume/glasses.png'
import laptopImg from 'src/assets/costume/laptop.png'
import hairImg from 'src/assets/costume/hair.png'
import coffeeImg from 'src/assets/costume/coffee.png'
import gogglesImg from 'src/assets/costume/goggles.png'
import hairbandImg from 'src/assets/costume/hairband.png'
import headphonesImg from 'src/assets/costume/headphones.png'
import basketballImg from 'src/assets/costume/basketball.png'
import basketballVestImg from 'src/assets/costume/basketballVest.png'
import airpotImg from 'src/assets/costume/airpot.png'
import ballCapImg from 'src/assets/costume/ballCap.png'
import darkCirclesImg from 'src/assets/costume/darkCircles.png'
import toastImg from 'src/assets/costume/toast.png'
import watchImg from 'src/assets/costume/watch.png'
import cookieImg from 'src/assets/costume/cookie.png'
import hardHatImg from 'src/assets/costume/hardHat.png'
import boxingHeadgearImg from 'src/assets/costume/boxingHeadgear.png'
import boxingGlovesImg from 'src/assets/costume/boxingGloves.png'
import baseballGloveImg from 'src/assets/costume/baseballGlove.png'
import sunglassesImg from 'src/assets/costume/sunglasses.png'
import employeeIdCardImg from 'src/assets/costume/employeeIdCard.png'
import hamburgerImg from 'src/assets/costume/hamburger.png'
import carrotImg from 'src/assets/costume/carrot.png'

import jacketCloseImg from 'src/assets/costume/default/jacketClose.png'
import jacketOpenImg from 'src/assets/costume/default/jacketOpen.png'
import pantsImg from 'src/assets/costume/default/pants.png'
import shirtsImg from 'src/assets/costume/default/shirts.png'
import shoesImg from 'src/assets/costume/default/shoes.png'

export const isReadyCostume = writable({
  shirts: false,
  pants: false,
  jacketClose: false,
  jacketOpen: false,
  shoes: false,
})

export const background = writable(backgrounds[getRandomInt(0, backgrounds.length - 1)])
export const backgroundImage = writable('')

export const canvas = writable<fabric.Canvas | null>()
export const savedCanvas = writable<{version: string; objects: Object[]}>()

export const width = writable(600)

export type CostumeKeys = keyof typeof costumeInfo

export type InfoType = {
  type: 'item'
  title: string
  src: string
  isHas: boolean
  zIndex?: number
}

export type ColorableInfoType = {
  type: 'colorable'
  title: string
  src: string
  isHas: boolean
  zIndex?: number
}

export const categories = ['basic', 'head', 'face', 'mouth', 'hands', 'body']

export type CategoryKey = keyof typeof categoryCostume

export const categoryCostume = {
  basic: ['shirts', 'pants', 'jacketClose', 'jacketOpen', 'shoes'],
  mouth: ['carrot', 'toast', 'cookie'],
  head: ['boxingHeadgear', 'hairband', 'hardHat', 'hair', 'headphones', 'airpot', 'ballCap'],
  face: ['sunglasses', 'glasses', 'goggles', 'darkCircles'],
  hands: ['hamburger', 'boxingGloves', 'baseballGlove', 'laptop', 'coffee', 'basketball', 'watch'],
  body: ['employeeIdCard', 'basketballVest'],
}

export type CostumeInfosType = {
  glasses: InfoType
  hair: InfoType
  laptop: InfoType
  coffee: InfoType
  goggles: InfoType
  hairband: InfoType
  headphones: InfoType
  basketballVest: InfoType
  basketball: InfoType
  airpot: InfoType
  ballCap: InfoType
  darkCircles: InfoType
  toast: InfoType
  watch: InfoType
  cookie: InfoType
  hardHat: InfoType
  boxingHeadgear: InfoType
  boxingGloves: InfoType
  baseballGlove: InfoType
  sunglasses: InfoType
  employeeIdCard: InfoType
  hamburger: InfoType
  carrot: InfoType

  shirts: ColorableInfoType
  pants: ColorableInfoType
  jacketClose: ColorableInfoType
  jacketOpen: ColorableInfoType
  shoes: ColorableInfoType
}

export const InitHasCostume = {
  glasses: false,
  hair: false,
  laptop: false,
  coffee: false,
  goggles: false,
  hairband: false,
  headphones: false,
  basketballVest: false,
  basketball: false,
  airpot: false,
  ballCap: false,
  darkCircles: false,
  toast: false,
  watch: false,
  cookie: false,
  hardHat: false,
  boxingHeadgear: false,
  boxingGloves: false,
  baseballGlove: false,
  sunglasses: false,

  shirts: true,
  pants: true,
  jacketClose: false,
  jacketOpen: false,
  shoes: true,
}

export const costumeInfo: CostumeInfosType = {
  glasses: {
    type: 'item',
    title: 'glasses',
    src: glassesImg,
    isHas: false,
    zIndex: 1000,
  },
  hair: {
    type: 'item',
    title: 'bangs',
    src: hairImg,
    isHas: false,
    zIndex: 1000,
  },
  laptop: {
    type: 'item',
    title: 'laptop',
    src: laptopImg,
    isHas: false,
    zIndex: 1000,
  },
  coffee: {
    type: 'item',
    title: 'coffee',
    src: coffeeImg,
    isHas: false,
    zIndex: 1000,
  },
  goggles: {
    type: 'item',
    title: 'goggles',
    src: gogglesImg,
    isHas: false,
    zIndex: 1000,
  },
  headphones: {
    type: 'item',
    title: 'headphones',
    src: headphonesImg,
    isHas: false,
    zIndex: 1000,
  },
  hairband: {
    type: 'item',
    title: 'hairband',
    src: hairbandImg,
    isHas: false,
    zIndex: 1000,
  },
  basketballVest: {
    type: 'item',
    title: 'basketballVest',
    src: basketballVestImg,
    isHas: false,
    zIndex: 100,
  },
  basketball: {
    type: 'item',
    title: 'basketball',
    src: basketballImg,
    isHas: false,
    zIndex: 1001,
  },
  airpot: {
    type: 'item',
    title: 'airpod',
    src: airpotImg,
    isHas: false,
    zIndex: 1000,
  },

  ballCap: {
    type: 'item',
    title: 'ballCap',
    src: ballCapImg,
    isHas: false,
    zIndex: 1000,
  },
  darkCircles: {
    type: 'item',
    title: 'darkCircle',
    src: darkCirclesImg,
    isHas: false,
    zIndex: 100,
  },
  hardHat: {
    type: 'item',
    title: 'safetyHelmet',
    src: hardHatImg,
    isHas: false,
    zIndex: 1000,
  },
  toast: {
    type: 'item',
    title: 'toast',
    src: toastImg,
    isHas: false,
    zIndex: 1000,
  },
  watch: {
    type: 'item',
    title: 'appleWatch',
    src: watchImg,
    isHas: false,
    zIndex: 1000,
  },
  cookie: {
    type: 'item',
    title: 'cookie',
    src: cookieImg,
    isHas: false,
    zIndex: 1000,
  },
  boxingHeadgear: {
    type: 'item',
    title: 'boxingHeadgear',
    src: boxingHeadgearImg,
    isHas: false,
    zIndex: 1000,
  },
  boxingGloves: {
    type: 'item',
    title: 'boxingGloves',
    src: boxingGlovesImg,
    isHas: false,
    zIndex: 1000,
  },
  baseballGlove: {
    type: 'item',
    title: 'baseballGlove',
    src: baseballGloveImg,
    isHas: false,
    zIndex: 1000,
  },
  sunglasses: {
    type: 'item',
    title: 'sunglasses',
    src: sunglassesImg,
    isHas: false,
    zIndex: 1000,
  },
  employeeIdCard: {
    type: 'item',
    title: 'employeeIdCard',
    src: employeeIdCardImg,
    isHas: false,
    zIndex: 1000,
  },
  hamburger: {
    type: 'item',
    title: 'hamburger',
    src: hamburgerImg,
    isHas: false,
    zIndex: 100,
  },
  carrot: {
    type: 'item',
    title: 'carrot',
    src: carrotImg,
    isHas: false,
    zIndex: 1000,
  },

  shirts: {
    type: 'colorable',
    title: 'tShirt',
    isHas: true,
    zIndex: 11,
    src: shirtsImg,
  },
  pants: {
    type: 'colorable',
    title: 'pants',
    isHas: true,
    zIndex: 10,
    src: pantsImg,
  },
  jacketClose: {
    type: 'colorable',
    title: 'jacketClose',
    isHas: false,
    zIndex: 100,
    src: jacketCloseImg,
  },
  jacketOpen: {
    type: 'colorable',
    title: 'jacketOpen',
    isHas: false,
    zIndex: 100,
    src: jacketOpenImg,
  },
  shoes: {
    type: 'colorable',
    title: 'shoes',
    isHas: true,
    zIndex: 100,
    src: shoesImg,
  },
}

export const hasCostume = writable(costumeInfo)

export const toggleCostume = (target: CostumeKeys) => {
  hasCostume.update((costume) => {
    costume[target].isHas = !costume[target].isHas
    return costume
  })
}

export const resetCostume = (target: CategoryKey) => {
  hasCostume.update((costume) => {
    categoryCostume[target].forEach((key) => {
      costume[key].isHas = InitHasCostume[key]
    })
    return costume
  })
}

export const addCostume = (costume: CostumeKeys) => {
  const $canvas = get(canvas)
  const $width = get(width)

  // 색상 커스텀 불가능한 아이템
  if (costumeInfo[costume].type === 'item') {
    const currentCostume = costumeInfo[costume] as InfoType
    let costumeImg = currentCostume.src

    fabric.Image.fromURL(costumeImg, function (img) {
      img.scaleToWidth($width)
      img.selectable = false

      img.set('itemType', 'costume')
      img.set('costume', costume)
      $canvas.add(img)

      sortByZindex()
      $canvas.renderAll()
    })
    return
  }

  const svg = document.getElementById(costume).outerHTML
  const encodedSVG = btoa(unescape(encodeURIComponent(svg)))

  // 색상값을 바꾸는 경우를 위해 추가함
  $canvas.getObjects().forEach((obj) => {
    if (obj.costume === costume) {
      $canvas.remove(obj)
    }
  })

  isReadyCostume.update((prev) => ({...prev, [costume]: false}))

  const lineImg = new Image()
  lineImg.src = costumeInfo[costume].src

  const colorableImg = new Image()
  colorableImg.src = 'data:image/svg+xml;base64,' + encodedSVG

  lineImg.onload = () => {
    uploadColorableCostume(costume, lineImg, colorableImg)
  }

  colorableImg.onload = () => {
    uploadColorableCostume(costume, lineImg, colorableImg)
  }
}

const uploadColorableCostume = (costume: string, lineImg: HTMLImageElement, colorableImg: HTMLImageElement) => {
  const $canvas = get(canvas)
  const isReady = get(isReadyCostume)
  if (!isReady[costume]) {
    isReadyCostume.update((prev) => ({...prev, [costume]: true}))
    return
  }

  const line = new fabric.Image(lineImg)
  const colorable = new fabric.Image(colorableImg)

  const group = new fabric.Group([colorable, line], {
    left: 0,
    top: 0,
    selectable: false,
    itemType: 'costume',
    costume,
  })
  group.scaleToWidth($canvas.width)
  $canvas.add(group)

  sortByZindex()

  isReadyCostume.update((prev) => ({...prev, [costume]: false}))
}

export const removeCostume = (costume: CostumeKeys) => {
  const $canvas = get(canvas)

  const objects = $canvas.getObjects()
  const costumeObjects = objects.filter((obj) => obj.costume === costume)
  costumeObjects.forEach((obj) => $canvas.remove(obj))
}

export const sortByZindex = () => {
  const $canvas = get(canvas)
  const objects = $canvas.getObjects()

  const costumeList = objects.filter((obj) => obj.costume)
  costumeList.sort((a, b) => {
    return costumeInfo[a.costume].zIndex - costumeInfo[b.costume].zIndex
  })
  costumeList.forEach((obj) => {
    $canvas.moveTo(obj, costumeInfo[obj.costume].zIndex)
  })

  for (const obj of objects) {
    if (!obj.itemType) $canvas.bringToFront(obj)

    if (obj.itemType === 'photo') $canvas.bringToFront(obj)
  }
}
