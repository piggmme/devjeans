import {api} from 'src/main'
import type {ApiResponseType} from 'src/types/api'
import type {PhotoPages, PhotoRes, SortType} from 'src/types/photo'

// 사진 업로드
export const uploadPhoto = async (formData: FormData) => {
  const config = {headers: {'Content-Type': 'multipart/form-data'}}

  const result = await api.post<ApiResponseType<PhotoRes>>(`/photo/upload`, formData, config)
  return result.data.data
}

// 사진 삭제
export const deletePhoto = async ({id}: {id: string | number}) => {
  const result = await api.delete<ApiResponseType<string>>(`/photo/${id}`)
  return result.data.data
}

// 특정 사진 가져오기
export const getPhoto = async ({id}: {id: string | number}) => {
  const result = await api.get<ApiResponseType<PhotoRes>>(`/photo/${id}`)
  return result.data.data
}

// 좋아요 토글
export const toggleLikePhoto = async ({isLiked, id}: {isLiked: boolean; id: string | number}) => {
  const result = isLiked
    ? await api.post<ApiResponseType<PhotoRes>>(`/photo/like/${id}`, {
        withCredentials: true,
      })
    : await api.post<ApiResponseType<PhotoRes>>(`/photo/like/cancel/${id}`, {
        withCredentials: true,
      })
  return result.data.data
}

// 버니 리스트 가져오기
export const getPhotos =
  (sort: SortType = 'latest') =>
  async ({pageParam = 0}) => {
    const result = await api.get<ApiResponseType<PhotoPages>>(`/photo/all/${sort}?page=${pageParam}`)

    return result.data
  }

// 좋아요 했는지 확인
export const checkLikePhoto = async ({photoId}: {photoId: string | number}) => {
  const result = await api.get<ApiResponseType<boolean>>(`/photo/user/like?photoId=${photoId}`)
  return result.data.data
}

// ranked 버니 리스트 한 페이지 가져오기
export const getBestPhotos = async () => {
  const result = await api.get<ApiResponseType<PhotoRes>>(`/photo/all/ranked?page=0`)
  return result.data.data
}
