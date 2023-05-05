import {api} from 'src/main'
import {userInfo} from 'src/store/user'

export const login = async ({idToken}: {idToken: string}) => {
  try {
    const result = await api.post(`/v1/oauth/login`, {
      idToken,
    })
    return result.data
  } catch (e) {
    console.error(e)
  }
}

export const logout = async () => {
  try {
    const result = await api.post(`/v1/oauth/logout`)
    userInfo.set(null)

    return result.data
  } catch (e) {
    console.error(e)
  }
}
