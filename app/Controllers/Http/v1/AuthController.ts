import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import LoginRequestValidator from 'App/Validators/LoginRequestValidator'
import Env from '@ioc:Adonis/Core/Env'

export default class AuthController {
  public async create({ request, auth, response }: HttpContextContract) {
    const validatedData = await request.validate(LoginRequestValidator)
    try {
      const token = await auth.use('api').attempt(validatedData.email, validatedData.password)
      return response.status(200).json(token)
    } catch {
      return response
        .status(403)
        .json({ error: 'Account does not exists or email/password does not match our records' })
    }
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
