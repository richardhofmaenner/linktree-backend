import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RegisterRequestValidator from 'App/Validators/RegisterRequestValidator'
import User from 'App/Models/User'

export default class RegistersController {
  public async store({ request, response }: HttpContextContract) {
    const validatedData = await request.validate(RegisterRequestValidator)

    const newUser = new User()
    newUser.email = validatedData.email
    newUser.password = validatedData.password
    await newUser.save()

    return response.status(201).json({
      success: 'User successfully created',
    })
  }
}
