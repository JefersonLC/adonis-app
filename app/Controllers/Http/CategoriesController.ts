import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import Category from 'App/Models/Category'
import { createCategoryMessages, createCategorySchema } from 'App/Validation/CreateCategory'

export default class CategoriesController {
  public async panel({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 15

    const categories = await Database.from('categories').paginate(page, limit)
    const pagination = categories.getUrlsForRange(1, categories.lastPage)

    return [categories, pagination]
  }

  public async create({ request, response }: HttpContextContract) {
    try {
      const payload = await request.validate({
        schema: createCategorySchema,
        messages: createCategoryMessages,
      })

      const category = new Category()
      await category.fill({ name: payload.name }).save()

      return category.toJSON()
    } catch (error) {
      return response.badRequest({
        ...error,
      })
    }
  }
}
