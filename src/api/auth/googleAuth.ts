import {initUser} from 'src/lib/initUser'
import {login} from '../service/auth'

type InitAuthProps = {
  ref: HTMLElement
}

export const initAuth2 = ({ref}: InitAuthProps) => {
  google.accounts.id.initialize({
    client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
    callback: async (res) => {
      await login({idToken: res.credential})
      await initUser()
    },
  })

  google.accounts.id.renderButton(
    ref,
    {theme: 'outline', size: 'large', type: 'standard'}, // customization attributes
  )
}
