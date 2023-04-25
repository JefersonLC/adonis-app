import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'

export const createUserSchema = schema.create({
  name: schema.string([rules.trim(), rules.minLength(2), rules.maxLength(50), rules.required()]),
  lastname: schema.string([
    rules.trim(),
    rules.minLength(2),
    rules.maxLength(50),
    rules.required(),
  ]),
  email: schema.string([rules.trim(), rules.required(), rules.email()]),
  password: schema.string([rules.minLength(8), rules.required()]),
})

export const createUserMessages: CustomMessages = {
  required: 'Campo requerido',
  email: 'Formato inválido',
  minLength: 'Mínimo {{options.minLength}} caracteres',
  maxLength: 'Máximo {{options.maxLength}} caracteres',
}
