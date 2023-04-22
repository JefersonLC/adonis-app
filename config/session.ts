import Env from '@ioc:Adonis/Core/Env'
import Application from '@ioc:Adonis/Core/Application'
import { sessionConfig } from '@adonisjs/session/build/config'

export default sessionConfig({
  enabled: true,
  driver: Env.get('SESSION_DRIVER'),
  cookieName: 'adonis-session',
  clearWithBrowser: true,
  age: '1h',
  cookie: {
    path: '/',
    httpOnly: true,
    sameSite: false,
  },
  file: {
    location: Application.tmpPath('sessions'),
  },
  redisConnection: 'local',
})
