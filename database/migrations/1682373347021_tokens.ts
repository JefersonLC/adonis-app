import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'tokens'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('token')
      table.integer('user_id').unsigned().references('users.id').onDelete('cascade')
      table.string('type')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
