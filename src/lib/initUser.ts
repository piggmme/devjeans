import {getUserInfo} from 'src/api/service/user'
import {setUserInfo} from 'src/store/user'
import {userInfo} from 'src/store/user'

export const initUser = async () => {
  try {
    // 유저 정보를 가져옴
    const newUserInfo = await getUserInfo()
    setUserInfo(newUserInfo)
  } catch (e) {
    // 유저 정보를 null로 설정
    userInfo.set(null)
    return
  }
}
