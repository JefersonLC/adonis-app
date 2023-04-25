import { Encryption } from '@adonisjs/core/build/standalone'
import Mail from '@ioc:Adonis/Addons/Mail'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Env from '@ioc:Adonis/Core/Env'
import Token from 'App/Models/Token'
import User from 'App/Models/User'
import { createUserMessages, createUserSchema } from 'App/Validation/CreateUser'

export default class UsersController {
  public async create({ request, response, session }: HttpContextContract) {
    const payload = await request.validate({
      schema: createUserSchema,
      messages: createUserMessages,
    })
    try {
      const userModel = new User()
      const user = await userModel
        .fill({
          name: payload.name,
          lastname: payload.lastname,
          email: payload.email,
          password: payload.password,
        })
        .save()

      const { token } = await Token.create({
        user_id: user.id,
        token: new Encryption({ secret: Env.get('APP_KEY') }).encrypt(user.id + user.email),
        type: 'email_verification',
      })

      await Mail.send((message) => {
        message
          .from(Env.get('SMTP_USERNAME'))
          .to(user.email)
          .subject('Email verification')
          .htmlView('emails/verification', { token })
      })
      session.flash('registerSuccess', 'Registro exitoso. Se le envió un correo de verificación')
      return response.redirect().toRoute('login.form')
    } catch (error) {
      session.regenerate()
      session.flash('registerError', 'El correo ya está registrado')
      return response.redirect().back()
    }
  }
}
