import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Token from 'App/Models/Token'
import { loginMessages, loginSchema } from 'App/Validation/LoginUser'

export default class AuthController {
  public async login({ request, auth, response, session }: HttpContextContract) {
    const { email, password, rememberMe } = await request.validate({
      schema: loginSchema,
      messages: loginMessages,
    })

    try {
      await auth.attempt(email, password, !!rememberMe)
      session.regenerate()
      return response.redirect().toRoute('user.profile')
    } catch (error) {
      session.flash({ loginError: 'Correo o contraseña incorrecta/o' })
      return response.redirect().toRoute('user.login')
    }
  }

  public async logout({ auth, response, session }: HttpContextContract) {
    await auth.use('web').logout()
    session.regenerate()
    return response.redirect().toRoute('home')
  }

  public async verifyEmail({ request, response, view }: HttpContextContract) {
    const token = request.input('token')

    if (!token) return response.redirect('/')

    const existingToken = await Token.query().preload('user').where('token', token).first()

    if (!existingToken) return response.redirect('/')

    existingToken.user.isVerified = true
    existingToken.user.save()

    await existingToken.delete()

    return view.render('verified')
  }
}
