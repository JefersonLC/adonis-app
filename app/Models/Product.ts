import { BaseModel, BelongsTo, beforeSave, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Category from './Category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public price: number

  @column()
  public image: string

  @column()
  public stock: number

  @column()
  public slug: string

  @belongsTo(() => Category, {
    foreignKey: 'category_id',
  })
  public user: BelongsTo<typeof Category>

  @beforeSave()
  public static async createSlug(product: Product) {
    product.slug = product.name.toLowerCase().trim().replace(/\s/g, '-')
  }
}
