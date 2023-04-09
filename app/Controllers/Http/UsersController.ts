import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'

export default class UsersController {
  public async create(ctx: HttpContextContract) {
    // Validation
    const createUserSchema = schema.create({
      name: schema.string({ trim: true }, [
        rules.minLength(2),
        rules.maxLength(50),
        rules.required(),
      ]),
      lastname: schema.string({ trim: true }, [
        rules.minLength(2),
        rules.maxLength(50),
        rules.required(),
      ]),
      email: schema.string({ trim: true }, [rules.required(), rules.email()]),
      password: schema.string({}, [rules.minLength(8), rules.required()]),
    })

    const messages: CustomMessages = {
      required: 'Campo requerido',
      email: 'Formato inválido',
      minLength: 'Mínimo {{options.minLength}} caracteres',
      maxLength: 'Máximo {{options.maxLength}} caracteres',
    }

    const payload = await ctx.request.validate({ schema: createUserSchema, messages })

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

    ctx.response.redirect('/login')
  }

  public async login(ctx: HttpContextContract) {}
}
