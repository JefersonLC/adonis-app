import Server from '@ioc:Adonis/Core/Server'

Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
  () => import('@ioc:Adonis/Addons/Shield'),
])

Server.middleware.registerNamed({
  auth: () => import('App/Middleware/Auth'),
  checkAuth: () => import('App/Middleware/SilentAuth'),
  verifyEmail: () => import('App/Middleware/VerifyEmail'),
  isAdmin: () => import('App/Middleware/VerifyAdmin'),
})
