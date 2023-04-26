import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class ProductsController {
  public async panel({ request }: HttpContextContract) {
    const page = request.input('page', 1)
    const limit = 15

    const products = await Database.from('products').paginate(page, limit)
    const pagination = products.getUrlsForRange(1, products.lastPage)

    return [products, pagination]
  }
}
