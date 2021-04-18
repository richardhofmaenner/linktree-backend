import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginRequestValidator from 'App/Validators/LoginRequestValidator'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
  public async create({ request, auth, response }: HttpContextContract) {
    const validatedData = await request.validate(LoginRequestValidator)

    await auth.attempt(validatedData.email, validatedData.password)

    return response.redirect(Env.get('DASHBOARD_URL'))
  }

  public async destroy({ auth, response }: HttpContextContract) {
    await auth.logout()

    return response.redirect(Env.get('LOGIN_URL'))
  }

  public async show({ auth, response }: HttpContextContract) {
    if (auth.isAuthenticated) {
      return response.json(await auth.user)
    }
    return response.json({ isLoggedIn: false })
  }
}
