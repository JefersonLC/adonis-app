import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VerifyEmail {
  public async handle({ auth, session, response }: HttpContextContract, next: () => Promise<void>) {
    session.regenerate()
    if (auth.user && !auth.user.isVerified) {
      await auth.use('web').logout()
      session.flash({ loginError: 'Correo no verificado' })
      return response.redirect().toRoute('login.form')
    }
    await next()
  }
}
