import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import { BelongsTo } from '@ioc:Adonis/Lucid/Relations'

export default class Link extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public linkText: string

  @column()
  public linkLocation: string

  @column()
  public clicks: number

  @column()
  public index: number

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
