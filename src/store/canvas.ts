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

export const isReadyCostume = writable(false)

export const background = writable(backgrounds[getRandomInt(0, backgrounds.length - 1)])
export const backgroundImage = writable('')

export const canvas = writable<fabric.Canvas | null>()
export const savedCanvas = writable<{version: string; objects: Object[]}>()

export const width = writable(600)

export type CostumeKeys = keyof typeof costumeInfo

export type InfoType = {
  title: string
  src: string
  isHas: boolean
  zIndex?: number
}

export type ColorableInfoType = {
  title: string
  isHas: boolean
  zIndex?: number
}

export const categories = ['기본', '아이템']

export type CategoryKey = keyof typeof categoryCostume

export const categoryCostume = {
  기본: ['shirts', 'pants', 'jacketClose', 'jacketOpen', 'shoes'],
  아이템: [
    'basketballVest',
    'hairband',
    'ballCap',
    'hardHat',
    'glasses',
    'laptop',
    'coffee',
    'goggles',
    'headphones',
    'basketball',
    'airpot',
    'darkCircles',
    'toast',
    'watch',
    'cookie',
  ],
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

  shirts: true,
  pants: true,
  jacketClose: false,
  jacketOpen: false,
  shoes: true,
}

export const costumeInfo: CostumeInfosType = {
  glasses: {
    title: '안경',
    src: glassesImg,
    isHas: false,
    zIndex: 1000,
  },
  hair: {
    title: '앞머리',
    src: hairImg,
    isHas: false,
    zIndex: 1000,
  },
  laptop: {
    title: '노트북',
    src: laptopImg,
    isHas: false,
    zIndex: 1000,
  },
  coffee: {
    title: '커피',
    src: coffeeImg,
    isHas: false,
    zIndex: 1000,
  },
  goggles: {
    title: '고글',
    src: gogglesImg,
    isHas: false,
    zIndex: 1000,
  },
  headphones: {
    title: '헤드폰',
    src: headphonesImg,
    isHas: false,
    zIndex: 1000,
  },
  hairband: {
    title: '농구 머리띠',
    src: hairbandImg,
    isHas: false,
    zIndex: 1000,
  },
  basketballVest: {
    title: '농구 조끼',
    src: basketballVestImg,
    isHas: false,
    zIndex: 10,
  },
  basketball: {
    title: '농구 공',
    src: basketballImg,
    isHas: false,
    zIndex: 1000,
  },
  airpot: {
    title: '에어팟',
    src: airpotImg,
    isHas: false,
    zIndex: 1000,
  },

  ballCap: {
    title: '볼캡',
    src: ballCapImg,
    isHas: false,
    zIndex: 1000,
  },
  darkCircles: {
    title: '다크써클',
    src: darkCirclesImg,
    isHas: false,
    zIndex: 100,
  },
  hardHat: {
    title: '안전모',
    src: hardHatImg,
    isHas: false,
    zIndex: 1000,
  },
  toast: {
    title: '토스트',
    src: toastImg,
    isHas: false,
    zIndex: 1000,
  },
  watch: {
    title: '애플워치',
    src: watchImg,
    isHas: false,
    zIndex: 1000,
  },
  cookie: {
    title: '쿠키',
    src: cookieImg,
    isHas: false,
    zIndex: 1000,
  },

  shirts: {
    title: '반팔',
    isHas: true,
    zIndex: 11,
  },
  pants: {
    title: '바지',
    isHas: true,
    zIndex: 10,
  },
  jacketClose: {
    title: '야구잠바 1',
    isHas: false,
    zIndex: 100,
  },
  jacketOpen: {
    title: '야구잠바 2',
    isHas: false,
    zIndex: 100,
  },
  shoes: {
    title: '신발',
    isHas: true,
    zIndex: 100,
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
      console.log(key, costumeInfo[key])
      costume[key].isHas = InitHasCostume[key]
    })
    return costume
  })
}

export const addCostume = (costume: CostumeKeys) => {
  const $canvas = get(canvas)
  const $width = get(width)

  // 색상 커스텀 불가능한 아이템
  if (costumeInfo[costume].src) {
    const currentCostume = costumeInfo[costume] as InfoType
    let costumeImg = currentCostume.src

    fabric.Image.fromURL(costumeImg, function (img) {
      img.scaleToWidth($width)
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

  const svg = document.getElementById(costume)
  const svgString = new XMLSerializer().serializeToString(svg)

  // 색상값을 바꾸는 경우를 위해 추가함
  $canvas.getObjects().forEach((obj) => {
    if (obj.costume === costume) {
      $canvas.remove(obj)
    }
  })

  fabric.Image.fromURL('data:image/svg+xml;utf8,' + encodeURIComponent(svgString), function (img) {
    img.scaleToWidth($width)
    img.scaleToWidth($width)
    img.set('itemType', 'costume')
    img.set('costume', costume)
    img.selectable = false

    $canvas.add(img)
    sortByZindex()
    $canvas.renderAll()
  })
}

export const removeCostume = (costume: CostumeKeys) => {
  const $canvas = get(canvas)

  const objects = $canvas.getObjects()
  const costumeObjects = objects.filter((obj) => obj.costume === costume)
  costumeObjects.forEach((obj) => $canvas.remove(obj))
}

export const sortByZindex = () => {
  const $canvas = get(canvas)

  const costumeList = $canvas.getObjects().filter((obj) => obj.costume)
  costumeList.sort((a, b) => {
    return costumeInfo[a.costume].zIndex - costumeInfo[b.costume].zIndex
  })
  costumeList.forEach((obj) => {
    $canvas.moveTo(obj, costumeInfo[obj.costume].zIndex)
  })
}
