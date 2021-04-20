import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { rules, schema, validator } from '@ioc:Adonis/Core/Validator'
import User from 'App/Models/User'
import Link from 'App/Models/Link'

export default class SlugSearchesController {
  public async index({ response, params }: HttpContextContract) {
    try {
      const validatedParams = await validator.validate({
        schema: schema.create({
          slug: schema.string({}, [
            rules.regex(/^[a-z0-9]+$/),
            rules.minLength(2),
          ]),
        }),
        data: params,
      })

      const user = await User.findByOrFail('slug', validatedParams.slug)
      await user.preload('links')
      const links = user.links
      const serializedLinks = links.map((link) => {
        return link.serialize({
          fields: {
            pick: ['link_text', 'link_location'],
          },
        })
      })

      return response.status(200)
        .json({ data: serializedLinks })
    } catch (e) {
      return response.status(422).json(e.messages)
    }
  }
}
