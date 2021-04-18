import { Exception } from '@poppinss/utils'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { ErrorCodes } from 'Contracts/error'

/*
|--------------------------------------------------------------------------
| Exception
|--------------------------------------------------------------------------
|
| The Exception class imported from `@adonisjs/core` allows defining
| a status code and error code for every exception.
|
| @example
| new AppException('message', 500, 'E_RUNTIME_EXCEPTION')
|
*/
export default class AppException extends Exception {
  private readonly errorMessage: string
  private readonly statusCode: number
  private readonly errorCode: ErrorCodes

  constructor(message: string, statusCode: number, error: ErrorCodes) {
    super(message, statusCode, error.toString())
    this.errorMessage = message
    this.statusCode = statusCode
    this.errorCode = error
  }

  public async handle(_error, ctx: HttpContextContract) {
    ctx.response.status(this.statusCode).json({ error_message: this.errorMessage, error_code: this.errorCode })
  }
}
