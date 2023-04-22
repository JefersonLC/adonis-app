import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
  public async create({ request, response }: HttpContextContract) {
    // Validation
    const createUserSchema = schema.create({
      name: schema.string([
        rules.trim(),
        rules.minLength(2),
        rules.maxLength(50),
        rules.required(),
      ]),
      lastname: schema.string([
        rules.trim(),
        rules.minLength(2),
        rules.maxLength(50),
        rules.required(),
      ]),
      email: schema.string([rules.trim(), rules.required(), rules.email()]),
      password: schema.string([rules.minLength(8), rules.required()]),
    })

    const messages: CustomMessages = {
      required: 'Campo requerido',
      email: 'Formato inválido',
      minLength: 'Mínimo {{options.minLength}} caracteres',
      maxLength: 'Máximo {{options.maxLength}} caracteres',
    }

    const payload = await request.validate({ schema: createUserSchema, messages })

    // Create new user
    const user = new User()
    await user
      .fill({
        name: payload.name,
        lastname: payload.lastname,
        email: payload.email,
        password: payload.password,
      })
      .save()

    response.redirect('/login')
  }
}
