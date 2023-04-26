import { BaseModel, HasMany, column, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Product from './Product'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @hasMany(() => Product, {
    localKey: 'id',
    foreignKey: 'category_id',
  })
  public products: HasMany<typeof Product>
}
