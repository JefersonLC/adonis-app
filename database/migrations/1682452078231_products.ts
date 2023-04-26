import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('name', 50).unique().notNullable()
      table.string('description', 250).notNullable()
      table.float('price').notNullable()
      table.string('image', 200).notNullable()
      table.integer('stock').notNullable()
      table.string('slug', 100).notNullable()
      table.integer('category_id').unsigned().references('categories.id').onDelete('cascade')
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
