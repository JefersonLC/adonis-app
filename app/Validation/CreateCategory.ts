import { schema, rules, CustomMessages } from '@ioc:Adonis/Core/Validator'

export const createCategorySchema = schema.create({
  name: schema.string([rules.trim(), rules.minLength(2), rules.maxLength(20), rules.required()]),
})

export const createCategoryMessages: CustomMessages = {
  required: 'Campo requerido',
  minLength: 'Mínimo {{options.minLength}} caracteres',
  maxLength: 'Máximo {{options.maxLength}} caracteres',
}
