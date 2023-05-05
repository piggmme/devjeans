import axios from 'axios'
import {userInfo} from 'src/store/user'
import type {ApiResponseType} from 'src/types/api'
import type {PhotoRes} from 'src/types/photo'
import type {UserInfo} from 'src/types/user'

export const getUserInfo = async () => {
  let result = null
  try {
    result = await axios.get<ApiResponseType<UserInfo>>(`${import.meta.env.VITE_APP_API_URL}/user/info`, {
      withCredentials: true,
    })
  } catch (e) {
    // 인증이 만료되면 userInfo를 null로 설정
    // 그럼 프론트에서 로그인이 풀리게됨
    if (e.response.status === 403) {
      userInfo.set(null)
    }
  }
  return result?.data?.data
}

export const getUserPhotos = async () => {
  const result = await axios.get<ApiResponseType<PhotoRes[]>>(`${import.meta.env.VITE_APP_API_URL}/user/photos`, {
    withCredentials: true,
  })
  return result.data.data
}
