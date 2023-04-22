import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
  public async login({ request, auth, response, session }: HttpContextContract) {
    const loginSchema = schema.create({
      email: schema.string([rules.email(), rules.trim()]),
      password: schema.string([rules.minLength(8)]),
      rememberMe: schema.boolean.optional(),
    })

    const messages: CustomMessages = {
      required: 'Campo requerido',
      email: 'Formato inválido',
      minLength: 'Mínimo {{options.minLength}} caracteres',
    }

    const { email, password, rememberMe } = await request.validate({
      schema: loginSchema,
      messages,
    })

    try {
      await auth.attempt(email, password, !!rememberMe)
      session.regenerate()
    } catch (error) {
      session.flash({ loginError: 'Correo o contraseña incorrecta/o' })
      return response.redirect().back()
    }
  }

  public async logout({ auth, response, session }: HttpContextContract) {
    await auth.use('web').logout()
    session.regenerate()
    return response.redirect('/login')
  }
}
