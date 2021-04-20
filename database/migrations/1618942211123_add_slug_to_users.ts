import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('slug').notNullable().after('remember_me_token')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('slug')
    })
  }
}
