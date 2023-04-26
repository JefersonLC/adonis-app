import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class VerifyAdmin {
  public async handle({ auth, response }: HttpContextContract, next: () => Promise<void>) {
    if (auth.user && !auth.user.isAdmin) {
      return response.redirect().toRoute('home')
    }
    await next()
  }
}
