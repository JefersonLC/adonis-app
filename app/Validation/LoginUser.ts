import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'

export const loginSchema = schema.create({
  email: schema.string([rules.email(), rules.trim()]),
  password: schema.string([rules.minLength(8)]),
  rememberMe: schema.boolean.optional(),
})

export const loginMessages: CustomMessages = {
  required: 'Campo requerido',
  email: 'Formato inválido',
  minLength: 'Mínimo {{options.minLength}} caracteres',
}
