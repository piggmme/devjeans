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
import sneakersImg from 'src/assets/costume/sneakers.png'
import cookieImg from 'src/assets/costume/cookie.png'
import hardHatImg from 'src/assets/costume/hardHat.png'

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
}

export const categories = ['옷', '모자', '신발', '기타']

export type CategoryKey = keyof typeof categoryCostume

export const categoryCostume = {
  옷: ['basketballVest'],
  모자: ['hairband', 'ballCap', 'hardHat'],
  신발: ['sneakers'],
  기타: [
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
  sneakers: InfoType
  cookie: InfoType
  hardHat: InfoType
}

export const costumeInfo: CostumeInfosType = {
  glasses: {
    title: '안경',
    src: glassesImg,
    isHas: false,
  },
  hair: {
    title: '앞머리',
    src: hairImg,
    isHas: false,
  },
  laptop: {
    title: '노트북',
    src: laptopImg,
    isHas: false,
  },
  coffee: {
    title: '커피',
    src: coffeeImg,
    isHas: false,
  },
  goggles: {
    title: '고글',
    src: gogglesImg,
    isHas: false,
  },
  headphones: {
    title: '헤드폰',
    src: headphonesImg,
    isHas: false,
  },
  hairband: {
    title: '농구 머리띠',
    src: hairbandImg,
    isHas: false,
  },
  basketballVest: {
    title: '농구 조끼',
    src: basketballVestImg,
    isHas: false,
  },
  basketball: {
    title: '농구 공',
    src: basketballImg,
    isHas: false,
  },
  airpot: {
    title: '에어팟',
    src: airpotImg,
    isHas: false,
  },

  ballCap: {
    title: '볼캡',
    src: ballCapImg,
    isHas: false,
  },
  darkCircles: {
    title: '다크써클',
    src: darkCirclesImg,
    isHas: false,
  },
  hardHat: {
    title: '안전모',
    src: hardHatImg,
    isHas: false,
  },
  toast: {
    title: '토스트',
    src: toastImg,
    isHas: false,
  },
  watch: {
    title: '애플워치',
    src: watchImg,
    isHas: false,
  },
  sneakers: {
    title: '운동화',
    src: sneakersImg,
    isHas: false,
  },
  cookie: {
    title: '쿠키',
    src: cookieImg,
    isHas: false,
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
      costume[key].isHas = false
    })
    return costume
  })
}

export const addCostume = (costume: CostumeKeys) => {
  const $canvas = get(canvas)
  const $width = get(width)

  let costumeImg = costumeInfo[costume].src

  fabric.Image.fromURL(costumeImg, function (img) {
    img.scaleToWidth($width)
    img.scaleToWidth($width)
    img.selectable = false

    img.set('itemType', 'costume')
    img.set('costume', costume)
    $canvas.add(img)

    // 캔버스의 오브젝트들을 순회하며 basketball은 가장 위로 올림
    // TODO. index를 Costume 마다 관리해야함
    $canvas.getObjects().forEach((obj) => {
      if (obj.costume === 'basketball' || obj.costume === 'laptop') {
        $canvas.moveTo(obj, 100)
      }
    })

    $canvas.renderAll()
  })
}

export const removeCostume = (costume: CostumeKeys) => {
  const $canvas = get(canvas)

  const objects = $canvas.getObjects()
  const costumeObjects = objects.filter((obj) => obj.costume === costume)
  costumeObjects.forEach((obj) => $canvas.remove(obj))
}
