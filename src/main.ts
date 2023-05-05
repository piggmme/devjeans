import './app.css'
import './i18n'
import App from './App.svelte'
import './api/firebase/firebase'
import axios from 'axios'
import {userInfo} from './store/user'

axios.defaults.withCredentials = true

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  timeout: 2500,
  withCredentials: true,
})

api.interceptors.response.use(
  function (response) {
    return response
  },

  function (error) {
    if (error.response.status === 403) {
      userInfo.set(null)
    }
    return Promise.reject(error)
  },
)

const app = new App({
  target: document.getElementById('app'),
})

export default app
