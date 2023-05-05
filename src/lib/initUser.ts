import {getUserInfo} from 'src/api/service/user'
import {idToken, setUserInfo} from 'src/store/user'
import {userInfo} from 'src/store/user'

export const initUser = async () => {
  try {
    // 유저 정보를 가져옴
    const newUserInfo = await getUserInfo()
    setUserInfo(newUserInfo)
  } catch (e) {
    // 토큰을 초기화하고 유저 정보를 null로 설정
    idToken.set(null)
    userInfo.set(null)
    return
  }
}
