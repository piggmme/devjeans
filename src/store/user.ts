import type {UserInfo} from 'src/types/user'
import {writable} from 'svelte/store'
import {persisted} from 'svelte-local-storage-store'

export const userInfo = writable<UserInfo>()
export const setUserInfo = (info: UserInfo) => userInfo.set(info)
