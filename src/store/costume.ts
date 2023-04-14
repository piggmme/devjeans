import {writable} from 'svelte/store'
import {addCostume} from './canvas'

export const CostumeTitle = {
  body: '몸통',
  band: '밴드',
  arm: '팔',
  fill: '색상',
  top: '상의',
  bottom: '하의',
  neck: '목',
}

type CostumeColorable = {
  jacketClose: {
    body: string
    band: string
    arm: string
  }
  jacketOpen: {
    body: string
    band: string
    arm: string
  }
  pants: {
    fill: string
  }
  shirts: {
    fill: string
  }
  shoes: {
    fill: string
  }
  femaleHanbok: {
    top: string
    bottom: string
    neck: string
  }
  shirtDress: {
    fill: string
  }
  // yShirts: {
  //   fill: string
  // }
}

const initialCostume: CostumeColorable = {
  jacketClose: {
    body: '#6a4c93',
    band: '#ffffff',
    arm: '#ffffff',
  },
  jacketOpen: {
    body: '#1982c4',
    band: '#ffffff',
    arm: '#ffffff',
  },
  pants: {
    fill: '#1A1A1A',
  },
  shirts: {
    fill: '#ffffff',
  },
  shoes: {
    fill: '#ffca3a',
  },
  shirtDress: {
    fill: '#ffffff',
  },
  femaleHanbok: {
    top: '#FFB800',
    bottom: '#13C766',
    neck: '#F32626',
  },
  // yShirts: {
  //   fill: '#ffffff',
  // },
}

export type CostumeColorableKey = keyof CostumeColorable

export const costumeColorable = writable<CostumeColorable>(initialCostume)

export const setCostumeColorable = <T extends CostumeColorableKey>(key: T, value: CostumeColorable[T]) => {
  costumeColorable.update((costume) => {
    costume[key] = {...costume[key], ...value}
    return costume
  })

  addCostume(key)
}
