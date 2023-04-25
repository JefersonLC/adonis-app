import { BaseModel, column, beforeSave, afterFind, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Hash from '@ioc:Adonis/Core/Hash'
import Token from './Token'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public lastname: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public isAdmin: boolean = false

  @column()
  public isVerified: boolean = false

  @column()
  public rememberMeToken: string | null

  @hasMany(() => Token, {
    localKey: 'id',
    foreignKey: 'user_id',
  })
  public tokens: HasMany<typeof Token>

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @beforeSave()
  public static async toLowerCase(user: User) {
    user.name = user.name.toLowerCase()
    user.lastname = user.lastname.toLowerCase()
  }

  @afterFind()
  public static async format(user: User) {
    user.name = user.name.charAt(0).toUpperCase() + user.name.substring(1)
    user.lastname = user.lastname.charAt(0).toUpperCase() + user.lastname.substring(1)
    return user
  }
}
