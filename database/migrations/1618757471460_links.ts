import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Links extends BaseSchema {
  protected tableName = 'links'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('link_text')
      table.string('link_location')
      table.bigInteger('clicks').defaultTo(0)
      table.integer('index').nullable()
      table.bigInteger('userId').notNullable()
      table.timestamps(true)
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
