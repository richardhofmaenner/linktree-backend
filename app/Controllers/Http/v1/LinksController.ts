import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LinkCreateRequestValidator from 'App/Validators/LinkCreateRequestValidator'
import Link from 'App/Models/Link'
import User from 'App/Models/User'
import { rules, schema, validator } from '@ioc:Adonis/Core/Validator'
import AppException from 'App/Exceptions/AppException'
import { ErrorCodes } from 'Contracts/error'
import LinkUpdateRequestValidator from 'App/Validators/LinkUpdateRequestValidator'

export default class LinksController {
  public async index({ auth, response }: HttpContextContract) {
    const user = <User>auth.user
    await user.load('links')
    const links = user.links

    return response.status(200)
      .json({
        data: links,
      })
  }

  public async store({ request, auth, response }: HttpContextContract) {
    const validatedData = await request.validate(LinkCreateRequestValidator)
    const user = <User>auth.user

    const newLink = new Link()
    newLink.linkText = validatedData.text
    newLink.linkLocation = validatedData.location

    await newLink.related('user')
      .associate(user)

    return response.status(200)
      .json({
        success: 'Link successfully stored',
        data: newLink,
      })
  }

  public async show({ request, auth, response }: HttpContextContract) {
    try {
      const validatedParams = await validator.validate({
        schema: schema.create({
          id: schema.number([
            rules.exists({ table: 'links', column: 'id' }),
          ]),
        }),
        data: request.params(),
      })
      const user = <User> await auth.user
      const link = await Link.findOrFail(validatedParams.id)
      if (link.userId === user.id) {
        return response.status(200).json({ data: link })
      }
    } catch (e) {
      return response.status(422).json(e.messages)
    }
    throw new AppException('This link does not belongs to you', 403, ErrorCodes.E_UNAUTHORIZED_ACCESS)
  }

  public async update({ request, auth, response }: HttpContextContract) {
    try {
      const validatedParams = await validator.validate({
        schema: schema.create({
          id: schema.number([
            rules.exists({ table: 'links', column: 'id' }),
          ]),
        }),
        data: request.params(),
      })
      const validatedData = await request.validate(LinkUpdateRequestValidator)
      const user = <User> await auth.user
      const link = await Link.findOrFail(validatedParams.id)

      if (link.userId === user.id && link.id === validatedParams.id) {
        link.linkText = validatedData.linkText
        link.linkLocation = validatedData.linkLocation
        link.index = validatedData.index
        await link.save()

        return response.status(200).json({
          data: link,
        })
      }
    } catch (e) {
      return response.status(422).json(e.messages)
    }
    throw new AppException('This link does not belongs to you.', 403, ErrorCodes.E_UNAUTHORIZED_ACCESS)
  }

  public async destroy({ request, auth, response }: HttpContextContract) {
    try {
      const validatedParams = await validator.validate({
        schema: schema.create({
          id: schema.number([
            rules.exists({ table: 'links', column: 'id' }),
          ]),
        }),
        data: request.params(),
      })
      const user = <User> await auth.user
      const link = await Link.findOrFail(validatedParams.id)
      if (link.userId === user.id) {
        await link.delete()
        return response.status(200)
      }
    } catch (e) {
      return response.status(422).json(e.messages)
    }
    throw new AppException('This link does not belong to you', 403, ErrorCodes.E_UNAUTHORIZED_ACCESS)
  }
}
