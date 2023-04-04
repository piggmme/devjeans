import {writable} from 'svelte/store'
import {addCostume} from './canvas'

export const CostumeTitle = {
  body: '몸통',
  band: '밴드',
  arm: '팔',
  fill: '색상',
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
